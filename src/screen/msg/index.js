import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SendIcon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import {Image_set, GetNotiGroup} from '../apis/index';

import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {recieverMsg, senderMsg} from '../../lib/messageUtils';
import {GetFCM} from '../apis/index';
const Msg = ({navigation, route}: {navigation: any, route: any}) => {
  const Wrapper = Platform.OS == 'android' ? View : KeyboardAvoidingView;
  const [key, setkey] = useState(false);
  const [number, onChangeNumber] = useState(null);
  const {item} = route.params;
  console.log('----^^^^^^^^^^^^^^^^^^^^^---------0000--------', item);

  const [img, setimg] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [token, settoken] = useState('');
  const [cmsg, setcmsg] = useState(false);

  const Send_notifi = async msg => {
    console.log('-------------0000--------');

    const data = new FormData();
    data.append('id', item?.id);
    data.append('title', `${userData.firstname} messaged you`);
    data.append('message', msg);

    await GetFCM({Auth: userData?.api_token, data})
      .then(res => {
        console.log('-------------0000--------', res);
      })
      .catch(error => {
        console.log('Error FCMToke()()()', error);
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
  const Get_fcm_token = async () => {
    const data = new FormData();
    data.append('id', item?.id);
    await GetFCM({Auth: userData?.api_token, data})
      .then(res => {
        console.log('firstddd000', res);
        settoken(res.fcmToken);
      })
      .catch(error => {
        console.log('Error FCMToke', error);
      });
    // route.params?.id ? searchRecordbylink(id) : null;
  };
  const fun = () => {
    for (let x = 0; x < messages.length; x++) {
      if (
        messages[x].recievedBy == userData?.email.replace(/[^a-zA-Z0-9 ]/g, '')
      ) {
        return true;
        // break;
      } else {
        console.log('hello');
      }
    }
  };
  // console.log('fun', fun());
  // -----------------------------------------------
  // console.log('fhjfjfjgfjgjgjgjgjgjg', messages);
  const viewMessages = ({item}) => (
    <View>
      {item.recievedBy == userData?.email.replace(/[^a-zA-Z0-9 ]/g, '') ? (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={guestData.image ? {uri: guestData.image} : images.p4}
            style={[
              styles.profile,
              {
                marginRight: 10,
                marginBottom: hp(2),
                height: 50,
                width: 50,
                borderRadius: 20,
              },
            ]}
            resizeMode="contain"
          />
          {item?.msg?.slice(-4) == '.jpg' ? (
            <View style={styles.textbox}>
              <Image
                source={{uri: item.msg}}
                resizeMode="contain"
                style={{width: wp(48), height: wp(70)}}
              />
              <Text style={[styles.tim, {color: 'black'}]}>
                {moment(item.date).format('hh:mm A')}
              </Text>
            </View>
          ) : (
            <View style={styles.textbox}>
              <Text
                style={[
                  styles.msg,
                  {
                    color: '#BABABA',
                    fontFamily: 'MontserratAlternates-SemiBold',
                  },
                ]}>
                {item.msg}
              </Text>
              {/* <Text style={[styles.tim, {color: 'black'}]}>
                {moment(item.date).format('hh:mm A')}
              </Text> */}
            </View>
          )}
        </View>
      ) : null}
      {item.sendBy == userData?.email.replace(/[^a-zA-Z0-9 ]/g, '') ? (
        item?.msg?.slice(-4) == '.jpg' ? (
          <TouchableOpacity
            style={[
              styles.textbox,
              {
                marginTop: hp(2),
                backgroundColor: Colors.main_back_color,
                alignSelf: 'flex-end',
              },
            ]}>
            <Image
              source={{uri: item.msg}}
              resizeMode="contain"
              style={{width: wp(48), height: wp(70)}}
            />
            <Text style={[styles.tim, {color: 'white'}]}>
              {moment(item.date).format('hh:mm A')}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.textbox,
              {
                marginTop: hp(2),
                backgroundColor: '#7D0776',
                alignSelf: 'flex-end',
              },
            ]}
            onLongPress={() => deleteMesg(item)}>
            <Text style={[styles.msg, {color: 'white'}]}>{item.msg}</Text>
            {/* <Text style={[styles.tim, {color: 'white'}]}>
              {moment(item.date).format('hh:mm A')}
            </Text> */}
          </TouchableOpacity>
        )
      ) : null}
    </View>
  );
  const deleteMesg = dt => {
    database()
      .ref('messeges')
      .child(dt.sendBy)
      .child(dt.recievedBy)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          // console.log('>>', childSnapshot.messege.val);
          const tempmsg = childSnapshot.val();
          if (
            tempmsg.messege.date === dt.date &&
            tempmsg.messege.msg === dt.msg
          ) {
            Alert.alert('Delete Message', 'Are you sure you want to delete?', [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  database()
                    .ref('messeges')
                    .child(dt.sendBy)
                    .child(dt.recievedBy)
                    .child(childSnapshot.key)
                    .remove();
                },
              },
            ]);
          }
        });
      });

    // ----------------

    database()
      .ref('messeges')
      .child(dt.recievedBy)
      .child(dt.sendBy)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          const tempmsg = childSnapshot.val();
          if (
            tempmsg.messege.reciever === dt.recievedBy &&
            tempmsg.messege.msg === dt.msg
          ) {
            database()
              .ref('messeges')
              .child(dt.recievedBy)
              .child(dt.sendBy)
              .child(childSnapshot.key)
              .remove();
          }
        });
      });
  };

  const guestData = {
    firstname: item.firstname,

    lastname: item.lastname,
    email: item.email,
    image: item.image,
    id: item.id,
  };
  const userData2 = {
    firstname: userData?.firstname,
    lastname: userData?.lastname,
    email: userData?.email,
    image: userData?.image,
    id: userData?.id,
  };

  const _chatUsers = async () => {
    try {
      database()
        .ref('users/' + userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .set({
          latestMessage: message,
          timestamp: database.ServerValue.TIMESTAMP,
          counter: 0,
          user: guestData,
        });

      database()
        .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .once('value', snapshot => {
          const counts = snapshot?.val()?.counter;
          database()
            .ref('users/' + guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .child(userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
            .set({
              latestMessage: message,
              timestamp: database.ServerValue.TIMESTAMP,
              counter: counts ? counts + 1 : 1,
              user: userData2,
            });
        });
    } catch (error) {
      console.log('error in crate chat', error);
    }
  };
  useEffect(() => {
    _getMeesages();
    _updateChatCount();
  }, []);

  const _updateChatCount = async () => {
    try {
      database()
        .ref('users/' + userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))

        .once('value', snapshot => {
          if (snapshot.val() != null) {
            database()
              .ref('users/' + userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
              .update({
                counter: 0,
              });
          }
        });
    } catch (error) {}
  };

  const _getMeesages = async () => {
    try {
      database()
        .ref('messeges')
        .child(userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .child(guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let msgs = [];
          dataSnapshot.forEach(child => {
            msgs.push({
              sendBy: child.val().messege.sender,
              recievedBy: child.val().messege.reciever,
              msg: child.val().messege.msg,
              date: child.val().messege.date,
            });
            return undefined;
          });
          setMessages(msgs.reverse());
        });
    } catch (error) {}
  };
  const handleSend = () => {
    // console.log(
    //   '--------------------------------',
    //   message.slice(-4) == '.jpg' ? false : true,
    // );
    setMessage('');

    if (message) {
      // Get_fcm_token(message);
      if (message.slice(-4) != '.jpg') {
        Send_notifi(message);
      }
      senderMsg(
        message,
        userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
      );
      _chatUsers()
        .then(res => {
          console.log('no error found in send', res);
        })
        .catch(err => {
          console.log('error inside sender', err);
        });

      recieverMsg(
        message,
        userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
        Date.now(),
      );
      _chatUsers()
        .then(res => {
          console.log('no error found in rev', res);
        })
        .catch(err => {
          console.log('error inside receiver', err);
        });
    }
  };
  const requestSend = () => {
    setMessage('');

    // _handlePushNotification();
    // console.log('message is here', message);
    senderMsg(
      'Request for conversation',
      userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      Date.now(),
    );
    _chatUsers()
      .then(res => {
        console.log('no error found in send', res);
      })
      .catch(err => {
        console.log('error inside sender', err);
      });

    recieverMsg(
      'Request for conversation',
      userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      guestData.email.replace(/[^a-zA-Z0-9 ]/g, ''),
      Date.now(),
    );
    _chatUsers()
      .then(res => {
        console.log('no error found in rev', res);
      })
      .catch(err => {
        console.log('error inside receiver', err);
      });
  };
  const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
    console.log('Keyboard is open');
    setkey(true);
  });
  const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    console.log('Keyboard is closed');
    setkey(false);
  });
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
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginRight: wp(30),
              }}>
              <Image
                source={guestData.image ? {uri: guestData.image} : images.p4}
                style={styles.profile}
                resizeMode="contain"
              />
              <View style={{flexDirection: 'column', marginLeft: wp(3)}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    color: 'white',

                    letterSpacing: 1,
                  }}>
                  {`${guestData.firstname} ${guestData.lastname}`}
                </Text>
              </View>
            </View>

            <Text></Text>
          </View>
          <Wrapper style={{flex: 1}} behavior="padding">
            <View style={styles.box}>
              <View style={styles.boxinside}>
                <FlatList inverted data={messages} renderItem={viewMessages} />
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
                marginTop: wp(1),
                marginBottom: key ? (Platform.OS == 'ios' ? hp(7) : 0) : 0,
              }}>
              {/* <TouchableOpacity
                onPress={() => selectimg()}
                style={{
                  width: wp(12),
                  height: wp(12),
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
                placeholder={
                  fun()
                    ? 'Write your message here...'
                    : 'Send request for conversation'
                }
                placeholderTextColor="#4D4C4E"
                editable={message.slice(-4) == '.jpg' ? false : true}
              />

              <TouchableOpacity
                onPress={() => handleSend()}
                // onPress={() => _handlePushNotification()}
                style={{
                  width: wp(12),
                  height: wp(12),
                  borderRadius: wp(15),
                  // backgroundColor: '#1F1F1F',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Image
                  source={images.chaticon}
                  style={styles.chaticon}
                  resizeMode="contain"
                /> */}
                <SendIcon name="send" size={20} color={'#7D0776'} />
              </TouchableOpacity>
            </View>
          </Wrapper>

          {/* chatbox end-------------------- */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Msg;
