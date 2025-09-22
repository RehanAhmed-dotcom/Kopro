import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Loader from '../../constants/loader';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {verify} from '../apis/index';
import GradientButton from '../../Components/GradientButton';

const CELL_COUNT = 4;
const Verify = ({navigation, route}: {navigation: any}) => {
  let mail = route.params.em;
  console.log(mail);
  const [value, setValue] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const fget = () => {
    setloding(true);

    const data = new FormData();
    data.append('pin', value);
    data.append('email', mail);

    verify(data)
      .then(res => {
        console.log('Forgot   respone..........', res);
        if (res.status == 'success') {
          navigation.navigate('password', {em: mail, cod: value});
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error.response.data);

        if (
          error.response.data.error == 'This password reset token is invalid.'
        ) {
          console.log('Error Meaasge', error.response.data);
          seterr('This password reset token is invalid.');
          setloding(false);
        }
      });
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
              Verification
            </Text>
            <Text
              style={[
                styles.text,
                {marginTop: 10, color: 'grey', fontSize: 14},
              ]}>
              Enter the security code we sent to your Email Address
            </Text>
            <SafeAreaView style={{marginVertical: hp(5)}}>
              <CodeField
                ref={ref}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </SafeAreaView>
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
              <Text style={styles.login}>Verify</Text>
            </TouchableOpacity> */}
            <GradientButton title={'Verify'} onPress={fget} />
            <Loader sts={loding} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Verify;
