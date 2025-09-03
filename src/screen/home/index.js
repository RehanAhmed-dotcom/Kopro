import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ToastAndroid,
  TouchableOpacity,
  Platform,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  HomeApi,
  LikeApi,
  showallexplore,
  Dislikeapi,
  Notify,
  fcm_Update,
} from '../apis/index';
import {useSelector} from 'react-redux';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Loader from '../../constants/loader';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import Icon5 from 'react-native-vector-icons/FontAwesome';

import Toast from 'react-native-simple-toast';
import Header from '../../Components/Header';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {chat, message} from '../../assets/svgs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Home = ({navigation, route}: {navigation: any, route: any}) => {
  const [ser, setser] = useState('');
  const {top} = useSafeAreaInsets();
  useEffect(() => {
    SplashScreen.hide();

    // requestNotifications(['alert', 'sound']).then(({status, settings}) => {});
  }, []);
  const {userData} = useSelector(({USER}) => USER);
  let yststus = 0;
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Homedata();
      setser('');
    });
    return unsubscribe;
  }, [navigation]);

  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const [tempData, settempData] = useState([]);
  const [Dataary, setDataary] = useState([]);
  const [notify, setnotify] = useState([]);
  let count = 0;
  notify.forEach(element => {
    if (element.status == false) {
      count = count + 1;
    }
  });
  // console.log('_{_{_', Dataary);

  // const searchRecordbylink = async idn => {
  //   const datsa = await Dataary.filter(x => x.id === route.params.id);
  //   console.log('////', datsa);
  // };

  const searchRecord = async () => {
    setloding(true);
    let texts = ser.toLowerCase();
    const data = new FormData();
    data.append('search', texts);
    await showallexplore({Auth: userData?.api_token, data})
      .then(res => {
        console.log('{}{}{', res.users);
        if (res.status == 'success') {
          setDataary(res.data);
          setloding(false);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };

  const Homedata = async () => {
    setTimeout(() => {
      setloding(true);
      HomeApi({Auth: userData?.api_token})
        .then(res => {
          setloding(false);
          setDataary(res.data);
          settempData(res.data);
          NotifiFun();
        })
        .catch(error => {
          setloding(false);
          console.log('Error Meaasge', error);
        });
    }, 2000);
  };

  const LikeDislikeHomeData = itm => {
    setloding(true);

    HomeApi({Auth: userData?.api_token})
      .then(res => {
        setloding(false);
        // console.log('Home Api  respone..........', res);
        let ayy = [];
        let rr = {};
        res.data.forEach(element => {
          if (element.id != itm) {
            ayy.push(element);
          } else {
            rr = element;
          }
        });
        setDataary(ayy);
        // setTimeout(() => {
        //   let arruu = [Dataary];
        //   arruu.unshift(rr);
        //   setDataary(arruu);
        // }, 2000);
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };

  const likefun = item => {
    setloding(true);

    const data = new FormData();
    data.append('id', item);

    LikeApi({Auth: userData?.api_token, data})
      .then(res => {
        setTimeout(() => {
          setloding(false);
        }, 1000);
        // console.log('Like Api   respone..........', res);
        if (res.status == 'success') {
          Platform.OS != 'ios'
            ? ToastAndroid.show(res.message, ToastAndroid.SHORT)
            : Toast.show(res.message, Toast.LONG);
          LikeDislikeHomeData(item);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data);
        if (
          error.response.data.message ==
          'You added Already this user as a friend'
        ) {
          Platform.OS != 'ios'
            ? ToastAndroid.show(
                `${error.response.data.message}`,
                ToastAndroid.SHORT,
              )
            : Toast.show('You added Already this user as a friend', Toast.LONG);
        } else {
          console.log('Error Meaasge', error);
        }
      });
  };
  const dislikefun = item => {
    setloding(true);
    const data = new FormData();
    data.append('id', item);

    Dislikeapi({Auth: userData?.api_token, data})
      .then(res => {
        setTimeout(() => {
          setloding(false);
        }, 1000);

        // console.log('Like Api   respone..........', res);
        if (res.status == 'success') {
          // ToastAndroid.show('You have passed on this User', ToastAndroid.SHORT);
          Toast.show('You have passed on this User', Toast.LONG);
          LikeDislikeHomeData(item);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data);
        if (
          error.response.data.message == 'You have Already passed on this User'
        ) {
          ToastAndroid.show(
            `${error.response.data.message}`,
            ToastAndroid.SHORT,
          );
        } else {
          console.log('Error Meaasge', error);
        }
      });
  };

  const NotifiFun = () => {
    Notify({Auth: userData?.api_token})
      .then(res => {
        setloding(false);
        // console.log('Notification ===================..........', res);
        setnotify(res.data);
        // console.log('--', res.data);
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasge', error.response.data.message);
      });
  };

  const listuser = ({item}) => (
    <View style={styles.box}>
      <View style={styles.boxinside}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('producerdetail', {dataitem: item.id});
              }}
              activeOpacity={0.9}>
              <Image
                source={item.image == null ? images.explore : {uri: item.image}}
                style={styles.avatar}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {item.firstname + ' ' + item.lastname}
              </Text>
              {item?.verified == 1 ? (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.detail}>@username</Text>
            <View style={styles.followStats}>
              <Text style={styles.followText}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-Regular',
                  }}>
                  {item.following}
                </Text>{' '}
                Following
              </Text>
              <Text style={styles.separator}> | </Text>
              <Text style={styles.followText}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                    fontFamily: 'MontserratAlternates-Regular',
                  }}>
                  {item.follower}
                </Text>{' '}
                Followers
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.bio}>
          {item.about_me == null ? 'No Description Added.' : item.about_me}
        </Text>
        {/* <View style={styles.heart}>
          <Icon name="heart" size={13} color={Colors.white} />
          <Text style={styles.title}>87% Match!</Text>
        </View> */}

        <Text
          style={{
            color: Colors.white,
            fontSize: 10,
            fontFamily: 'MontserratAlternates-Regular',
            letterSpacing: 1,
            textAlign: 'center',
            marginBottom: hp(1),
            marginTop: wp(2),
          }}>
          {item.f_me == 1 ? 'This person is following you' : null}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: wp(10),
          }}>
          <TouchableOpacity
            style={styles.icn}
            onPress={() => dislikefun(item.id)}>
            <Icon
              name="close"
              size={40}
              color={item.dislike == 1 ? 'white' : 'grey'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.musicButton]}
            onPress={() => likefun(item.id)}>
            <LinearGradient
              colors={['#9B1B95', '#FF4043']}
              style={[styles.actionButton, styles.musicButton]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Icon
                name="musical-note"
                size={45}
                color={item.like == 1 ? 'white' : 'white'}
              />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.icn}
            onPress={() =>
              navigation.navigate('msg', {
                item,
                time: item.created_at,
              })
            }>
            {/* <Text style={{color:Colors.main_back_color}}>Chat</Text> */}
            <SvgXml width={'30'} height={'30'} xml={chat} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateFcm();
    });
    return unsubscribe;
  }, [navigation]);
  const updateFcm = async () => {
    let fcmToken = await messaging().getToken();
    console.log('ye deveices token ha', fcmToken);
    const data = new FormData();
    data.append('fcm_token', fcmToken);
    fcm_Update({Auth: userData?.api_token, data})
      .then(res => console.log('FCM_REASPONDE', res))
      .catch(error => console.log('fxm nor', error));
  };

  // console.log('array', Dataary);
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1, top}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}
        <Header title={'Explore'} count={count} showRightIcon />

        <View style={styles.root}>
          <View style={styles.top}>
            {/* <Icon3
      name="person"
      size={20}
      color="white"
      onPress={() => {
        navigation.navigate('producer');
      }}
    /> */}
          </View>
          <View
            style={{
              width: wp(87),
              alignSelf: 'center',
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: 0,
                top: 2,
                paddingHorizontal: wp(4),
                paddingVertical: hp(1.5),
                zIndex: 2,
              }}
              onPress={() => {
                setser('');
                searchRecord();
              }}>
              <Icon name="search-outline" size={20} color={'white'} />
            </TouchableOpacity>
            <TextInput
              value={ser}
              onChangeText={txt => setser(txt)}
              style={{
                borderWidth: 2,
                borderColor: '#4C0C45',
                backgroundColor: '#1A0B19',
                borderRadius: wp(3),
                paddingLeft: wp(11),
                paddingHorizontal: wp(5),
                color: 'white',
                height: hp(6),
              }}
              placeholder="Search here..."
              placeholderTextColor="white"
              onBlur={() => searchRecord()}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 0,
                top: 2,
                paddingHorizontal: wp(4),
                paddingVertical: hp(1.5),
              }}
              onPress={() => {
                setser(''), searchRecord();
              }}>
              <Icon3 name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* {!loding ? ( */}
          <SwiperFlatList
            horizontal={false}
            // autoplayDelay={5}
            // index={1}
            // autoplay
            // autoplayLoop={true}
            data={Dataary}
            renderItem={listuser}
          />
          {/* ) : ( */}
          <Loader sts={loding} />
          {/* )} */}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Home;
