import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Colors, {images} from '../../constants';
import Icon from 'react-native-vector-icons/AntDesign';
import {AllUsersMesg} from '../apis/index';
import Box from '../../constants/inputbox';
import Icon3 from 'react-native-vector-icons/Ionicons';

import styles from './style';
import database from '@react-native-firebase/database';

import moment from 'moment';

import {useSelector} from 'react-redux';

const Chat = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [Dataary, setDataary] = useState([]);
  const [ser, setser] = useState('');

  // const {item} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [List, setList] = useState();
  console.log('list', List);
  const _usersList = useCallback(async () => {
    try {
      database()
        .ref('users/' + userData?.email.replace(/[^a-zA-Z0-9 ]/g, ''))
        .on('value', dataSnapshot => {
          let users = [];
          dataSnapshot.forEach(child => {
            users.push(child.val());
          });

          setList(users.reverse());
          console.log('user list in chat list ', JSON.stringify(users));
        });
    } catch (error) {}
  }, []);

  useEffect(() => {
    _usersList();
    UserList();
  }, []);
  const UserList = () => {
    const data = new FormData();
    data.append('search', ser);
    AllUsersMesg({Auth: userData?.api_token, data})
      .then(res => {
        console.log('ooo Api  respone..........', res);
        setDataary(res.data);
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data);
      });
  };

  const listUser = ({item}) => (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('msg', {item: item.user})}>
      <View>
        <Image
          source={item.user.image == null ? images.p4 : {uri: item.user.image}}
          style={styles.profile}
          resizeMode="contain"
        />
        {/* <View style={styles.round}></View> */}
      </View>

      <View style={{marginLeft: widthPercentageToDP(3)}}>
        <View style={styles.seq}>
          <Text
            style={
              styles.name
            }>{`${item.user.firstname} ${item.user.lastname}`}</Text>
          {item.counter != '0' ? (
            <Text style={styles.num}>{item.counter}</Text>
          ) : null}
        </View>
        <View style={styles.seq}>
          <Text style={styles.mesg} numberOfLines={1} ellipsizeMode="tail">
            {item.latestMessage}
          </Text>
          <Text style={styles.tim}>
            {moment(item.timestamp).format('h:mm: a')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const frien = ({item}) => (
    <TouchableOpacity
      style={{
        marginHorizontal: widthPercentageToDP(5),
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingVertical: heightPercentageToDP(1.5),
      }}
      onPress={() => {
        setModalVisible(false),
          navigation.navigate('msg', {
            item: item,
            time: item.created_at,
          });
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={item.image == null ? images.p4 : {uri: item.image}}
          style={styles.profile}
          resizeMode="contain"
        />
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            marginLeft: widthPercentageToDP(2),
          }}>
          {`${item.firstname} ${item.lastname}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
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
              style={{width: widthPercentageToDP(20)}}
            />

            <Text style={styles.home}>Chat</Text>
            <Text
              style={{
                width: widthPercentageToDP(20),
                color: 'white',
                fontSize: 13,
                textAlign: 'right',
              }}
              onPress={() => setModalVisible(true)}>
              All Friends
            </Text>
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              <FlatList
                data={List}
                unique={1}
                renderItem={listUser}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </View>
        {/* <Modal animationType="slide" transparent={true} visible={modalVisible}> */}
        {modalVisible ? (
          <View
            style={{
              marginTop: heightPercentageToDP(7),
              alignItems: 'center',
              flex: 1,
              borderRadius: widthPercentageToDP(3),
              position: 'absolute',
              alignSelf: 'center',
            }}>
            <View
              style={{
                backgroundColor: Colors.gray,
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(75),
                paddingVertical: widthPercentageToDP(2),
                borderRadius: widthPercentageToDP(3),
                paddingTop: heightPercentageToDP(4),
              }}>
              <View
                style={{
                  width: widthPercentageToDP(77),
                  alignSelf: 'center',
                }}>
                <TextInput
                  value={ser}
                  onChangeText={txt => setser(txt)}
                  style={{
                    borderWidth: 0.6,
                    borderColor: Colors.white,
                    borderRadius: widthPercentageToDP(3),
                    paddingHorizontal: widthPercentageToDP(5),
                    color: 'white',
                    height: heightPercentageToDP(6),
                  }}
                  placeholder="To : "
                  placeholderTextColor="white"
                  onBlur={() => UserList()}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 0,
                    paddingHorizontal: widthPercentageToDP(4),
                    paddingVertical: heightPercentageToDP(1.5),
                  }}
                  onPress={() => {
                    setser(''), UserList();
                  }}>
                  <Icon3 name="close" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={Dataary}
                renderItem={frien}
                // keyExtractor={item => item.id}
              />
            </View>
            <TouchableOpacity
              style={{
                width: widthPercentageToDP(8),
                height: widthPercentageToDP(8),
                borderRadius: widthPercentageToDP(4),
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                right: 0,
                // marginRight: widthPercentageToDP(1),
                top: heightPercentageToDP(-1),
              }}
              onPress={() => setModalVisible(false)}>
              <Icon name="close" size={18} color={Colors.white} />
            </TouchableOpacity>
          </View>
        ) : null}
        {/* </Modal> */}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Chat;
