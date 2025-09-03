import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  Platform,
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
          <Text style={styles.title}>Forgot Password</Text>
          <Text></Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxinside}>
            <Text style={styles.text}>
              Enter 4 digits code that you recieved on your email
            </Text>
            <SafeAreaView style={{marginVertical: hp(10)}}>
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

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              onPress={() => fget()}>
              <Text style={styles.login}>Verify</Text>
            </TouchableOpacity>
            <Loader sts={loding} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Verify;
