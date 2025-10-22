import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {passwordapi} from '../apis/index';
import Loader from '../../constants/loader';
import {Image} from 'react-native';
import GradientButton from '../../Components/GradientButton';

const Password = ({navigation, route}: {navigation: any}) => {
  let mail = route.params.em;
  let code = route.params.cod;

  const [password, setpassword] = useState('');
  const [conpass, setconpass] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const reset = () => {
    setloding(true);
    seterr('');
    if (!conpass || !password) {
      setloding(false);
      seterr('All Fields is Required');
    } else if (password.length < 8 || conpass.length < 8) {
      setloding(false);
      seterr('Password Contain 8 Charcter');
    } else if (password != conpass) {
      setloding(false);
      seterr('Password Must Match');
    } else {
      const data = new FormData();
      data.append('password', password);
      data.append('password_confirmation', conpass);
      data.append('email', mail);
      data.append('pin', code);

      passwordapi(data)
        .then(res => {
          setloding(false);

          console.log('Password reset   respone..........', res);
          if (res.status == 'success') {
            navigation.navigate('login');
            Platform.OS == 'android'
              ? ToastAndroid.show('Signup Successfully', ToastAndroid.SHORT)
              : null;
          }
        })
        .catch(error => {
          setloding(false);

          console.log('Error Meaasge', error);
        });
    }
  };

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
          {/* <Text style={styles.title}>Forgot Password</Text> */}
          <Text></Text>
        </View>
        <ScrollView>
          <View style={styles.box}>
            <View style={styles.boxinside}>
              <View style={styles.imgplace}>
                <Image
                  source={require('../../assets/images/HeadPhone.png')}
                  style={styles.profile}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={[
                  styles.text,
                  {fontSize: 20, fontFamily: 'Helvetica-Bold'},
                ]}>
                Verification
              </Text>
              <Text
                style={[
                  styles.text,
                  {marginTop: 10, color: 'grey', fontSize: 14},
                ]}>
                Enter the security code we sent to your Email Address
              </Text>
              <View style={{marginVertical: hp(5)}}>
                <Box
                  lab="New Password"
                  val={password}
                  onchg={txt => setpassword(txt)}
                />
                <Box
                  lab="Confirm New Password"
                  val={conpass}
                  onchg={txt => setconpass(txt)}
                />
              </View>

              <Loader sts={loding} />
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'Helvetica-Bold',
                }}>
                {err}
              </Text>

              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => reset()}>
                <Text style={styles.login}>Update</Text>
              </TouchableOpacity> */}
              <GradientButton title={'Update'} onPress={reset} />
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
export default Password;
