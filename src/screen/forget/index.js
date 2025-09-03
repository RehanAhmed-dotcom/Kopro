import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Platform,
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
    <ImageBackground style={styles.headerImage} source={images.back2}>
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
          <Text style={styles.title}>Forgot Password?</Text>
          <Text></Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxinside}>
            <Text style={styles.text}>
              Enter your email for the verification process. {'\n'}We will send
              you 4 digits code to your email
            </Text>
            <View style={{marginVertical: hp(10)}}>
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

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => fget()}>
              <Text style={styles.login}>Send</Text>
            </TouchableOpacity>
            {/* navigation.navigate('verify'); */}
            <Loader sts={loding} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Forget;
