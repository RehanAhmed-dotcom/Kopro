import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {forgot} from '../apis/index';
import Loader from '../../constants/loader';
import GradientButton from '../../Components/GradientButton';

const Forget = ({navigation}: {navigation: any}) => {
  const [email, setemail] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const fget = () => {
    setloding(true);
    seterr('');
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email.replace(/\s/g, ''),
    );
    console.log('Valid and invalid', valid);
    if (!email) {
      setloding(false);
      seterr('All Fields is Required');
    } else {
      const data = new FormData();
      data.append('email', email);

      forgot(data)
        .then(res => {
          console.log('Forgot   respone..........', res);
          if (res.status == 'success') {
            setloding(false);
            navigation.navigate('verify', {em: email});
          }
        })
        .catch(error => {
          console.log('Error Meaasge', error);
          setloding(false);
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
          {/* <Text style={styles.title}>Forgot Password?</Text> */}
          <Text></Text>
        </View>

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
                {fontSize: 20, fontFamily: 'MontserratAlternates-Medium'},
              ]}>
              Forgot Password
            </Text>
            <Text
              style={[
                styles.text,
                {marginTop: 10, color: 'grey', fontSize: 14},
              ]}>
              To reset your password, you need your email or mobile number that
              can be authenticated
            </Text>
            <View style={{marginVertical: hp(5)}}>
              <Box lab="E-mail" val={email} onchg={txt => setemail(txt)} />
            </View>
            <Text
              style={{
                alignSelf: 'center',
                color: 'red',
                fontSize: 13,
                fontFamily: 'MontserratAlternates-SemiBold',
              }}>
              {err}
            </Text>

            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => fget()}>
              <Text style={styles.login}>Send</Text>
            </TouchableOpacity> */}
            <GradientButton title={'Send'} onPress={fget} />
            {/* navigation.navigate('verify'); */}
            <Loader sts={loding} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Forget;
