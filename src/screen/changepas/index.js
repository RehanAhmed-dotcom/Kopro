import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {changepass} from '../apis/index';

import {useSelector} from 'react-redux';

const Changepass = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  console.log(userData?.api_token);

  const [oldpass, setoldpass] = useState('');
  const [password, setpassword] = useState('');
  const [conpass, setconpass] = useState('');
  const [loding, setloding] = useState('');
  const [err, seterr] = useState('');

  const reset = () => {
    setloding(true);
    seterr('');
    if (!oldpass || !password || !conpass) {
      setloding(false);
      seterr('All Fields is Required');
    } else if (
      password.length < 8 ||
      conpass.length < 8 ||
      oldpass.length < 8
    ) {
      setloding(false);
      seterr('Password Contain 8 Charcter');
    } else {
      const data = new FormData();
      data.append('old_password', oldpass);
      data.append('password', password);
      data.append('password_confirmation', conpass);

      changepass({Auth: userData?.api_token, data})
        .then(res => {
          console.log('Change Password   respone..........', res);
          if (res.status == 'success') {
            navigation.navigate('bottomtab');
            Platform.OS == 'android'
              ? ToastAndroid.show(
                  'Password Successfully changed',
                  ToastAndroid.SHORT,
                )
              : null;
          }
        })
        .catch(error => {
          console.log('Error Meaasge', error);
        });
    }
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
            />
            <Text style={styles.title}>Change Password</Text>
            <Text></Text>
          </View>

          <View>
            <Image
              source={images.changepass}
              style={styles.logos}
              resizeMode="contain"
            />
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              <View style={{marginBottom: hp(10)}}>
                <Box
                  lab="Old Password"
                  val={oldpass}
                  onchg={txt => setoldpass(txt)}
                />
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
              <TouchableOpacity
                onPress={() => reset()}
                activeOpacity={0.8}
                style={styles.button}>
                <Text style={styles.login}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Changepass;
