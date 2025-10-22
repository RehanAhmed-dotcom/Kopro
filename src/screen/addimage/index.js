import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Platform,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {Addimgs, profileDetail} from '../apis/index';
import SplashScreen from 'react-native-splash-screen';
import {updateRedux} from '../apis/index';

import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Loader from '../../constants/loader';
import Header from '../../Components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GradientButton from '../../Components/GradientButton';

const Addimage = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const dispatch = useDispatch();

  const {userData} = useSelector(({USER}) => USER);
  console.log(userData?.api_token);
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const [img, setimg] = useState([]);
  console.log(img);
  const selectimg = () => {
    if (img.length < 6) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        setimg([...img, {path: image.path}]);
        console.log(image.path);
      });
    } else {
      Platform.OS == 'android'
        ? ToastAndroid.show('You have selected 6 images', ToastAndroid.SHORT)
        : null;
    }
  };

  const continu = () => {
    const data = new FormData();

    img.forEach(element => {
      element.path &&
        data.append('image[]', {
          uri: element.path,
          type: 'image/jpeg',
          name: 'image' + new Date() + '.jpg',
        });
      console.log('data,,,,,', data);
    });

    if (img.length > 0) {
      setloding(true);

      Addimgs({Auth: userData?.api_token, data})
        .then(res => {
          console.log('Change Password   respone..........', res);
          if (res.status == 'success') {
            updateRedux({Auth: userData?.api_token}).then(res => {
              if (res.status == 'success') {
                userAuthorize(res.userdata)(dispatch);
                {
                  Platform.OS == 'android'
                    ? ToastAndroid.show(
                        'Images Successfully uploaded',
                        ToastAndroid.SHORT,
                      )
                    : null;
                }
                console.log(res);
              }
            });
          }
        })
        .catch(error => {
          console.log('Error Meaasge', error);
        });
    }
  };

  const renderimg = ({item}) => (
    <Image
      source={{uri: item.path}}
      style={styles.logos}
      resizeMode="contain"
    />
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      images_get();
    });
    return unsubscribe;
  }, [navigation]);

  const images_get = () => {
    profileDetail({Auth: userData?.api_token})
      .then(res => {
        console.log('Profile Details   respone..........', res);
        if (res.status == 'success') {
          // setarydata(res.userdata);
          console.log('===', res);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };
  const {top} = useSafeAreaInsets();
  return (
    <ImageBackground style={styles.headerImage} source={images.edit}>
      {Platform.OS != 'ios' ? (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      ) : null}
      <View style={[styles.root, {top}]}>
        {/* <View style={styles.top}>
          <Text></Text>
          <Text style={styles.title}>Add Images</Text>
          <Text></Text>
        </View> */}
        <Header title={'Add Images'} />
        <View
          style={[
            styles.box,
            {
              marginTop: Platform.OS == 'ios' ? 0 : hp(10),
              // backgroundColor: 'red',
            },
          ]}>
          <View style={styles.boxinside}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // flexWrap:"wrap",
                alignItems: 'center',
                width: wp(90),
                // height: hp(20),
                // flex:1
              }}>
              <FlatList
                // horizontal
                data={img}
                numColumns={3}
                showsHorizontalScrollIndicator={false}
                renderItem={renderimg}
                ListFooterComponent={
                  img.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => selectimg()}
                      style={{
                        alignSelf:'flex-end',
                        alignItems: 'center',
                        alignContent: 'center',

                        justifyContent: 'center',
                        borderWidth: 2,

                        borderRadius: 10,
                        borderColor: Colors.main_back_color,
                        borderStyle: 'dashed',
                        width: wp(27),
                        marginLeft: 10,
                        height: hp(15),
                        // marginTop: hp(4),
                      }}>
                      <Image
                        source={images.upload}
                        style={[styles.logos, {height: hp(10), width: wp(15)}]}
                        resizeMode="contain"
                      />
                      <Text
                        style={{
                          // fontSize: 20,
                          color: 'white',
                          fontFamily: 'Helvetica-Bold',
                        }}>
                        Upload image
                      </Text>
                    </TouchableOpacity>
                  ) : null
                }
              />
              {/* <TouchableOpacity
                onPress={() => selectimg()}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  alignContent: 'center',

                  justifyContent: 'center',
                  borderWidth: 2,

                  borderRadius: 10,
                  borderColor: 'grey',
                  borderStyle: 'dashed',
                  width: wp(40),

                  height: hp(25),
                  marginTop: hp(4),
                }}>
                <Image
                  source={images.upload}
                  style={styles.logos}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                   
                  }}>
                  Upload image
                </Text>
              </TouchableOpacity> */}
            </View>
            {img.length == 0 ? (
              <TouchableOpacity
                onPress={() => selectimg()}
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  alignContent: 'center',

                  justifyContent: 'center',
                  borderWidth: 2,

                  borderRadius: 10,
                  borderColor: 'grey',
                  borderStyle: 'dashed',
                  width: wp(40),

                  height: hp(25),
                  marginTop: hp(4),
                }}>
                <Image
                  source={images.upload}
                  style={styles.logos}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'white',
                    fontFamily: 'Helvetica-Bold',
                  }}>
                  Upload image
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{height: hp(25)}} />
            )}
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

          <View style={{alignItems: 'center', marginTop: hp(3)}}>
            {/* <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button, {marginTop: hp(1), marginBottom: hp(1)}]}
              onPress={() => continu()}>
              <Text style={styles.login}>Continue</Text>
            </TouchableOpacity> */}
            <GradientButton
              title="Continue"
              onPress={continu}
              style={{marginHorizontal: 10, width: '100%', marginBottom: hp(5)}}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Addimage;
