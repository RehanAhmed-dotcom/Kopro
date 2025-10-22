import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
  Share,
  Modal,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {LikeApi, Dislikeapi, detailApi} from '../apis/index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {notId} from '../../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Icon3 from 'react-native-vector-icons/Ionicons';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {detailApiForm} from '../apis/index';
import LinearGradient from 'react-native-linear-gradient';
const Producerdetail = ({navigation, route}: {navigation: any, route: any}) => {
  const [arydata, setarydata] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const [modalState, setmodalState] = useState(false);
  const [current, setcurrent] = useState('');
  const [dataitem, setdataitem] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(';;;;;;././././.', route.params?.dataitem);
      dataMan(route.params?.dataitem);
    });
    return unsubscribe;
  }, [route.params?.dataitem]);

  // const {dataitem} = route.params;
  const [cros, setcros] = useState(dataitem.dislike);
  const [tik, settik] = useState(dataitem.like);

  const dataMan = async ids => {
    console.log('route', route.params?.dataitem);
    const data = new FormData();
    data.append('id', route.params?.dataitem);
    await detailApi({Auth: userData?.api_token, id: route.params?.dataitem})
      .then(res => {
        console.log('Home Api  respone..........++++++++++++++++++++', res);
        setdataitem(res.data);
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };

  const onShare = async () => {
    const link = await dynamicLinks().buildLink({
      link: `https://kopro.page.link/${dataitem.id}`,
      android: {
        packageName: 'com.kopro',
      },
      domainUriPrefix: 'https://kopro.page.link',
    });
    onShare5(link);
    console.log(link);
  };

  const onShare5 = async i => {
    try {
      await Share.share({
        message: `Kopro App. ${i}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  const dispatch = useDispatch();

  const renderFriend = ({item}) => (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View
        style={{
          height: 5,
          width: 5,
          // marginLeft: 15,
          borderRadius: 5,
          backgroundColor: 'grey',
        }}></View>
      <Text style={styles.login}>{item.firstname}</Text>
    </View>
    // <View
    //   style={{
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     width: wp(20),
    //     marginTop: hp(1.5),
    //   }}>
    //   <Image
    //     source={item.image == null ? images.explore : {uri: item.image}}
    //     resizeMode="contain"
    //     style={{width: wp(18), height: wp(18), borderRadius: wp(9)}}
    //   />
    //   <Text
    //     style={{
    //       color: 'white',
    //       fontSize: 14,
    //       fontFamily: 'Helvetica',
    //     }}>
    //     {item.firstname}
    //   </Text>
    // </View>
  );
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setcurrent(item.image), setmodalState(true);
      }}
      style={{
        width: wp(30),
        borderRadius: 10,
        marginRight: 10,
        marginTop: 10,
        overflow: 'hidden',
        height: hp(21),
      }}>
      <Image
        source={{uri: item.image}}
        style={styles.bpictures}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
  const likefun = item => {
    const data = new FormData();
    data.append('id', item);

    LikeApi({Auth: userData?.api_token, data})
      .then(res => {
        // console.log('Like Api   respone..........', res);
        if (res.status == 'success') {
          settik(tik == 0 ? 1 : 0);
          tik != 0 || cros != 0 ? setcros(cros == 0 ? 1 : 0) : null;

          Platform.OS == 'android'
            ? ToastAndroid.show(
                'You added this user as a friend',
                ToastAndroid.SHORT,
              )
            : Toast.show('You added this user as a friend.', Toast.LONG);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data);
        if (
          error.response.data.message ==
          'You added Already this user as a friend'
        ) {
          Platform.OS == 'android'
            ? ToastAndroid.show(
                `${error.response.data.message}`,
                ToastAndroid.SHORT,
              )
            : null;
        } else {
          console.log('Error Meaasge', error);
        }
      });
  };
  let save = '';
  const dislikefun = item => {
    const data = new FormData();
    data.append('id', item);

    Dislikeapi({Auth: userData?.api_token, data})
      .then(res => {
        // console.log('Like Api   respone..........', res);
        if (res.status == 'success') {
          settik(tik == 0 ? 1 : 0);
          tik != 0 || cros != 0 ? setcros(cros == 0 ? 1 : 0) : null;
          Platform.OS == 'android'
            ? ToastAndroid.show(
                'You have passed on this User',
                ToastAndroid.SHORT,
              )
            : Toast.show('You have passed on this User', Toast.LONG);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data);
        if (
          error.response.data.message == 'You have Already passed on this User'
        ) {
          Platform.OS == 'android'
            ? ToastAndroid.show(
                `${error.response.data.message}`,
                ToastAndroid.SHORT,
              )
            : null;
        } else {
          console.log('Error Meaasge', error);
        }
      });
  };
  return (
    <ImageBackground style={styles.headerImage} source={images.edit}>
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
            <Icon1
              name="arrowleft"
              size={25}
              onPress={() => navigation.goBack()}
              color={Colors.white}
              style={{marginBottom: wp(5)}}
            />
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'MontserratAlternates-Semibold',
              }}>
              Profile Detail
            </Text>
            <Icon1
              name="sharealt"
              size={25}
              onPress={() => onShare()}
              color={Colors.white}
              style={{marginBottom: wp(5)}}
            />
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View style={styles.box}>
              <View style={styles.boxinside}>
                <Image
                  source={
                    dataitem.image == null
                      ? images.explore
                      : {uri: dataitem.image}
                  }
                  style={styles.profile}
                  resizeMode="contain"
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                // justifyContent: 'center'
                // ,
                marginLeft: 15,
                // marginTop: wp(5),
                // backgroundColor: 'red',
                marginBottom: hp(2),
              }}>
              <Text
                style={styles.name}
                onPress={() => {
                  navigation.navigate('genre');
                }}>
                {dataitem.firstname + ' ' + dataitem.lastname}
              </Text>
              {dataitem.verified == 1 ? (
                <TouchableOpacity style={styles.icns}>
                  <Icon3
                    name="md-musical-note"
                    size={12}
                    color={Colors.main_back_color}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <Text
              style={{
                color: 'grey',
                fontSize: 14,
                marginLeft: 15,
                fontFamily: 'Helvetica',
                letterSpacing: 1,
                // marginVertical: wp(3),
                // color: 'white',
              }}>
              {dataitem.about_me}
            </Text>
            <View style={styles.aboutbox}>
              <View style={styles.aboutboxinside}>
                <View style={styles.social}>
                  {dataitem.facebook != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.facebook == null
                          ? null
                          : Linking.openURL(dataitem.facebook);
                      }}
                      style={{marginRight: wp(2)}}>
                      <Image
                        source={images.fac}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataitem.youtube != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.youtube == null
                          ? null
                          : Linking.openURL(dataitem.youtube);
                      }}
                      style={{marginRight: wp(2)}}>
                      <Image
                        source={images.you}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataitem.tiktok != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.tiktok == null
                          ? null
                          : Linking.openURL(dataitem.tiktok);
                      }}
                      style={{marginRight: wp(2)}}>
                      <Image
                        source={images.tiktok}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataitem.twitter != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.twitter == null
                          ? null
                          : Linking.openURL(dataitem.twitter);
                      }}
                      style={{marginRight: wp(2)}}>
                      <Image
                        source={images.twi}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataitem.soundcloud != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.soundcloud == null
                          ? null
                          : Linking.openURL(dataitem.soundcloud);
                      }}
                      style={{marginRight: wp(2)}}>
                      <Image
                        source={images.cl}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataitem.instagram != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.instagram == null
                          ? null
                          : Linking.openURL(dataitem.instagram);
                      }}
                      style={{marginRight: wp(2)}}>
                      <Image
                        source={images.int}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                  {dataitem.genius != null ? (
                    <TouchableOpacity
                      onPress={() => {
                        dataitem.genius == null
                          ? null
                          : Linking.openURL(dataitem.genius);
                      }}>
                      <Image
                        source={images.geni}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>

            <View style={[styles.aboutbox, {marginTop: wp(3)}]}>
              <View style={styles.aboutboxinside}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Helvetica-Bold',
                      color: Colors.white,
                    }}>
                    Friends {''}
                    <Text style={{color: 'white', fontSize: 13}}>
                      ({dataitem?.friends?.length})
                    </Text>
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      notId(dataitem?.id)(dispatch);
                      navigation.navigate('friends');
                    }}>
                    <Text style={{color: 'white'}}>See All</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  // numColumns={4}
                  data={dataitem?.friends?.slice(0, 8)}
                  renderItem={renderFriend}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
            <Text
              style={{
                marginLeft: 15,
                marginBottom: 10,
                color: 'white',
                fontSize: 16,
                fontFamily: 'Helvetica-Bold',
              }}>
              Skills
            </Text>
            {dataitem?.interest?.map(item => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    height: 5,
                    width: 5,
                    marginLeft: 15,
                    borderRadius: 5,
                    backgroundColor: 'grey',
                  }}></View>
                <Text style={styles.login}>{item}</Text>
              </View>
            ))}
            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button, {marginTop: wp(2)}]}>
              <View
                style={{
                  // flexDirection: 'column',
                  // alignItems: 'center',
                  // justifyContent: 'center',
                }}>
                <Text style={styles.login}>
                  {dataitem?.interest?.toString()}
                </Text>
                
              </View>
            </TouchableOpacity> */}
            <Text
              style={{
                marginLeft: 15,
                marginBottom: 10,
                marginTop: 20,
                color: 'white',
                fontSize: 16,
                fontFamily: 'Helvetica-Bold',
              }}>
              Gallary
            </Text>
            <View
              style={{
                marginHorizontal: wp(5),
                flexDirection: 'row',
                marginBottom: 20,
                justifyContent: 'space-between',
              }}>
              <FlatList
                data={dataitem.images}
                numColumns={3}
                key={3}
                renderItem={renderItem}
              />
            </View>
            <View style={[styles.aboutbox, {marginTop: wp(3)}]}>
              <View style={styles.aboutboxinside}>
                {/* <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Helvetica-Bold',
                    color: Colors.main_back_color,
                  }}>
                  Options
                </Text> */}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#1A0B19',
                    height: 115,
                    borderWidth: 1,
                    borderColor: Colors.main_back_color,
                    paddingHorizontal: 20,
                    borderRadius: 10,
                    width: wp(90),
                    // marginTop: hp(2),
                    // marginHorizontal: wp(10),
                  }}>
                  <TouchableOpacity
                    style={styles.icn}
                    onPress={() => dislikefun(dataitem.id)}>
                    <Text
                      style={{
                        fontSize: 30,
                        fontFamily: 'Helvetica-Bold',
                        color: cros == 1 ? Colors.main_back_color : 'grey',
                      }}>
                      X
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.icn}
                    onPress={() => likefun(dataitem.id)}>
                    <LinearGradient
                      colors={['#9B1B95', '#FF4043']}
                      style={[styles.actionButton, styles.musicButton]}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}>
                      <Icon name="musical-note" size={45} color={'white'} />
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.icn}
                    onPress={() =>
                      navigation.navigate('msg', {
                        item: dataitem,
                        time: dataitem.created_at,
                      })
                    }>
                    <Icon
                      name="chatbox-ellipses"
                      size={22}
                      color={Colors.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal animationType="fade" visible={modalState} transparent={true}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <View
              style={{
                width: wp(90),
                height: hp(55),
                // backgroundColor: Colors.white,
              }}>
              <Image
                source={{uri: current}}
                style={{width: wp(90), height: hp(55)}}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: wp(4),
                  top: -10,
                  backgroundColor: 'red',
                  borderRadius: wp(4),
                  width: wp(8),
                  height: wp(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setmodalState(false)}>
                <Icon1 name="close" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Producerdetail;
