import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import Colors, {images} from '../../constants';
import Tags from 'react-native-tags';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {EditGenre, updateRedux, genreData} from '../apis/index';
import {useSelector} from 'react-redux';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Loader from '../../constants/loader';
import SplashScreen from 'react-native-splash-screen';
import Header from '../../Components/Header';
import GradientButton from '../../Components/GradientButton';

const Genre = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const dispatch = useDispatch();
  const [genredata, setgenredata] = useState([]);
  // console.log('gr', genredata);

  const [radio, setRadio] = useState([]);
  const [totaltags, settotaltags] = useState([]);
  const [loding, setloding] = useState(false);
  const {userData} = useSelector(({USER}) => USER);

  const data = [
    'Hip Hop',
    'Trap',
    'Pop',
    'R&B',
    'EDM',
    'Reggaeton',
    'Gospel',
    'Rock',
    'Latin',
    'Film Music',
    'K-Pop',
    'Country',
    'Classical',
    'Metal',
    'Custom',
  ];
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      genre_data();
    });
    return unsubscribe;
  }, [navigation]);

  const genre_data = () => {
    genreData()
      .then(res => {
        console.log('Genre  resp  one..........', res);
        if (res.status == 'success') {
          setgenredata(res.genre);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasge', error);
      });
  };

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
  console.log('arr', radio);
  const editgenre = () => {
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
      data.append('genre[]', element);
    });

    EditGenre({Auth: userData?.api_token, data})
      .then(res => {
        console.log('Genre Added   respone..........', res);
        setloding(false);

        if (res.status == 'success') {
          updateRedux({Auth: userData?.api_token}).then(res => {
            if (res.status == 'success') {
              setloding(false);
              userAuthorize(res.userdata)(dispatch);
              // navigation.navigate('talent');
              Platform.OS != 'ios'
                ? ToastAndroid.show(
                    'Genre Successfully Added',
                    ToastAndroid.SHORT,
                  )
                : null;
              // console.log(res);
            }
          });
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.main}
      onPress={() => selectTalent(item?.name)}
      activeOpacity={0.8}>
      <Text style={styles.radiotitle}>{item?.name}</Text>
      {checkradio(item?.name) ? (
        <Image
          source={images.radio}
          style={styles.radiobtn}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );
  const GoBack = () => {
    console.log('---00000', userData);

    let arr = {...userData};
    arr.instrument = null;
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
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <View style={styles.top}>
              <Icon
                name="arrowleft"
                size={25}
                onPress={() => {
                  GoBack();
                }}
                color={Colors.white}
              />
            </View>
            <Header title={'Select Genre'} />
            <View style={styles.box}>
              <View style={styles.boxinside}>
                {!loding ? (
                  <FlatList
                    data={genredata}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                  />
                ) : null}
                {radio.length > 0 ? (
                  radio.includes('Custom') ? (
                    <View style={{alignItems: 'center', marginBottom: wp(4)}}>
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
                            <Text
                              style={{flexDirection: 'row', color: 'white'}}>
                              {tag}{' '}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  ) : null
                ) : null}
              </View>
            </View>
            <GradientButton
              title="Continue"
              onPress={() => editgenre()}
              style={{marginHorizontal: 10}}
            />
          </View>
        </ScrollView>
        <Loader sts={loding} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Genre;
