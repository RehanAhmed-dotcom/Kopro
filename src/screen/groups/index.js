import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ToastAndroid,
  Modal,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import {groupCreate, show_user_list, imagePath} from '../apis/index';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from '@react-native-community/checkbox';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import GradientButton from '../../Components/GradientButton';

const Groups = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);

  const [modalVisible, setModalVisible] = useState(false);
  const [userModal, setuserModal] = useState(false);
  const [mtext, setmtext] = useState('public');
  const [mlist, setmlist] = useState('public');
  const [totalMember, settotalMember] = useState([]);
  const [membername, setmembername] = useState([]);
  const [Newelectedata, setNewelectedata] = useState([]);
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const [name, setname] = useState('');
  const [aboutme, setaboutme] = useState('');
  const [groupUsers, setGroupUsers] = useState([userData?.id]);
  const [groupMembers, setGroupMembers] = useState([userData]);
  const [img, setimg] = useState('');
  const [cover, setcover] = useState('');
  console.log('userdata', userData);
  const lognname = userData.firstname + ' ' + userData.lastname;
  const crid = userData?.id;
  console.log('first', crid);
  useEffect(() => {
    show_users();
  }, [navigation]);
  const [arydata, setarydata] = useState([]);
  console.log('img', img);
  const show_users = () => {
    setloding(true);

    show_user_list({Auth: userData?.api_token})
      .then(res => {
        console.log('My UserList respone..........', res);
        setarydata(res.list);
        setloding(false);
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data.message);
        setloding(false);
      });
  };

  const selectimg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const data = new FormData();
      data.append('image', {
        uri: image.path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
      imagePath(data)
        .then(res => {
          setimg(res.Path);
        })
        .catch(err => {
          console.log('err', err);
        });
      // setimg(image.path);
    });
  };
  const coverimg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const data = new FormData();
      data.append('image', {
        uri: image.path,
        type: 'image/jpeg',
        name: 'image' + new Date() + '.jpg',
      });
      imagePath(data)
        .then(res => {
          setcover(res.Path);
        })
        .catch(err => {
          console.log('err', err);
          console.log('err', err.response.message);
        });
      // setcover(image.path);
    });
  };
  console.log('group members', groupMembers);
  console.log('groupUsers', groupUsers);
  const creategroup = () => {
    setloding(true);
    seterr('');

    if (!name || !aboutme || !mtext) {
      setloding(false);
      seterr('All Fields is Required');
    } else {
      const groupsRef = database().ref('groups').push();
      try {
        groupsRef.set({
          _id: groupsRef.key,
          groupName: name,
          groupDesc: aboutme,
          members: groupMembers,
          timestamp: database.ServerValue.TIMESTAMP,
          groupImage: img,
          cover: cover,
          groupType: mtext,
          counter: 0,
          creator: lognname,
          creatorid: crid,
        });
        groupUsers.forEach(member => {
          database()
            .ref(`user/${userData?.id}`)
            .child(`groups/${groupsRef.key}`)
            .set({
              _id: groupsRef.key,
              groupName: name,
              groupDesc: aboutme,
              members: groupMembers,
              timestamp: database.ServerValue.TIMESTAMP,
              groupImage: img,
              cover: cover,
              groupType: mtext,
              counter: 0,
              creator: lognname,
              creatorid: crid,
            });
        });
        navigation.goBack();
      } catch (error) {}
    }
  };

  const [check, setcheck] = useState([]);
  console.log('check', check);
  const check_Member = id => {
    console.log('------------', check.length);
    if (check.length > 0) {
      let y = check.findIndex(item => item.id == id.id);
      if (y != -1) {
        let arr = [...check];
        arr.splice(y, 1);
        setcheck(arr);
        setNewelectedata(arr);
        if (arr.length == 0) {
          show_CheckValue();
        }
      } else {
        setcheck([...check, id]);
        setNewelectedata([...Newelectedata, id]);
      }
    } else {
      setcheck([...check, id]);
      setNewelectedata([...Newelectedata, id]);
    }
  };
  if (check.length == 0 && membername.length > 0) {
    setmembername([]);
  }
  const check_IsCheck = id => {
    if (check.length > 0) {
      let y = check.findIndex(item => item.id == id);
      if (y != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  useEffect(() => {
    show_CheckValue();
  }, [navigation, check]);
  const show_CheckValue = () => {
    let arry = [];
    if (check.length > 0) {
      for (let i = 0; i < check.length; i++) {
        let y = arydata.findIndex(item => item.id == check[i].id);
        if (y != -1) {
          arry.push(arydata[y].firstname + ' ' + arydata[y].lastname);
        }
      }
      setmembername(arry);
    } else {
      arry.push('No Member Add');
    }
  };
  useEffect(() => {
    if (Newelectedata.length > 0) {
      const newUser = userData;
      const addedUsers = Newelectedata ? [...Newelectedata, newUser] : [];
      const members = addedUsers.reduce((pre, cur) => {
        pre[cur.id] = cur;
        return pre;
      }, {});
      setGroupUsers(addedUsers);
      setGroupMembers(members);
    }
  }, [userModal]);
  const renderList = ({item}) => (
    <TouchableOpacity
      style={{marginTop: wp(3)}}
      onPress={() => check_Member(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            source={item.image == null ? images.logo : {uri: item.image}}
            style={styles.modalimg}
            resizeMode="cover"
          />
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Helvetica-Bold',
              letterSpacing: 1,
              color: Colors.white,
            }}>
            {item.firstname + ' ' + item.lastname}
          </Text>
        </View>
        <CheckBox
          value={check_IsCheck(item.id) ? true : false}
          onValueChange={() => check_Member(item)}
        />
      </View>
    </TouchableOpacity>
  );
  console.log('groupuser', groupUsers);
  console.log('groupmembers', groupMembers);
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}

        <View style={styles.root}>
          <View style={styles.top}>
            <Icon
              name="arrowleft"
              size={25}
              color={Colors.white}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Create Group</Text>
            <Text></Text>
          </View>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}>
              <View style={styles.box}>
                <View style={styles.boxinside}>
                  <TouchableOpacity
                    // style={styles.cover}
                    onPress={() => coverimg()}>
                    <Image
                      source={cover == '' ? images.grp : {uri: cover}}
                      style={styles.pic}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'row',
                      height: hp(12),
                      justifyContent: 'center',
                      // backgroundColor: 'red',
                      width: '100%',

                      alignSelf: 'center',
                      bottom: hp(11),
                    }}>
                    <TouchableOpacity
                      style={styles.profile}
                      onPress={() => selectimg()}>
                      <Image
                        source={images.imgupload}
                        style={{
                          width: wp(5),
                          height: wp(5),
                          tintColor: Colors.main_back_color,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <Image
                      source={img == '' ? images.explore : {uri: img}}
                      style={styles.logos}
                      resizeMode="contain"
                    />
                    <Text
                      style={[
                        styles.coverText,
                        {position: 'absolute', top: 100},
                      ]}>
                      Add Image & cover Image
                    </Text>
                  </View>

                  <View style={{marginHorizontal: 0}}>
                    <Box
                      lab="Group Name"
                      val={name}
                      onchg={txt => setname(txt)}
                    />
                    <Box
                      lab="Add Description"
                      val={aboutme}
                      onchg={txt => setaboutme(txt)}
                    />

                    <TouchableOpacity
                      style={{}}
                      onPress={() => setModalVisible(true)}>
                      <Icon1
                        name="keyboard-arrow-down"
                        size={20}
                        color={Colors.white}
                        style={{
                          position: 'absolute',
                          top: wp(12),
                          right: 15,
                          alignSelf: 'flex-end',
                        }}
                      />
                      <Box lab="Group Type" val={mtext} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => setuserModal(true)}>
                  <Icon1
                    name="keyboard-arrow-down"
                    size={20}
                    color={Colors.white}
                    style={{
                      position: 'absolute',
                      top: wp(7),
                      alignSelf: 'flex-end',
                    }}
                  />
                  <Box lab="ADD MEMBERS" val={membername.toString()} />
                </TouchableOpacity> */}
                  </View>
                </View>
              </View>
              <Text
                style={{
                  marginTop: hp(6),
                  alignSelf: 'center',
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Bold',
                }}>
                {err}
              </Text>

              {/* <TouchableOpacity
                onPress={() => {
                  creategroup();
                  // navigation.navigate('bottomtab');
                }}
                activeOpacity={0.8}
                style={[
                  styles.button,
                  {alignSelf: 'center', marginBottom: 40},
                ]}>
                <Text style={styles.login}>Add Group</Text>
              </TouchableOpacity> */}
              <GradientButton
                title={'Add Group'}
                onPress={creategroup}
                style={{marginBottom: 40, marginHorizontal: 30}}
              />

              <Modal
                animationType="fade"
                visible={modalVisible}
                transparent={true}>
                <View style={styles.boxmodal}>
                  <View style={styles.boxinsidemodal}>
                    <TouchableOpacity
                      onPress={() => {
                        setmtext('Public'), setModalVisible(false);
                      }}>
                      <Text style={styles.modalText}>Public</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setmtext('Private'), setModalVisible(false);
                      }}>
                      <Text style={styles.modalText}>Private</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <Modal
                animationType="fade"
                visible={userModal}
                transparent={true}>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View style={styles.boxmodal1}>
                    <View style={styles.boxinsidemodal1}>
                      <FlatList
                        data={arydata}
                        renderItem={renderList}
                        keyExtractor={item => item.id}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setcheck([]),
                              setNewelectedata([]),
                              setGroupMembers([]),
                              setGroupUsers([]);
                            setuserModal(false);
                          }}
                          style={{
                            justifyContent: 'center',
                            alignContent: 'flex-end',
                            backgroundColor: Colors.main_back_color,
                            width: wp(20),
                            height: wp(10),
                            alignItems: 'center',
                            marginTop: wp(5),
                            alignSelf: 'flex-end',
                            borderRadius: wp(5),
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: 'Helvetica-Bold',
                              letterSpacing: 1,
                              color: Colors.white,
                            }}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                        {check.length > 0 ? (
                          <TouchableOpacity
                            style={{
                              justifyContent: 'center',
                              alignContent: 'flex-end',
                              backgroundColor: Colors.main_back_color,
                              width: wp(20),
                              height: wp(10),
                              alignItems: 'center',
                              marginTop: wp(5),
                              alignSelf: 'flex-end',
                              borderRadius: wp(5),
                            }}
                            onPress={() => {
                              setuserModal(false);
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'Helvetica-Bold',
                                letterSpacing: 1,
                                color: Colors.white,
                              }}>
                              Add
                            </Text>
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Groups;
