import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import SplashScreen from 'react-native-splash-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GradientButton from '../../Components/GradientButton';
import {logins} from '../apis/index';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Loader from '../../constants/loader';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';

const Login = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const dispatch = useDispatch();

  const login = async () => {
    setloding(true);
    seterr('');
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email.replace(/\s/g, ''),
    );
    console.log('Valid and invalid', valid);
    if (!email || !password) {
      setloding(false);
      seterr('All Fields is Required');
    } else if (password.length < 8) {
      setloding(false);
      seterr('Password Contain 8 Charcter');
    } else {
      const data = new FormData();
      data.append('email', email);
      data.append('password', password);

      await logins(data)
        .then(res => {
          console.log('Login   respone..........', res);
          if (res.status == 'success') {
            setloding(false);
            userAuthorize(res.userdata)(dispatch);
          }
        })
        .catch(error => {
          if (error.response.data.message == 'Invalid Username or Password') {
            console.log('Error Meaasge', error.response.data.message);
            seterr('Incorrect Email or Password');
            setloding(false);
          }
        });
    }
  };

  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1, marginHorizontal: 15}}>
        <View
          style={[
            styles.root,
            {
              paddingTop:
                Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            },
          ]}>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  style={{height: 95, width: 95}}
                  source={images.testlogo}
                  resizeMode="cover"
                />
              </View>

              <Text style={styles.title}>Login</Text>

              <Text
                style={{
                  alignSelf: 'center',
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                {err}
              </Text>

              <View style={styles.inputbox}>
                <Box
                  lab="Email"
                  autoCapitalize="none"
                  val={email}
                  onchg={txt => setemail(txt)}
                />
                <Box
                  lab="Password"
                  val={password}
                  onchg={txt => setpassword(txt)}
                />
              </View>

              <GradientButton
                title="Login"
                onPress={login}
                style={{marginHorizontal: 10}}
              />

              <Text
                onPress={() => navigation.navigate('forget')}
                style={styles.forget}>
                Forget Password?
              </Text>

              <View style={{marginTop: hp(2.5), alignItems: 'center'}}>
                <Text style={styles.acc}>Don't have an account?</Text>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    {
                      backgroundColor: null,
                      marginTop: hp(1),
                      marginBottom: hp(1),
                      width: wp(91),
                      marginHorizontal: 5,
                      borderWidth: 1,
                      borderRadius: 360,

                      borderColor: 'white',
                    },
                  ]}
                  onPress={() => navigation.navigate('signup')}>
                  <Text style={[styles.login, {color: 'white'}]}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <Loader sts={loding} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Login;
