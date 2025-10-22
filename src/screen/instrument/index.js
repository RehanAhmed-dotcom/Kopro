import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Platform,
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
import {EditInstrument, updateRedux, instrumentData} from '../apis/index';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Loader from '../../constants/loader';
import Header from '../../Components/Header';
import GradientButton from '../../Components/GradientButton';

const Ins = ({navigation}: {navigation: any}) => {
  const dispatch = useDispatch();

  const [loding, setloding] = useState(false);
  const [totaltags, settotaltags] = useState([]);
  const [insdata, setinsdata] = useState([]);

  const {userData} = useSelector(({USER}) => USER);
  console.log(userData?.api_token);
  const [radio, setRadio] = useState([]);
  const data = [
    {
      id: 1,
      title: 'Piano',
      img: images.piano,
    },
    {
      id: 2,
      title: 'Synth',
      img: images.synth,
    },
    {
      id: 3,
      title: 'Guitar',
      img: images.gitar,
    },
    {
      id: 4,
      title: 'Bass',
      img: images.bass,
    },
    {
      id: 5,
      title: 'Vocalist',
      img: images.vocalist,
    },

    {
      id: 6,
      title: 'Drums',
      img: images.drum,
    },
    {
      id: 7,
      title: 'Percussion',
      img: images.conga,
    },
    {
      id: 8,
      title: 'Violin',
      img: images.voilin,
    },
    {
      id: 9,
      title: 'Viola',
      img: images.viola,
    },
    {
      id: 10,
      title: 'Trumpet',
      img: images.trumpet,
    },
    {
      id: 11,
      title: 'Sax',
      img: images.sax,
    },
    {
      id: 12,
      title: 'Flute',
      img: images.flute,
    },
    {
      id: 13,
      title: 'Clarinet',
      img: images.clarinet,
    },
    {
      id: 14,
      title: 'Harp',
      img: images.harp,
    },
    {
      id: 15,
      title: 'Brass',
      img: images.bras,
    },
    {
      id: 16,
      title: 'Strings',
      img: images.strings,
    },
    {
      id: 17,
      title: 'Cello',
      img: images.cello,
    },
    {
      id: 18,
      title: 'Laptop',
      img: images.lap,
    },
    {
      id: 19,
      title: 'Custom',
      img: images.custom,
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      instrument_data();
    });
    return unsubscribe;
  }, [navigation]);
  const instrument_data = () => {
    instrumentData()
      .then(res => {
        // console.log('Instrument  respone..........', res);
        if (res.status == 'success') {
          setinsdata(res.instrument);
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
      data.append('instrument[]', element);
    });

    EditInstrument({Auth: userData?.api_token, data})
      .then(res => {
        console.log('Instrument Added   respone..........', res);
        setloding(false);

        if (res.status == 'success') {
          updateRedux({Auth: userData?.api_token}).then(res => {
            if (res.status == 'success') {
              setloding(false);
              userAuthorize(res.userdata)(dispatch);
              // navigation.navigate('talent');
              Platform.OS != 'ios'
                ? ToastAndroid.show(
                    'Instrument Successfully Added',
                    ToastAndroid.SHORT,
                  )
                : null;
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
            <View style={{height: widthPercentageToDP(3)}} />
          )}
          data={insdata}
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
        style={{marginHorizontal: 10}}
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
          marginTop: hp(1),
          fontFamily: 'Helvetica-Bold',
          color: Colors.white,
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
  const GoBack = () => {
    console.log('---00000', userData);
    let arr = {...userData};
    arr.interest = null;
    userAuthorize(arr)(dispatch);
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
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.root}>
          <View style={styles.top}>
            <Icon
              name="arrowleft"
              size={25}
              onPress={() => {
                console.log('has');
                GoBack();
              }}
              color={Colors.white}
            />
          </View>
          <Header title={'Select Instrument'} />

          <View style={{flex: 1}}>
            <FlatList data={[1]} renderItem={talents} />
          </View>
          <Loader sts={loding} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Ins;
