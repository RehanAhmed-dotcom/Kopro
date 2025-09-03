import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  Alert,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import database from '@react-native-firebase/database';
import Icon2 from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
import {
  AddMemberMore,
  sendUserList,
  imagePath,
  GetNotiGroupArr,
} from '../apis/index';
import {useSelector} from 'react-redux';
import Loader from '../../constants/loader';
import ImagePicker from 'react-native-image-crop-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import database from '@react-native-firebase/database';
const Mate = ({navigation, route}: {navigation: any, route: any}) => {
  const items = route.params.item;
  const [userModal, setuserModal] = useState(false);
  const [arydata, setarydata] = useState([]);
  const [check, setcheck] = useState([]);
  const [revert, setRevert] = useState(false);
  const [membername, setmembername] = useState([]);
  const [loding, setloding] = useState(false);
  const {userData} = useSelector(({USER}) => USER);
  const [groupMember, setGroupMembers] = useState([]);
  const [groupUsers, setGroupUsers] = useState([]);
  const [groupMembers, setGroupMemberss] = useState([]);
  const [newelectedata, setNewelectedata] = useState([]);
  const [countbande, setcountbande] = useState();
  const [showhid, setshowhid] = useState(false);
  const [img, setimg] = useState('');
  const [grpimg, setgrpimg] = useState('');

  const Get_fcm_token = async msg => {
    const data = new FormData();
    check.forEach(element => {
      data.append('id[]', element.id);
    });

    data.append('title', `User ${userData.firstname} added you in a group`);

    await GetNotiGroupArr({Auth: userData?.api_token, data})
      .then(res => {
        console.log('----------9----------------', res);
      })
      .catch(error => {
        console.log('Error FCMToke', error);
      });
  };
  // console.log('::::::::::::::::::::::::::::::;', newelectedata.length);
  useEffect(() => {
    database()
      .ref(`groups/${items._id}/members`)
      .on('value', dataSnapshot => {
        let userArr = [];
        dataSnapshot.forEach(child => {
          if (child.val()) {
            userArr.push(child.val());
          }
          // console.log("member specific",child.val().firstname);
        });
        setGroupMembers(userArr);
        setcountbande(userArr.length);
        console.log('--------------------', setGroupMembers(userArr));
        setNewelectedata(userArr);
        // setRevert(!revert)
      });
    setTimeout(() => {
      showmembers();
    }, 1000);
    // showmembers()
  }, [revert]);
  useEffect(() => {
    const addedUsers = newelectedata;
    const members = addedUsers.reduce((pre, cur) => {
      pre[cur.id] = cur;
      return pre;
    }, {});
    setGroupUsers(addedUsers);
    setGroupMemberss(members);
  }, [userModal]);

  const showmembers = () => {
    setloding(true);
    const data = new FormData();

    // data.append('group_id', item.id);

    sendUserList({Auth: userData?.api_token})
      .then(res => {
        // console.log('List show members..........', res);
        // setarydata(res.list);
        // console.log("group mm",groupMember)
        const arr1 = res.list;
        const arr2 = groupMember;
        let resp = [];
        resp = arr1.filter(el => {
          return !arr2.find(element => {
            return element.id === el.id;
          });
        });
        console.log('res', resp);
        setarydata(resp);
        setloding(false);
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data);
      });
  };

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
              fontFamily: 'MontserratAlternates-SemiBold',
              letterSpacing: 1,
              color: Colors.white,
            }}>
            {item.firstname + ' ' + item.lastname}
          </Text>
        </View>
        <CheckBox
          value={check_IsCheck(item.id) ? true : false}
          onValueChange={() => check_Member(item)}
          boxType="square"
          disabled={true}
        />
      </View>
    </TouchableOpacity>
  );

  const renderItemgp = ({item}) =>
    userData?.id != item.id &&
    item.id != undefined && (
      <View
        style={{
          marginBottom: wp(3),
          marginHorizontal: wp(5),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            marginBottom: wp(3),
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('producerdetail', {dataitem: item.id});
          }}>
          <Image
            source={item.image == null ? images.profileimg : {uri: item.image}}
            style={styles.participant}
            resizeMode="contain"
          />
          <View style={{flexDirection: 'column', marginLeft: wp(5)}}>
            <Text style={styles.pname}>
              {item.firstname + ' ' + item.lastname}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Remove User',
              'Are you sure you want to remove user?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => {
                    database()
                      .ref(`user/${item.id}/groups/${items._id}`)
                      .push();
                    database()
                      .ref(`groups/${items._id}/members/${item.id}`)
                      .remove();
                  },
                },
              ],
            );
          }}>
          <Icon
            name="minuscircle"
            size={20}
            color={Colors.main_back_color}
            // onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
      </View>
    );

  const check_Member = id => {
    // console.log("------------",check.length)
    if (check.length > 0) {
      let y = check.findIndex(item => item.id == id.id);
      if (y != -1) {
        let arr = [...check];
        arr.splice(y, 1);
        setcheck(arr);
        if (arr.length == 0) {
          show_CheckValue();
        }
      } else {
        setcheck([...check, id]);
        setNewelectedata([...newelectedata, id]);
      }
    } else {
      setcheck([...check, id]);
      setNewelectedata([...newelectedata, id]);
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
  const _updateGroup = async () => {
    // const removeMembers = groupAllMembers.filter(function (obj) {
    //   return selectedMembers.indexOf(obj) == -1;
    // });
    console.log('img', img);
    Get_fcm_token();
    try {
      database()
        .ref(`user/${userData?.id}`)
        .child(`groups/${items._id}`)
        .update({
          _id: items._id,
          groupName: name,
          groupDesc: des,
          groupImage: img,
          cover: grpimg,
          members: groupMembers,
          timestamp: database.ServerValue.TIMESTAMP,
          // isGroup: true,
          counter: 0,
          groupType: items.groupType,
        });

      groupUsers.forEach(member => {
        database()
          .ref(`user/${member.id}`)
          .child(`groups/${items._id}`)
          .update({
            _id: items._id,
            groupName: name,
            groupDesc: des,
            groupImage: img,
            cover: grpimg,
            members: groupMembers,
            timestamp: database.ServerValue.TIMESTAMP,
            // isGroup: true,
            counter: 0,
            groupType: items.groupType,
          });
      });

      database().ref(`groups/${items._id}`).update({
        _id: items._id,
        groupName: name,
        groupDesc: des,
        groupImage: img,
        cover: grpimg,
        members: groupMembers,
        timestamp: database.ServerValue.TIMESTAMP,
        // isGroup: true,
        counter: 0,
        groupType: items.groupType,
      });

      navigation.goBack();
    } catch (error) {
      console.log('error', error);
    }
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
    });
  };
  const selectgrpimg = () => {
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
          setgrpimg(res.Path);
        })
        .catch(err => {
          console.log('err', err);
        });
    });
  };
  const [des, setdes] = useState(items.groupDesc);
  const [name, setname] = useState(items.groupName);

  return (
    <ImageBackground style={styles.headerImage} source={images.back2}>
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
          <Text style={styles.title}>{items.groupName}</Text>
          <Icon2
            name="chat"
            onPress={() => navigation.goBack()}
            size={25}
            color={Colors.white}
          />
        </View>
        {/* <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 25,
          }}> */}
        <View style={styles.box}>
          <View style={styles.boxinside}>
            <TouchableOpacity onPress={() => selectgrpimg()}>
              <Image
                source={
                  grpimg
                    ? {uri: grpimg}
                    : items.cover == ''
                    ? images.grp
                    : {uri: items.cover}
                }
                style={styles.pic}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: hp(12),
                justifyContent: 'center',
                alignSelf: 'center',
                bottom: hp(7),
              }}
              onPress={() => selectimg()}
              activeOpacity={1}>
              <Image
                source={
                  img
                    ? {uri: img}
                    : items.groupImage == ''
                    ? images.grp
                    : {uri: items.groupImage}
                }
                style={styles.logos}
                resizeMode="contain"
              />
              <Text style={styles.private}>{items.groupType} Group</Text>
            </TouchableOpacity>

            <View style={{marginHorizontal: wp(5), bottom: wp(5)}}>
              <Text
                style={{
                  // position: 'absolute',
                  // right: wp(18),
                  // bottom: 5,
                  color: 'white',
                  fontSize: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-SemiBold',
                  }}>
                  Created By
                </Text>
                : {items?.creator}
              </Text>
              <Box lab="NAME" val={name} onchg={txt => setname(txt)} />
              <Box lab="DESCRIPTION " val={des} onchg={txt => setdes(txt)} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={styles.part}>
                  {/* {item.group_member.length} Participants */}
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.main_back_color,
                    paddingVertical: wp(1.2),
                    paddingHorizontal: wp(2),
                    borderRadius: wp(10),
                  }}
                  onPress={() => {
                    setRevert(!revert);
                    setuserModal(true);
                  }}>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 10,
                      fontFamily: 'MontserratAlternates-Regular',
                      letterSpacing: 1,
                    }}>
                    Add Members
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{height: 130}}>
              <FlatList
                data={groupMember}
                renderItem={renderItemgp}
                keyExtractor={item => item.id}
              />
            </View>

            {/* {groupMember.length > 3 ? (
                <TouchableOpacity onPress={()=>setshowhid(!showhid)}>
                    {showhid?
                <Text
                  style={{
                    textAlign: 'center',
                    marginHorizontal: wp(5),
                    color: Colors.white,
                    marginTop: wp(3),
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                  }}>
                    
                    Hide Extra member
         
                </Text>:
                    <Text
                    style={{
                      textAlign: 'center',
                      marginHorizontal: wp(5),
                      color: Colors.white,
                      marginTop: wp(3),
                      fontSize: 14,
                      fontFamily: 'MontserratAlternates-SemiBold',
                    }}>
                      
                      And {groupMember.length - 2} others members
                   
                  </Text>
                }
                </TouchableOpacity>
              ) : null} */}
            <TouchableOpacity
              onPress={() => {
                _updateGroup();
                // navigation.navigate('bottomtab');
              }}
              disabled={countbande < newelectedata.length ? false : true}
              activeOpacity={0.8}
              style={{
                backgroundColor: Colors.white,
                borderRadius: 16,
                width: wp(80),
                height: wp(14),
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{color: Colors.main_back_color, fontSize: 16}}>
                Update Group
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity

style={{
  justifyContent: 'center',
  alignContent: 'flex-end',
  backgroundColor: Colors.main_back_color,
  width: wp(20),
  height: wp(10),
  alignItems: 'center',
  marginTop:wp(5),
  alignSelf:'flex-end',
  borderRadius:wp(5)
}}  onPress={() => {
  setuserModal(false);
}}>
<Text style={{fontSize: 12,
fontFamily: 'MontserratAlternates-SemiBold',
letterSpacing: 1,
color: Colors.white,}}>Add</Text>
</TouchableOpacity> */}
          </View>
        </View>
        <Modal animationType="fade" visible={userModal} transparent={true}>
          {userModal ? (
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                // position: 'absolute',
                // height: wp(80),
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
                          setNewelectedata(groupMember),
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
                          fontFamily: 'MontserratAlternates-SemiBold',
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
                          //  sendInvitation()
                          setuserModal(!userModal);
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'MontserratAlternates-SemiBold',
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
          ) : null}
        </Modal>

        {/* </ScrollView> */}
      </View>
    </ImageBackground>
  );
};
export default Mate;
