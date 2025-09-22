import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform,
  SafeAreaView,
} from 'react-native';
import database from '@react-native-firebase/database';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {myGroup} from '../apis/index';
import {useSelector} from 'react-redux';
import Loader from '../../constants/loader';

const Own = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      shogrpups();
    });
    return unsubscribe;
  }, [navigation]);
  const [loding, setloding] = useState(false);
  const [arydata, setarydata] = useState([]);
  console.log('--[[[[rrr[[[[', arydata);

  const [user, setUser] = useState([]);
  const id = '-N4kp_8hB4wCCGew8sC8';
  // useEffect(() => {
  //   database()
  //     .ref(`groups/${id}/members`)
  //     .on('value', dataSnapshot => {
  //       let userArr = [];
  //       console.log('dataSnapshot', dataSnapshot);
  //       dataSnapshot.forEach(child => {
  //         console.log('child', child);
  //         if (child.val()) {
  //           userArr.push(`${child.val().firstname} ${child.val().lastname}`);
  //         }
  //         // console.log("member specific",child.val().firstname);
  //         //
  //       });
  //       console.log('user arr', userArr);
  //       setUser(userArr);
  //     });
  // }, []);

  // console.log('arry', user);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.box}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('labchat', {item});
        // console.log('item', item);
      }}>
      <View style={styles.boxinside}>
        <View style={{height: 127}}>
          <Image
            source={item.cover == '' ? images.grp : {uri: item.cover}}
            style={styles.pic}
            resizeMode="cover"
          />
          <View style={styles.topmain}>
            <Image
              source={
                item.groupImage == '' ? images.person : {uri: item.groupImage}
              }
              style={styles.pics}
              resizeMode="cover"
            />

            <View style={styles.detail}>
              <Text style={styles.detail_title}>{item.groupName}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
          }}>
          <Text
            style={styles.detail_text}
            numberOfLines={6}
            ellipsizeMode="tail">
            {item.groupDesc}
          </Text>
          <View>
            <Text
              style={{
                marginVertical: 10,
                color: 'white',
                fontFamily: 'MontserratAlternates-Medium',
              }}>
              Group Type: {item.groupType}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const {userData} = useSelector(({USER}) => USER);

  const shogrpups = () => {
    try {
      database()
        .ref(`user/${userData?.id}/groups`)
        .orderByChild('timestamp')
        .on('value', dataSnapshot => {
          let groups = [];
          dataSnapshot.forEach(child => {
            console.log('child', child);
            groups.push(child.val());
          });
          setarydata(groups.reverse());
          setloding(false);
        });
    } catch (err) {
      console.log('error in show groups', err);
      setloding(false);
    }
    // myGroup({Auth: userData.api_token})
    //   .then(res => {
    //     console.log('My OwnGroup respone..........', res);
    //     setarydata(res.groups);
    //    setloding(false);
    //   })
    //   .catch(error => {
    //     console.log('Error Meaasge', error.response.data.message);
    //   });
  };

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
              style={{width: wp(18)}}
            />
            <Text style={styles.title}>Groups</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('groups');
              }}>
              <Image
                style={{width: 20, height: 20}}
                resizeMode="contain"
                source={require('../../assets/images/CreateGroup.png')}
              />
            </TouchableOpacity>
          </View>

          <FlatList
            data={arydata}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />

          <Loader sts={loding} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Own;
