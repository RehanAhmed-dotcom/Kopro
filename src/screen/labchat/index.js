import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Colors, {images} from '../../constants';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Entypo';
import moment from 'moment';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {senderMsg} from './util';
import {Image_set} from '../apis/index';
import ImagePicker from 'react-native-image-crop-picker';

import database from '@react-native-firebase/database';

const Msg = ({navigation, route}: {navigation: any, route: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [key, setkey] = useState(false);
  const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;

  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [newmessages, setnewmessages] = useState([]);
  const [message, setMessage] = useState('');
  const {item} = route.params;
  console.log('item', item);
  const [groupMembers, setGroupMembers] = useState([]);
  console.log('items', groupMembers);

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
      Image_set(data)
        .then(res => {
          console.log('Image..........', res);
          if (res.status == 'success') {
            setMessage(res.Path);
          }
        })
        .catch(error => {
          console.log('Error Meaasge', error.response);
        });
    });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
      setkey(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
      setkey(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const [number, onChangeNumber] = useState(null);
  const [members, setmembers] = useState([]);
  useEffect(() => {
    let arr = [];
    // let arry1 = item.group_member;
    // arry1.forEach(element => {
    //   arr.push(element.firstname + ' ' + element.lastname);
    // });

    // setmembers(arr);
  }, [navigation]);

  useEffect(() => {
    getMessages();
  }, []);
  const getMessages = async () => {
    try {
      database()
        .ref(`groups/${item._id}/messages`)
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              msg: child.val().message.text,
              sendBy: child.val().message.sendBy,
              senderName: child.val().message.senderName,
              profile_image: child.val().message.profile_image,
              date: child.val().message.date,
            });
          });
          setnewmessages(msgs.reverse());
        });
      database()
        .ref(`groups/${item._id}/members`)
        .on('value', dataSnapshot => {
          let userArr = [];
          dataSnapshot.forEach(child => {
            // console.log("member specific",child.val().firstname);
            if (child.val()) {
              userArr.push(`${child.val().firstname} ${child.val().lastname}`);
            }
          });
          setGroupMembers(userArr);
        });
    } catch (err) {}
  };
  const handleSned = mesg => {
    if (message) {
      setMessage('');
      senderMsg(
        mesg,
        `${userData?.id}`,
        item._id,
        Date.now(),
        `${userData?.firstname}`,
        userData?.image,
      )
        .then(() => {
          _chatGroups();
        })
        .catch(err => {
          console.log('err', err);
        });
    }
  };
  const _chatGroups = async () => {
    try {
      database().ref(`users/${userData?.id}/groups/${item._id}`).update({
        timestamp: database.ServerValue.TIMESTAMP,
        counter: 0,
      });

      database()
        .ref(`users/${userData?.id}/groups/${item._id}/members`)
        .on('value', snapshot => {
          snapshot.forEach(member => {
            if (member.key != userData?.id) {
              database()
                .ref(`users/${member.key}/groups/${item._id}`)
                .once('value', snapshot => {
                  const counts = snapshot?.val()?.counter;
                  database()
                    .ref(`users/${member.key}/groups/${item._id}`)
                    .update({
                      timestamp: database.ServerValue.TIMESTAMP,
                      counter: counts ? counts + 1 : 1,
                    });
                });
            }
          });
        });
    } catch (error) {}
  };
  // console.log("messages array",newmessages)
  console.log('members', groupMembers);
  const viewMessages = ({item}) => (
    <View>
      {item.msg.slice(-4) == '.jpg' ? (
        <View
          style={{
            width: wp(70),
            paddingLeft: wp(4),
            paddingRight: wp(2),
            paddingVertical: hp(1),
            backgroundColor:
              item.sendBy == userData?.id ? Colors.main_back_color : 'white',
            borderRadius: wp(2),
            alignSelf: item.sendBy == userData?.id ? 'flex-end' : 'flex-start',
            flexWrap: 'nowrap',
            marginBottom: hp(1),
          }}>
          <Image
            source={{uri: item.msg}}
            resizeMode="contain"
            style={{width: wp(48), height: wp(70)}}
          />
          {/* <Text style={[styles.tim, {color: 'black'}]}>
            {moment(item.date).format('hh:mm A')}
          </Text> */}
        </View>
      ) : (
        <>
          <View
            style={{
              width: wp(70),
              paddingLeft: wp(4),
              paddingRight: wp(2),
              paddingVertical: hp(1),
              backgroundColor:
                item.sendBy == userData?.id ? '#7D0776' : '#1F1F1F',
              borderRadius: wp(2),
              alignSelf:
                item.sendBy == userData?.id ? 'flex-end' : 'flex-start',
              flexWrap: 'nowrap',
              marginBottom: hp(1),
            }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'MontserratAlternates-Regular',
                color: 'white',
              }}>
              {item.msg}
            </Text>
            {/* <Text
            style={{
              alignSelf: 'flex-end',
              fontSize: 10,
              fontFamily: 'MontserratAlternates-Regular',
              color: 'white',
            }}>
            {moment(item.date).format('hh:mm A')}
          </Text> */}
          </View>
          {/* </View> */}
        </>
      )}
    </View>
  );
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
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
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: wp(15),
            }}
            onPress={() => {
              navigation.navigate('mate', {item});
            }}
            activeOpacity={1}>
            <Image
              source={
                item.groupImage == null ? images.p4 : {uri: item.groupImage}
              }
              style={styles.profile}
              resizeMode="contain"
            />
            <View
              style={{
                flexDirection: 'column',
                marginLeft: wp(3),
                width: wp(50),
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  color: 'white',

                  letterSpacing: 1,
                }}>
                {item.groupName}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {groupMembers.slice(0, 4).map(user => (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 10,
                      fontFamily: 'MontserratAlternates-Regular',
                      bottom: 3,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {user},{' '}
                  </Text>
                ))}
              </View>

              {/* <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontFamily: 'MontserratAlternates-Regular',
                  bottom: 3,
                }}>
                
              </Text> */}
            </View>
          </TouchableOpacity>
          <Text></Text>
        </View>
        <Wrapper style={{flex: 1}} behavior="padding">
          <View style={styles.box}>
            <View style={styles.boxinside}>
              <FlatList inverted data={newmessages} renderItem={viewMessages} />
            </View>
          </View>

          {/* chat box---------------------  */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp(88),
              alignSelf: 'center',
              top: wp(0.2),
              marginTop: wp(1),
              marginBottom: key ? (Platform.OS == 'ios' ? hp(7) : 0) : 0,
            }}>
            {/* <TouchableOpacity
              onPress={() => selectimg()}
              style={{
                width: wp(11),
                height: wp(11),
                borderRadius: wp(15),
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="picture" size={20} color={Colors.white} />
            </TouchableOpacity> */}
            <TextInput
              style={styles.input}
              onChangeText={text => setMessage(text)}
              value={message}
              placeholderTextColor="#4D4C4E"
              placeholder="Write your message here..."
              editable={message.slice(-4) == '.jpg' ? false : true}
            />
            {/* <Icon1
              name="attachment"
              size={18}
              color={Colors.main_back_color}
              style={{position: 'absolute', right: wp(3)}}
              onPress={() => navigation.goBack()}
            /> */}
            <TouchableOpacity
              onPress={() => handleSned(message)}
              style={{
                width: wp(11),
                height: wp(11),
                borderRadius: wp(15),
                // backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <SendIcon name="send" size={20} color={'#7D0776'} />
            </TouchableOpacity>
          </View>
        </Wrapper>
        {/* chatbox end-------------------- */}
      </View>
    </ImageBackground>
  );
};
export default Msg;
