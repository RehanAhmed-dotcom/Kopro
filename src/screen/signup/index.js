import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import GradientButton from '../../Components/GradientButton';
import styles from './style';
import Colors, {images} from '../../constants';
import Box from '../../constants/inputbox';
import Loader from '../../constants/loader';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import {registerions, locationData} from '../apis/index';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const Signup = ({navigation}: {navigation: any}) => {
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [age, setage] = useState('');
  const [password, setpassword] = useState('');
  const [conpass, setconpass] = useState('');
  const [location, setlocation] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const dispatch = useDispatch();
  const [gen, setgen] = useState(false);
  const [val, setVal] = useState(null);
  const [genitem, setgenItem] = useState([]);

  const [open, setopen] = useState(false);
  const [value, setValue] = useState(null);
  const [openitem, setopenItem] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Prefer not to say', value: 'Prefer not to say'},
  ]);

  const [img, setimg] = useState('');

  let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const selectimg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimg(image.path);
    });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      location_data();
    });
    return unsubscribe;
  }, [navigation]);

  const location_data = () => {
    locationData()
      .then(res => {
        console.log('location   respone..........', res);
        if (res.status == 'success') {
          let y = [];
          res.location.forEach(element => {
            y.push({label: element.location, value: element.location});
          });
          setgenItem(y);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };

  const signup = () => {
    setloding(true);
    seterr('');
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      email.replace(/\s/g, ''),
    );
    console.log('Valid and invalid', valid);
    if (
      !firstname ||
      !lastname ||
      !email ||
      !age ||
      !password ||
      !val ||
      !value
    ) {
      setloding(false);
      seterr('All Fields is Required');
    } else if (!valid) {
      setloding(false);
      seterr('Enter Valid Email Adress');
    } else if (format.test(password) != true) {
      setloding(false);
      seterr(
        'Password must be at least 8 characters and contain upper and lowercase letters, numbers and symbols',
      );
    } else if (password.length < 8 || conpass.length < 8) {
      setloding(false);
      seterr(
        'Password must be at least 8 characters and contain upper and lowercase letters, numbers and symbols',
      );
    } else if (password != conpass) {
      setloding(false);
      seterr('Password and Confirm Password are not same');
    } else {
      const data = new FormData();
      data.append('firstname', firstname);
      data.append('lastname', lastname);
      data.append('email', email);
      data.append('age', age);
      data.append('password', password);
      data.append('password_confirmation', conpass);
      data.append('location', val);
      data.append('gender', value);

      if (img) {
        img &&
          data.append('image', {
            uri: img,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
        console.log('data,,,,,', data);
      }

      registerions(data)
        .then(res => {
          setloding(false);

          console.log('Signup   respone..........', res);
          if (res.status == 'success') {
            userAuthorize(res.userdata)(dispatch);
            Platform.OS != 'ios'
              ? ToastAndroid.show('Signup Successfully', ToastAndroid.SHORT)
              : null;
          }
        })
        .catch(error => {
          setloding(false);
          Alert.alert('Error', error.response.data.message.email[0]);
          console.log('323', error);
          // console.log('Error Meaasge', error.response.data.message);
        });
    }
  };

  const genderList = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const {height, width} = Dimensions.get('window');
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      {Platform.OS == 'ios' ? (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      ) : null}
      <KeyboardAvoidingView style={styles.root} behavior="height">
        <ScrollView
          // keyboardShouldPersistTaps={'handled'}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image
                style={{height: 80, width: 80}}
                source={images.testlogo}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.title}>Set Up Your Account</Text>
            <TouchableOpacity onPress={() => selectimg()}>
              <Image
                source={img == '' ? images.logo : {uri: img}}
                style={styles.logos}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.inputbox}>
              <Box
                lab="First Name"
                val={firstname}
                onchg={txt => setfirstname(txt)}
              />

              <Box
                lab="Last Name"
                val={lastname}
                onchg={txt => setlastname(txt)}
              />
              <Box
                lab="Email"
                autoCapitalize={'none'}
                val={email}
                onchg={txt => setemail(txt)}
              />
              <Box lab="Age" val={age} onchg={txt => setage(txt)} />
              <Box
                lab="Password"
                val={password}
                onchg={txt => setpassword(txt)}
              />
              <Box
                lab="Confirm Password"
                val={conpass}
                onchg={txt => setconpass(txt)}
              />
              {/* <Box
                lab="Location"
                val={location}
                onchg={txt => setlocation(txt)}
              /> */}
            </View>
            <View
              style={{
                alignSelf: 'center',
                zIndex: 2,
                marginTop: wp(2),
                height: open ? wp(35) : wp(15),
              }}>
              <DropDownPicker
                dropDownDirection="BOTTOM"
                open={open}
                value={value}
                listMode="SCROLLVIEW"
                items={openitem}
                setOpen={setopen}
                setValue={setValue}
                setItems={setopenItem}
                placeholder="Select Gender"
                listItemContainerStyle={{height: wp(7), color: 'white'}}
                listItemLabelStyle={{height: 25, color: 'white'}}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Helvetica',
                  color: 'white',
                }}
                tickIconStyle={{
                  tintColor: 'white',
                }}
                placeholderStyle={{
                  color: 'grey',
                }}
                labelStyle={{
                  fontSize: 14,
                  fontFamily: 'Helvetica',
                }}
                disabledStyle={{
                  opacity: 1,
                }}
                dropDownContainerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  borderColor: 'grey',
                  color: 'white',
                  // flex: 1,
                  height: wp(20),
                  backgroundColor: 'black',
                  zIndex: -5,
                  borderRadius: 0,
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#353535',
                  backgroundColor: 'transparent',
                }}
                arrowIconStyle={{
                  tintColor: 'white',
                }}
                containerStyle={{
                  width: '95%',
                }}
              />
            </View>
            <View
              style={{
                alignSelf: 'center',
                zIndex: 2,
                marginTop: wp(2),
                height: gen ? wp(30) : wp(10),
              }}>
              <DropDownPicker
                dropDownDirection="BOTTOM"
                open={gen}
                value={val}
                listMode="SCROLLVIEW"
                items={genitem}
                setOpen={setgen}
                setValue={setVal}
                setItems={setgenItem}
                placeholder="Location"
                listItemContainerStyle={{height: wp(6), color: 'white'}}
                listItemLabelStyle={{height: 20, color: 'white'}}
                textStyle={{
                  fontSize: 14,
                  fontFamily: 'Helvetica',
                  color: 'white',
                }}
                tickIconStyle={{
                  tintColor: 'white',
                }}
                placeholderStyle={{
                  color: 'grey',
                }}
                labelStyle={{
                  fontSize: 14,
                  fontFamily: 'Helvetica',
                }}
                disabledStyle={{
                  opacity: 1,
                }}
                dropDownContainerStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  borderColor: 'grey',
                  color: 'white',
                  // flex: 1,
                  height: wp(35),
                  backgroundColor: 'black',
                  zIndex: -5,
                  borderRadius: 0,
                }}
                style={{
                  borderWidth: 1,
                  borderColor: '#353535',
                  // height: wp(13),
                  backgroundColor: 'transparent',
                }}
                arrowIconStyle={{
                  tintColor: 'white',
                }}
                containerStyle={{
                  width: '95%',
                }}
              />
            </View>

            <Loader sts={loding} />
            <Text
              style={{
                alignSelf: 'center',
                color: 'red',
                fontSize: 13,
                fontFamily: 'Helvetica-Bold',
                marginTop: wp(10),
              }}>
              {err}
            </Text>
            <GradientButton
              title="Sign Up"
              onPress={() => signup()}
              style={{marginHorizontal: 10}}
            />

            <View
              style={{
                // marginTop: hp(5),
                marginBottom: hp(5),
                alignItems: 'center',
              }}>
              <Text style={styles.acc}>Already have an account?</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('login');
                }}
                style={[
                  styles.button,
                  {
                    marginTop: hp(1),
                    backgroundColor: null,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor: 'white',
                  },
                ]}>
                <Text style={[styles.login, {color: 'white'}]}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Signup;
