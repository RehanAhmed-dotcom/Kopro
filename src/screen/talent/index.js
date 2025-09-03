import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Tags from 'react-native-tags';

import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import {EditInterest, updateRedux, talentData} from '../apis/index';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Loader from '../../constants/loader';

import SplashScreen from 'react-native-splash-screen';
import Header from '../../Components/Header';
import GradientButton from '../../Components/GradientButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Talent = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const dispatch = useDispatch();
  const [talentdata, settalentdata] = useState([]);
  const [loding, setloding] = useState(false);
  const [totaltags, settotaltags] = useState([]);

  const {userData} = useSelector(({USER}) => USER);
  console.log(userData.api_token);
  const [radio, setRadio] = useState([]);
  const {top} = useSafeAreaInsets();
  const data = [
    {
      id: 1,
      title: 'Producer',
      img: images.producer,
    },
    {
      id: 2,
      title: 'Songwriter',
      img: images.song,
    },
    {
      id: 3,
      title: 'Artist',
      img: images.artist,
    },
    {
      id: 4,
      title: 'Musician',
      img: images.music,
    },
    {
      id: 5,
      title: 'Manager',
      img: images.manager,
    },

    {
      id: 6,
      title: 'A&R',
      img: images.ar,
    },
    {
      id: 7,
      title: 'Publisher',
      img: images.publisher,
    },
    {
      id: 8,
      title: 'Music Supervisor',
      img: images.musics,
    },
    {
      id: 9,
      title: 'Lawyer',
      img: images.laywer,
    },
    {
      id: 10,
      title: 'Film Composer',
      img: images.filmcomp,
    },
    {
      id: 11,
      title: 'Mix Engineer',
      img: images.mixeng,
    },
    {
      id: 12,
      title: 'Studio Owner',
      img: images.stuown,
    },
    {
      id: 13,
      title: 'Agent',
      img: images.agent,
    },
    {
      id: 14,
      title: 'Music Video Director',
      img: images.manager,
    },
    {
      id: 15,
      title: 'Custom',
      img: images.custom,
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      talent_data();
    });
    return unsubscribe;
  }, [navigation]);
  const talent_data = () => {
    talentData()
      .then(res => {
        console.log('talent  respone..........', res);
        if (res.status == 'success') {
          // let y = [];
          // res.talent.forEach(element => {
          //   y.push({label: element.name, value: element.name});
          // });

          settalentdata(res.talent);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };

  const interestapi = () => {
    setloding(true);
    const data = new FormData();
    let arr = [];
    radio.forEach(element => {
      if (element != 'Custom') {
        arr.push(element);
      }
    });
    totaltags.forEach(element => {
      if (radio.length > 0 && radio.includes('Custom')) {
        arr.push(element);
      }
    });
    arr.forEach(element => {
      data.append('interest[]', element);
    });

    EditInterest({Auth: userData?.api_token, data})
      .then(res => {
        console.log('Interest Added   respone..........', res);
        setloding(false);

        if (res.status == 'success') {
          updateRedux({Auth: userData?.api_token}).then(res => {
            if (res.status == 'success') {
              setloding();
              userAuthorize(res.userdata)(dispatch);
              // navigation.navigate('talent');
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Interest Successfully Addes',
                    ToastAndroid.SHORT,
                  )
                : null;
              console.log(res);
            }
          });
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };

  const talents = ({item}) => (
    <View style={{flex: 1}}>
      <View style={styles.box}>
        <FlatList
          numColumns={2}
          ItemSeparatorComponent={() => (
            <View style={{height: widthPercentageToDP(2)}} />
          )}
          data={talentdata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {radio.length > 0 ? (
        radio.includes('Custom') ? (
          <View style={{alignItems: 'center'}}>
            <Tags
              textInputProps={{
                placeholder: 'Enter tag and press space to select',
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
              }}
              inputStyle={{backgroundColor: 'white'}}
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
                    {tag}{' '}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : null
      ) : null}
      <GradientButton
        title="Continue"
        onPress={() => interestapi()}
        style={{marginHorizontal: 10, marginBottom: hp(5)}}
      />
    </View>
  );
  console.log('-----', radio);
  const selectTalent = it => {
    if (radio.length > 0) {
      // let y = radio.includes(it);
      let y = radio.findIndex(m => m == it);
      console.log(y);
      if (y != -1) {
        let arr6 = [...radio];
        arr6.splice(y, 1);
        setRadio(arr6);
      } else {
        setRadio([...radio, it]);
      }
    } else {
      setRadio([...radio, it]);
    }
  };
  const checkradio = it => {
    if (radio.length != 0) {
      let y = radio.findIndex(item => item == it);
      if (y != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.boxinside}
      activeOpacity={0.8}
      onPress={() => selectTalent(item.name)}>
      {checkradio(item.name) ? (
        <Image
          source={images.radio}
          style={styles.radiobtn}
          resizeMode="contain"
        />
      ) : null}
      <View style={styles.container}>
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 360,
            backgroundColor: 'rgba(255, 0, 240, 0.1)',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.image}}
            style={styles.img}
            resizeMode="contain"
          />
        </View>
      </View>

      <Text
        style={{
          fontSize: 16,
          fontFamily: 'MontserratAlternates-SemiBold',
          color: Colors.white,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

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
        <View style={styles.root}>
          <Header title={'Select Skills '} />
          <View style={{flex: 1}}>
            <FlatList data={[1]} renderItem={talents} />
          </View>
          <Loader sts={loding} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Talent;
