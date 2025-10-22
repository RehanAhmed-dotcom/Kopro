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
import {verifysignup} from '../apis/index';
import {useSelector} from 'react-redux';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Header from '../../Components/Header';
import GradientButton from '../../Components/GradientButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const CELL_COUNT = 4;
const Loopverify = ({navigation, route}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  let mail = userData?.email;
  console.log('sdsd', userData);
  console.log('mail', mail);
  const [value, setValue] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();
  const fget = () => {
    setloding(true);

    const data = new FormData();
    data.append('pin', value);
    data.append('email', mail);

    verifysignup(data)
      .then(res => {
        console.log('Forgot   respone..........', res);
        setloding(false);
        console.log('reswe', res);
        if (res.status == 'success') {
          console.log('now u can go');
          userAuthorize(res.userdata)(dispatch);
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasges', error);
      });
  };
  const {top} = useSafeAreaInsets();
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      {Platform.OS != 'ios' ? (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      ) : null}
      <SafeAreaView style={{flex: 1, top}}>
        <Header title={'Email Verification'} />

        <View style={styles.root}>
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
                  fontFamily: 'Helvetica-Bold',
                }}>
                {err}
              </Text>
              <GradientButton
                title="Verify"
                onPress={() => fget()}
                style={{marginHorizontal: 10}}
              />
              <Loader sts={loding} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Loopverify;
