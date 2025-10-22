import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  ToastAndroid,
  SafeAreaView,
  Alert,
  FlatList,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import SplashScreen from 'react-native-splash-screen';
import LinearGradient from 'react-native-linear-gradient';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logout, notId} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import {
  HomeProfile,
  AccountDelete,
  AccountApproval,
  logoutMan,
} from '../apis/index';
import {useSelector} from 'react-redux';
import Loader from '../../constants/loader';

const Producer = ({navigation}) => {
  const [md, setmd] = useState(false);
  const [arydata, setarydata] = useState('');
  const {userData} = useSelector(({USER}) => USER);
  const [modalState, setmodalState] = useState(false);
  const [current, setcurrent] = useState('');
  const [loding, setloding] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const {height: screenHeight} = Dimensions.get('window');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      HomeprofileData();
    });
    return unsubscribe;
  }, [navigation]);

  console.log('aeae', JSON.stringify(userData, null, 2));

  const HomeprofileData = () => {
    HomeProfile({Auth: userData?.api_token})
      .then(res => {
        setloding(false);
        console.log(
          'Profile++++ respone..........',
          JSON.stringify(res, null, 2),
        );
        setarydata(res.data);
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasge', error);
      });
  };
  const Account_Delete = () => {
    setloding(true);

    AccountDelete({Auth: userData?.api_token})
      .then(res => {
        setloding(false);
        console.log('Deleted..........', JSON.stringify(res));
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasge', error);
      });
  };
  const ApprovedAcc = () => {
    AccountApproval({Auth: userData?.api_token})
      .then(res => {
        console.log('Approved..........', JSON.stringify(res));
        Platform.OS == 'android'
          ? ToastAndroid.show('Request to be Verified', ToastAndroid.SHORT)
          : Alert.alert('Request to be Verified');
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };
  const dispatch = useDispatch();
  const logut = () => {
    logoutMan({Auth: userData?.api_token})
      .then(res => {
        console.log('>>>', res);
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        setcurrent(item.image), setmodalState(true);
      }}
      style={{width: wp(30), height: hp(21), marginTop: wp(2)}}>
      <Image
        source={item.image == null ? images.explore : {uri: item.image}}
        style={styles.bpictures}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const renderFriend = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: wp(20),
        marginTop: hp(1.5),
      }}
      onPress={() => {
        navigation.navigate('producerdetail', {dataitem: item.id});
      }}>
      <Image
        source={item?.image == null ? images.explore : {uri: item?.image}}
        resizeMode="contain"
        style={{width: wp(18), height: wp(18), borderRadius: wp(9)}}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontFamily: 'Helvetica',
        }}>
        {item?.firstname}
      </Text>
    </TouchableOpacity>
  );
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1, marginTop: 40}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}

        {!loding ? (
          <View style={styles.root}>
            <View style={styles.top}>
              <Image
                style={{height: 41, width: 41}}
                source={images.testlogo}
                resizeMode="cover"
              />

              <Text
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  fontFamily: 'MontserratAlternates-Semibold',
                  textAlign: 'center',
                  fontSize: 20,
                  color: 'white',
                }}>
                Profile
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name="dots-three-vertical"
                  size={23}
                  style={{right: 10}}
                  color={Colors.white}
                  onPress={() => setmd(true)}
                />
                <Icon1
                  name="edit"
                  size={25}
                  color={Colors.white}
                  onPress={() => navigation.navigate('editprofile')}
                />
              </View>
            </View>

            <View style={styles.box}>
              <View style={styles.container}>
                {/* Background Image */}
                <Image
                  source={
                    arydata?.image == null
                      ? images.explore
                      : {uri: arydata?.image}
                  }
                  style={styles.image}
                  resizeMode="cover"
                />

                {/* Gradient Overlay - Bottom 50% of screen */}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)']}
                  style={styles.gradientOverlay}
                  locations={[0, 0.3, 1]}>
                  <View style={styles.nameContainer}>
                    <Text
                      style={
                        styles.name
                      }>{`${arydata?.firstname} ${arydata?.lastname}`}</Text>
                    {arydata?.verified == 1 ? (
                      <View style={styles.verificationBadge}>
                        <Text style={styles.checkmark}>✓</Text>
                      </View>
                    ) : null}
                  </View>

                  <Text style={styles.bio}>
                    {arydata.about_me == null
                      ? 'No Description Added.'
                      : arydata.about_me}
                  </Text>
                  <View style={styles.statsContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Followers', {
                          dataitem: arydata?.followingList,
                          name: 'Following',
                        })
                      }
                      style={styles.stat}
                    >
                      <Text style={styles.name}>{arydata?.following}</Text>
                      <Text style={styles.statLabel}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Followers', {
                          dataitem: arydata?.followerList,
                          name: 'Followers',
                        })
                      }
                      style={[styles.stat, { left: 30 }]}
                    >
                      {/* fglksjgdsfk */}
                      <Text style={styles.name}>{arydata?.follower}</Text>
                      <Text style={styles.statLabel}>Followers</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                      <Text style={styles.name}>{arydata?.music_credit}</Text>
                      {/* <Text style={styles.statLabel}>Following</Text> */}
                    </View>
                    <View style={[styles.stat, { left: 30 }]}>
                      <Text style={styles.name}>{arydata?.location}</Text>
                      {/* <Text style={styles.statLabel}>Followers</Text> */}
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>

            <Loader sts={loding} />
            {md ? (
              <View style={styles.boxmodal}>
                <View style={styles.boxinsidemodal}>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.button}
                      onPress={() => {
                        setmd(false), ApprovedAcc();
                      }}>
                      <Text style={styles.login}>Request Verification</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.button}
                      onPress={() => {
                        setmd(false), navigation.navigate('changepass');
                      }}>
                      <Text style={styles.login}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.button}
                      onPress={() => {
                        Alert.alert(
                          'Confirm',
                          'Are you sure you want to delete your account',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                setmd(false), Account_Delete();
                              },
                            },
                          ],
                        );
                      }}>
                      <Text style={styles.login}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.button}
                      onPress={() => {
                        Alert.alert(
                          'Confirm',
                          'Are you sure you want to logout',
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {
                              text: 'OK',
                              onPress: () => {
                                setmd(false);
                                // logut();
                                logout()(dispatch);
                              },
                            },
                          ],
                        );
                      }}>
                      <Text style={styles.login}>Logout</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    // flex: 1,
                    height: hp(50),
                    width: wp(100),
                  }}
                  onPress={() => setmd(false)}
                />
              </View>
            ) : null}
          </View>
        ) : (
          <Loader sts={loding} />
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Producer;
