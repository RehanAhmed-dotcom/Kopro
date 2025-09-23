import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {
  searchApi,
  SearchByNameApi,
  locationData,
  genreData,
  instrumentData,
  talentData,
} from '../apis/index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import Box from '../../constants/inputbox';
import Loader from '../../constants/loader';
import GradientButton from '../../Components/GradientButton';

const Genre = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [genre, setgenre] = useState([]);
  const [ins, setIns] = useState([]);
  const [Talent, setTalent] = useState([]);
  const [firstname, setfirstname] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      location_data();
      setV([]);
      setVi([]);
      setVt([]);
      setVal([]);
      setValue([]);
    });
    return unsubscribe;
  }, [navigation]);
  const [g, setg] = useState(false);
  const [v, setV] = useState([]);
  const [gitem, setgItem] = useState([]);

  const [i, seti] = useState(false);
  const [vi, setVi] = useState([]);
  const [iitem, setiItem] = useState([]);

  const [t, sett] = useState(false);
  const [vt, setVt] = useState([]);
  const [titem, settItem] = useState([]);

  const [gen, setgen] = useState(false);
  const [val, setVal] = useState([]);
  const [genitem, setgenItem] = useState([]);

  const [open, setopen] = useState(false);
  const [value, setValue] = useState([]);
  const [openitem, setopenItem] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Prefer not to say', value: 'Prefer not to say'},
  ]);

  // console.log(userData.api_token)
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const [first, setfirst] = useState('');

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
          genre_data();
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasge', error);
      });
  };

  const instrument_data = () => {
    instrumentData()
      .then(res => {
        console.log('Instrument  respone..........', res);
        if (res.status == 'success') {
          let y = [];
          res.instrument.forEach(element => {
            if (element.name != 'Custom') {
              y.push({label: element.name, value: element.name});
            }
          });
          setiItem(y);
          talent_data();
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };
  const talent_data = () => {
    talentData()
      .then(res => {
        console.log('talent  respone..........', res);
        if (res.status == 'success') {
          let y = [];
          res.talent.forEach(element => {
            if (element.name != 'Custom') {
              y.push({label: element.name, value: element.name});
            }
          });
          settItem(y);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };
  const genre_data = () => {
    genreData()
      .then(res => {
        console.log('Genre  respone..........', res);
        if (res.status == 'success') {
          let y = [];
          res.genre.forEach(element => {
            if (element.name != 'Custom') {
              y.push({label: element.name, value: element.name});
            }
          });
          setgItem(y);
          instrument_data();
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };

  const searchResult = () => {
    setloding(true);
    const data = new FormData();
    data.append('search', firstname);
    vt.forEach(element => {
      data.append('interest[]', element);
    });

    v.forEach(element => {
      data.append('genre[]', element);
    });

    vi.forEach(element => {
      data.append('instrument[]', element);
    });

    val.forEach(element => {
      data.append('gender[]', element);
    });

    val.forEach(element => {
      data.append('location[]', element);
    });

    searchApi({Auth: userData?.api_token, data})
      .then(res => {
        console.log('Show all Jobs here   respone..........', res);
        if (res.status == 'success') {
          console.log('dd++++++++++++', res.data);
          setloding(false);

          navigation.navigate('matches', {resary: res.data});
        }
      })
      .catch(error => {
        setloding(false);

        console.log('Error Meaasge', error);
      });
  };
  const resetBtn = () => {
    setV([]);
    setVi([]);
    setVt([]);
    setVal([]);
    setValue([]);
  };

  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}
        <View style={styles.root}>
          <View style={styles.top}>
            {/* <Icon
            name="arrowleft"
            size={25}
            onPress={() => navigation.goBack()}
            color={Colors.white}
          /> */}
            <Text style={styles.home}>Search Profiles</Text>
            {/* <Text></Text> */}
          </View>

          {/* chat box---------------------  */}
          {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: wp(90),
            alignSelf: 'center',
            marginBottom: hp(5),
          }}>
          <TextInput
            style={styles.input}
            placeholderTextColor="grey"
            // keyboardType="al"
            value={first}
            onChangeText={txt => setfirst(txt)}
          />
          <TouchableOpacity
            style={{
              width: wp(12),
              height: wp(12),
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              right: 0,
            }}>
            <Icon1
              name="search"
              size={22}
              color={Colors.white}
              onPress={() => {
                searchresult();
              }}
            />
          </TouchableOpacity>
        </View> */}
          {/* chatbox end-------------------- */}

          <View style={styles.box}>
            <View style={styles.boxinside}>
              {/* <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              style={{height: hp(54)}}
              showsVerticalScrollIndicator={false}
            /> */}
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.main_back_color,
                  width: wp(13),
                  height: wp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp(2),
                  alignSelf: 'flex-end',
                }}
                onPress={() => resetBtn()}>
                <Text style={{fontSize: 12, color: 'white'}}>Reset</Text>
              </TouchableOpacity>
              <ScrollView style={{flex: 1, paddingBottom: hp(3)}}>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    bottom: hp(-5),
                  }}>
                  Username:
                </Text>
                <Box
                  // lab="userne"
                  place="User name"
                  wid={wp(78)}
                  val={firstname}
                  labplace="Enter User Name"
                  onchg={txt => setfirstname(txt)}
                />
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(2),
                  }}>
                  Genre:
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    height: g ? wp(45) : wp(12),
                  }}>
                  <DropDownPicker
                    mode="BADGE"
                    badgeColors={Colors.gray}
                    badgeStyle={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                    }}
                    multiple={true}
                    dropDownDirection="BOTTOM"
                    open={g}
                    value={v}
                    listMode="SCROLLVIEW"
                    items={gitem}
                    setOpen={setg}
                    setValue={setV}
                    setItems={setgItem}
                    placeholder="Select Genre"
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
                      borderColor: 'grey',
                      color: 'white',
                      // flex: 1,
                      height: wp(35),
                      backgroundColor: Colors.gray,
                      zIndex: -5,
                      // marginTop: wp(1),
                      borderRadius: 0,
                    }}
                    style={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: 'grey',
                      // height: wp(13),
                      backgroundColor: 'transparent',
                    }}
                    arrowIconStyle={{
                      tintColor: 'white',
                    }}
                    containerStyle={{
                      width: wp(82),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(3),
                  }}>
                  Instrument:
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    height: i ? wp(45) : wp(12),
                  }}>
                  <DropDownPicker
                    mode="BADGE"
                    badgeColors={Colors.gray}
                    badgeStyle={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                    }}
                    multiple={true}
                    dropDownDirection="BOTTOM"
                    open={i}
                    value={vi}
                    listMode="SCROLLVIEW"
                    items={iitem}
                    setOpen={seti}
                    setValue={setVi}
                    setItems={setiItem}
                    placeholder="Select Instruments"
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
                      borderColor: 'grey',
                      color: 'white',
                      // flex: 1,
                      height: wp(35),
                      backgroundColor: Colors.gray,
                      zIndex: -5,
                      // marginTop: wp(1),
                      borderRadius: 0,
                    }}
                    style={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: 'grey',
                      // height: wp(13),
                      backgroundColor: 'transparent',
                    }}
                    arrowIconStyle={{
                      tintColor: 'white',
                    }}
                    containerStyle={{
                      width: wp(82),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(3),
                  }}>
                  Skill/Talent:
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    height: t ? wp(45) : wp(12),
                  }}>
                  <DropDownPicker
                    mode="BADGE"
                    badgeColors={Colors.gray}
                    badgeStyle={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                    }}
                    multiple={true}
                    dropDownDirection="BOTTOM"
                    open={t}
                    value={vt}
                    listMode="SCROLLVIEW"
                    items={titem}
                    setOpen={sett}
                    setValue={setVt}
                    setItems={settItem}
                    placeholder="Select Talents"
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
                      borderColor: 'grey',
                      color: 'white',
                      // flex: 1,
                      height: wp(35),
                      backgroundColor: Colors.gray,
                      zIndex: -5,
                      // marginTop: wp(1),
                      borderRadius: 0,
                    }}
                    style={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: 'grey',
                      // height: wp(13),
                      backgroundColor: 'transparent',
                    }}
                    arrowIconStyle={{
                      tintColor: 'white',
                    }}
                    containerStyle={{
                      width: wp(82),
                    }}
                  />
                </View>
                {/* <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon2
                name="keyboard-arrow-down"
                size={20}
                color={Colors.white}
                style={{
                  position: 'absolute',
                  top: wp(7),
                  alignSelf: 'flex-end',
                }}
              />
              <Box
                lab="GENRE"
                val={genre.toString()}
                onchg={txt => setgenre(txt)}
                type="edt"
              />
            </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => setModalIns(true)}>
              <Icon2
                name="keyboard-arrow-down"
                size={20}
                color={Colors.white}
                style={{
                  position: 'absolute',
                  top: wp(7),
                  alignSelf: 'flex-end',
                }}
              />

              <Box
                lab="INSTRUMENT"
                val={ins.toString()}
                onchg={txt => setIns(txt)}
                type="edt"
              />
            </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={() => setModalTalent(true)}>
              <Icon2
                name="keyboard-arrow-down"
                size={20}
                color={Colors.white}
                style={{
                  position: 'absolute',
                  top: wp(7),
                  alignSelf: 'flex-end',
                }}
              />

              <Box
                lab="Skill & Telent"
                val={Talent.toString()}
                onchg={txt => selectTalent(txt)}
                type="edt"
              />
            </TouchableOpacity> */}
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(2),
                  }}>
                  Location:
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    height: gen ? wp(45) : wp(12),
                  }}>
                  <DropDownPicker
                    mode="BADGE"
                    badgeColors={Colors.gray}
                    badgeStyle={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                    }}
                    multiple={true}
                    dropDownDirection="BOTTOM"
                    open={gen}
                    value={val}
                    listMode="SCROLLVIEW"
                    items={genitem}
                    setOpen={setgen}
                    setValue={setVal}
                    setItems={setgenItem}
                    placeholder="Select Location"
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
                      borderColor: 'grey',
                      color: 'white',
                      // flex: 1,
                      height: wp(35),
                      backgroundColor: Colors.gray,
                      zIndex: -5,
                      // marginTop: wp(1),
                      borderRadius: 0,
                    }}
                    style={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: 'grey',
                      // height: wp(13),
                      backgroundColor: 'transparent',
                    }}
                    arrowIconStyle={{
                      tintColor: 'white',
                    }}
                    containerStyle={{
                      width: wp(82),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(4),
                  }}>
                  Gender:
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    marginBottom: hp(3),
                    // marginTop: wp(3),
                    height: open ? wp(35) : wp(10),
                  }}>
                  <DropDownPicker
                    mode="BADGE"
                    badgeColors={Colors.gray}
                    badgeStyle={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                    }}
                    multiple={true}
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
                      borderColor: 'grey',
                      color: 'white',
                      // flex: 1,
                      height: wp(20),
                      backgroundColor: Colors.gray,
                      zIndex: -5,
                      borderRadius: 0,
                    }}
                    style={{
                      borderWidth: 0,
                      borderBottomWidth: 1,
                      borderColor: 'grey',
                      backgroundColor: 'transparent',
                    }}
                    arrowIconStyle={{
                      tintColor: 'white',
                    }}
                    containerStyle={{
                      width: wp(82),
                    }}
                  />
                </View>
              </ScrollView>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => searchResult()}>
                <Text style={styles.login}>Search</Text>
              </TouchableOpacity> */}
              <GradientButton title={'Search'} onPress={searchResult} />
            </View>
          </View>
        </View>
        {/* <Modal
        animationType="fade"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.boxmodal}>
          <View style={styles.boxinsidemodal}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.main_back_color,
                width: wp(15),
                alignSelf: 'center',
                borderRadius: wp(2),
                paddingVertical: wp(1.5),
                marginTop: wp(4),
              }}>
              <Text style={{color: 'white'}}>ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        visible={modalIns}
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalIns(!modalIns);
        }}>
        <View style={styles.boxmodal}>
          <View style={styles.boxinsidemodal}>
            <FlatList
              data={datas}
              renderItem={renderItems}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              onPress={() => {
                setModalIns(!modalIns);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.main_back_color,
                width: wp(15),
                alignSelf: 'center',
                borderRadius: wp(2),
                paddingVertical: wp(1.5),
                marginTop: wp(4),
              }}>
              <Text style={{color: 'white'}}>ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        visible={modalTalent}
        transparent={true}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalTalent(!modalTalent);
        }}>
        <View style={styles.boxmodal}>
          <View style={styles.boxinsidemodal}>
            <FlatList
              data={dataTalent}
              renderItem={renderSkill}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              onPress={() => {
                setModalTalent(!modalTalent);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.main_back_color,
                width: wp(15),
                alignSelf: 'center',
                borderRadius: wp(2),
                paddingVertical: wp(1.5),
                marginTop: wp(4),
              }}>
              <Text style={{color: 'white'}}>ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
        <Loader sts={loding} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Genre;
