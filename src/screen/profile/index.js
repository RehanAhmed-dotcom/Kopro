import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import SplashScreen from 'react-native-splash-screen';
import {EditProfile} from '../apis/index';
import Loader from '../../constants/loader';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useSelector} from 'react-redux';
import {setLoader, userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';

const Profile = ({navigation, route}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const {userData} = useSelector(({USER}) => USER);
  console.log(userData);

  // const radio = route?.params?.radio;
  // console.log('radio', radio);

  const dispatch = useDispatch();

  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const [first, setfirst] = useState(userData?.firstname);
  const [last, setlast] = useState(userData?.lastname);
  const [mail, setmail] = useState(userData?.email);
  const [age, setage] = useState(userData?.age);
  const [img, setimg] = useState(userData?.image);
  const [ins, setins] = useState(userData?.instrument);
  const [skil, setskil] = useState(userData?.interest);
  const [radio, setradio] = useState(userData?.genre);
  const [aboutme, setaboutme] = useState();
  const [credit, setcredit] = useState();
  const [facebook, setfacebook] = useState('');
  const [youtube, setyoutube] = useState('');
  const [tik, settik] = useState('');
  const [cloud, setcloud] = useState('');
  const [instagram, setinstagram] = useState('');
  const [twitter, settwitter] = useState('');
  const [geniusap, setgeniusap] = useState('');
  const profileUpdate = () => {
    setloding(true);
    seterr('');
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      mail.replace(/\s/g, ''),
    );
    console.log('Valid and invalid', valid);

    // console.log(genre);

    if (!valid) {
      setloding(false);
      seterr('Enter Valid Email Adress');
    } else {
      setLoader(true);
      const data = new FormData();
      data.append('firstname', first);
      data.append('lastname', last);
      data.append('email', mail);
      data.append('music_credit', credit);

      radio.forEach(element => {
        // data.append('interest[]', element);
        data.append('genre[]', element);
      });
      skil.forEach(element => {
        // data.append('interest[]', element);
        data.append('interest[]', element);
      });
      ins.forEach(element => {
        // data.append('interest[]', element);
        data.append('instrument[]', element);
      });

      data.append('about_me', aboutme);

      console.log('hasds', data);

      {
        if (facebook) {
          const fac = 'https://www.facebook.com/' + facebook;
          facebook && data.append('facebook', fac);
        }
      }
      {
        if (youtube) {
          const you = 'https://www.youtube.com/' + youtube;
          youtube && data.append('youtube', you);
        }
      }
      {
        if (cloud) {
          const clo = 'https://www.cloudflare.com/' + cloud;
          cloud && data.append('soundcloud', clo);
        }
      }
      {
        if (tik) {
          const tok = 'https://www.tiktok.com/' + tik;
          tik && data.append('tiktok', tok);
        }
      }
      {
        if (instagram) {
          const inta = 'https://www.instagram.com/' + instagram;
          instagram && data.append('instagram', inta);
        }
      }
      {
        if (twitter) {
          const twi = 'https://www.twitter.com/' + twitter;
          twitter && data.append('twitter', twi);
        }
      }
      {
        if (geniusap) {
          const geniusa = 'https://genius.com/' + geniusap;
          geniusap && data.append('genius', geniusa);
        }
      }
      console.log('sdsd', userData?.api_token, data);
      EditProfile({Auth: userData?.api_token, data})
        .then(res => {
          console.log('EditProfile..........', res);
          setLoader(false);
          seterr('');
          if (res.status == 'success') {
            setloding(false);
            userAuthorize(res.userdata)(dispatch);

            // navigation.navigate('bottomtab');

            Platform.OS != 'ios'
              ? ToastAndroid.show(
                  'Profile Updated Successfully',
                  ToastAndroid.SHORT,
                )
              : null;
          }
        })
        .catch(error => {
          setLoader(false);

          console.log('Error Meaasge', error.response.data);
        });
    }
  };
  const GoBack = () => {
    console.log('---00000', userData);

    let arr = {...userData};
    arr.genre = null;
    userAuthorize(arr)(dispatch);
  };
  const formatss = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  return (
    <ImageBackground style={styles.headerImage} source={images.back2}>
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
              onPress={() => {
                GoBack();
              }}
            />
            <Text style={styles.title}>Complete Profile</Text>
            <Text></Text>
          </View>
          <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}>
              <View style={styles.box}>
                <View style={styles.boxinside}>
                  <View style={styles.imgplace}>
                    <Image
                      source={img == null ? images.noti : {uri: img}}
                      style={styles.profile}
                      resizeMode="contain"
                    />
                  </View>

                  <Text style={styles.profiletitle}>
                    {userData?.interest.toString()}
                  </Text>

                  <View style={styles.form}>
                    {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}> */}
                    <Box
                      lab="FIRST NAME"
                      // wid={wp(37)}
                      val={first}
                      onchg={txt => setfirst(txt)}
                    />
                    <Box
                      lab="LAST NAME"
                      // wid={wp(37)}
                      val={last}
                      onchg={txt => setlast(txt)}
                    />
                    {/* </View> */}

                    <Box lab="E-MAIIL" val={mail} onchg={txt => setmail(txt)} />
                    {/* <Box lab="AGE" val={age} onchg={txt => setage(txt)} /> */}
                    {/* <Box lab="MUSIC" val={music} onchg={txt => setmusic(txt)} /> */}
                    <Box
                      lab="ABOUT ME"
                      val={aboutme}
                      onchg={txt => setaboutme(txt)}
                    />
                    <Box
                      lab="CREDITS"
                      val={credit}
                      onchg={txt => setcredit(txt)}
                    />
                    {/* <Box lab="MUSIC" /> */}

                    {/* <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('genre');
                  }}>
                  <Icon1
                    name="keyboard-arrow-right"
                    size={20}
                    color={Colors.white}
                    style={{
                      position: 'absolute',
                      top: wp(7),
                      alignSelf: 'flex-end',
                    }}
                  />
                  <Box lab="GENRE" val={radio ? radio.toString() : null} />
                </TouchableOpacity> */}
                    <Text
                      style={{
                        color: 'white',
                        marginTop: wp(8),
                        top: 6,
                        fontSize: 16,
                        fontFamily: 'MontserratAlternates-SemiBold',
                      }}>
                      ADD LINKS
                    </Text>

                    <View>
                      <Image
                        source={images.fac}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={facebook}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setfacebook(txt);
                          }
                        }}
                        labplace="YourName"
                      />
                    </View>

                    <View style={{}}>
                      <Image
                        source={images.you}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={youtube}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setyoutube(txt);
                          }
                        }}
                        labplace="YourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.tiktok}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={tik}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            settik(txt);
                          }
                        }}
                        labplace="YourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.cl}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={cloud}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setcloud(txt);
                          }
                        }}
                        labplace="YourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.int}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={instagram}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setinstagram(txt);
                          }
                        }}
                        labplace="YourName"
                      />
                    </View>
                    <View>
                      <Image
                        source={images.twi}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={twitter}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            settwitter(txt);
                          }
                        }}
                        labplace="YourName"
                      />
                    </View>
                    <View>
                      <Image
                        source={images.geni}
                        style={styles.icon}
                        resizeMode="contain"
                      />

                      <Box
                        lab="social"
                        val={geniusap}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setgeniusap(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  marginTop: hp(6),
                  alignSelf: 'center',
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                {err}
              </Text>

              <Loader sts={loding} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => profileUpdate()}>
                <Text style={styles.login}>Continue</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Profile;
