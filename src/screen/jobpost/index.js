import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  FlatList,
  Platform,
  SafeAreaView,
} from 'react-native';
import Box from '../../constants/inputbox';
import Colors, {images} from '../../constants';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

import Icon from 'react-native-vector-icons/AntDesign';
import {Addjob} from '../apis/index';
import Loader from '../../constants/loader';
import {useSelector} from 'react-redux';
import {locationData} from '../apis/index';

import Tags from 'react-native-tags';
import {TouchableWithoutFeedbackComponent} from 'react-native';
import Header from '../../Components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GradientButton from '../../Components/GradientButton';
import {TextInput} from 'react-native-paper';

const Jobpost = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);

  const [bug, setbug] = useState('');
  const [title, settitle] = useState('');
  const [des, setdes] = useState('');
  const [totaltags, settotaltags] = useState('');
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const [gen, setgen] = useState(false);
  const [val, setVal] = useState(null);
  const [genitem, setgenItem] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      location_data();
    });
    return unsubscribe;
  }, [navigation]);
  const location_data = async () => {
    await locationData()
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
  const AddMyJob = () => {
    setloding(true);
    seterr('');

    console.log(title);
    console.log(des);
    console.log('hhgdk fkf ky fgkjgy', totaltags);

    if (!title || !des) {
      setloding(false);
      seterr('Title and Description is required');
    } else {
      const data = new FormData();
      data.append('title', title);
      data.append('description', des);
      data.append('location', val);
      data.append('budget', bug);

      totaltags.length != 0
        ? totaltags.forEach(element => {
            data.append('tags[]', element);
          })
        : null;

      Addjob({Auth: userData?.api_token, data})
        .then(res => {
          console.log('add my job..........', res);
          if (res.status == 'success') {
            Platform.OS == 'android'
              ? ToastAndroid.show('Job Added Successfully', ToastAndroid.SHORT)
              : null;
            navigation.replace('mypost');
          }
        })
        .catch(error => {
          console.log('Error Meaasge', error.response);
          setloding(false);
        });
    }
  };
  const {top} = useSafeAreaInsets();
  return (
    <ImageBackground style={styles.headerImage} source={images.edit}>
      <SafeAreaView style={{flex: 1, top}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            {/* <View style={styles.top}>
              <Icon
                name="arrowleft"
                size={20}
                color="white"
                style={{width: 100}}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.title}>Post Job </Text>
              <Text style={{width: 100}}></Text>
            </View> */}
            <Header title={'Post Job'} />
            <View style={styles.box}>
              <View style={styles.boxinside}>
                <Box
                  lab="Job Title"
                  wid={wp(80)}
                  val={title}
                  onchg={txt => settitle(txt)}
                />
                {/* <Box
                  lab="Job Description"
                  wid={wp(80)}
                  val={des}
                  onchg={txt => setdes(txt)}
                /> */}
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'MontserratAlternates-Semibold',
                      color: 'white',
                    }}>
                    Job Description
                  </Text>
                  <TextInput
                    mode="outlined"
                    dense
                    value={des}
                    onChangeText={text => setdes(text)}
                    multiline
                    numberOfLines={5}
                    placeholder={'Job Description'}
                    placeholderTextColor={'grey'}
                    theme={{
                      colors: {
                        placeholder: '#353535',
                        text: 'white',
                        primary: '#353535',
                        background: '#003489',
                      },
                      roundness: 8,
                      fonts: {
                        regular: {
                          fontFamily: 'MontserratAlternates-Regular',
                        },
                      },
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'red',
                      margin: 10,
                      marginTop: 5,
                      height: 200,
                      width: '100%',
                      paddingLeft: 0,
                      paddingTop: 0,
                      fontSize: 14,
                    }}
                  />
                </View>
                <Box
                  lab="Budget"
                  wid={wp(80)}
                  val={bug}
                  onchg={txt => setbug(txt)}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'MontserratAlternates-Semibold',
                    color: 'white',
                  }}>
                  Location
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    marginTop: wp(2),
                    height: gen ? wp(50) : wp(10),
                    marginLeft: 20,
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
                      fontFamily: 'MontserratAlternates-Regular',
                      color: 'white',
                    }}
                    tickIconStyle={{
                      tintColor: 'white',
                    }}
                    placeholderStyle={{
                      color: 'white',
                    }}
                    labelStyle={{
                      fontSize: 14,
                      fontFamily: 'MontserratAlternates-Regular',
                    }}
                    disabledStyle={{
                      opacity: 1,
                    }}
                    dropDownContainerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 1.5,

                      paddingVertical: Platform.OS == 'ios' ? 6 : 3,
                      borderColor: '#ccc',
                      color: 'white',
                      // flex: 1,
                      height: wp(35),
                      backgroundColor: '#655b74',
                      // zIndex: -5,
                      // marginTop: wp(1),
                      borderRadius: 0,
                    }}
                    style={{
                      // borderWidth: 0,
                      borderWidth: 1,
                      borderColor: 'grey',
                      // height: wp(13),
                      backgroundColor: 'transparent',
                    }}
                    arrowIconStyle={{
                      tintColor: 'white',
                    }}
                    containerStyle={{
                      width: wp(78),
                    }}
                  />
                </View>

                <View style={{marginTop: wp(7)}}>
                  <Text
                    style={{
                      fontSize: 16,

                      fontFamily: 'MontserratAlternates-Semibold',
                      color: 'white',
                    }}>
                    Tags
                  </Text>
                  <Tags
                    initialText=""
                    textInputProps={{
                      placeholder: 'Enter Tag and press space to add more Tags',
                      placeholderTextColor: 'white',
                    }}
                    onChangeTags={tags => settotaltags(tags)}
                    onTagPress={(index, tagLabel, event, deleted) =>
                      console.log(
                        index,
                        tagLabel,
                        event,
                        deleted ? 'deleted' : 'not deleted',
                      )
                    }
                    containerStyle={{
                      // flexDirection: 'column',
                      justifyContent: 'center',
                      width: wp(80),
                      // height: 50,
                      // borderRadius: 10,
                      marginTop: wp(1),
                    }}
                    inputStyle={{
                      backgroundColor: Colors.gray,
                      borderColor: 'grey',

                      borderWidth: 1,
                      color: 'white',
                    }}
                    renderTag={({
                      tag,
                      index,
                      onPress,
                      deleteTagOnPress,
                      readonly,
                    }) => (
                      <TouchableOpacity
                        key={`${tag}-${index}`}
                        onPress={onPress}
                        style={{
                          flexDirection: 'row',
                          backgroundColor: 'grey',
                          borderRadius: wp(5),
                          paddingHorizontal: wp(1),
                          paddingVertical: wp(0.5),
                          alignItems: 'center',
                          marginRight: wp(1),
                          marginBottom: wp(2),
                        }}>
                        <Text style={{flexDirection: 'row', color: 'white'}}>
                          #{tag}{' '}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
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
                  onPress={() => AddMyJob()}
                  style={[styles.button, {marginTop: hp(10)}]}>
                  <Text style={styles.login}>Post It</Text>
                </TouchableOpacity> */}
              </View>
              <GradientButton
                title="Post It"
                onPress={AddMyJob}
                style={{marginHorizontal: 10, marginTop: 30}}
              />
            </View>
          </View>
        </ScrollView>
        <Loader sts={loding} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Jobpost;
