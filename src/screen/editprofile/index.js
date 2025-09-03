import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  FlatList,
  Alert,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import IconC from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-simple-toast';
import {
  EditProfile,
  profileDetail,
  locationData,
  genreData,
  instrumentData,
  talentData,
} from '../apis/index';
import {useSelector} from 'react-redux';
import {userAuthorize} from '../../redux/actions';
import {useDispatch} from 'react-redux';
import Tags from 'react-native-tags';
import Loader from '../../constants/loader';
import Header from '../../Components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import GradientButton from '../../Components/GradientButton';

const Editprofile = ({navigation}: {navigation: any}) => {
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const {userData} = useSelector(({USER}) => USER);

  const [arydata, setarydata] = useState('');
  // const [radio, setRadio] = useState(userData.genre);
  const [ins, setIns] = useState(
    userData.instrument ? userData.instrument : [],
  );
  const dispatch = useDispatch();
  const [tagModal, settagModal] = useState(false);
  const [first, setfirst] = useState(userData?.firstname);
  const [last, setlast] = useState(userData?.lastname);
  const [mail, setmail] = useState(userData?.email);
  const [age, setage] = useState(userData?.age);
  const [genre, setgenre] = useState(userData?.genre ? userData?.genre : []);
  const [facebook, setfacebook] = useState(
    userData?.facebook ? userData?.facebook.split('/').pop() : '',
  );
  const [youtube, setyoutube] = useState(
    userData?.youtube ? userData?.youtube.split('/').pop() : '',
  );
  const [tik, settik] = useState(
    userData?.tiktok ? userData?.tiktok.split('/').pop() : '',
  );
  const [cloud, setcloud] = useState(
    userData?.soundcloud ? userData?.soundcloud.split('/').pop() : '',
  );
  const [instagram, setinstagram] = useState(
    userData?.instagram ? userData?.instagram.split('/').pop() : '',
  );
  const [Talent, setTalent] = useState(
    userData?.interest ? userData?.interest : [],
  );
  const [twitter, settwitter] = useState(
    userData?.twitter ? userData?.twitter.split('/').pop() : '',
  );
  const [geniusap, setgeniusap] = useState(
    userData?.genius ? userData?.genius.split('/').pop() : '',
  );

  // console.log(':', genius);
  const [genredata, setgenredata] = useState([]);
  const [insdata, setinsdata] = useState([]);
  const [talentdata, settalentdata] = useState([]);
  const [credit, setcredit] = useState(userData?.music_credit);
  const [aboutme, setaboutme] = useState(userData?.about_me);
  const [totaltags, settotaltags] = useState([]);
  const [tagHandler, settagHander] = useState('');
  useEffect(() => {
    genre_data();
    instrument_data();
    editProfile_detail();
    talent_data();
  }, [navigation]);

  const genre_data = () => {
    genreData()
      .then(res => {
        if (res.status == 'success') {
          setgenredata(res.genre);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);
      });
  };
  const [linkerr, setlinkerr] = useState('');
  const validLink = txt => {
    if (txt == ' ' || format.test(txt)) {
      Toast.show('Special characters are not allowed', Toast.LONG);
      return false;
    } else {
      return true;
    }
  };

  const formatss = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      location_data();
    });
    return unsubscribe;
  }, [navigation]);

  const location_data = () => {
    locationData()
      .then(res => {
        if (res.status == 'success') {
          let y = [];
          res.location.forEach(element => {
            y.push({label: element.location, value: element.location});
          });
          setgenItem(y);
        }
      })
      .catch(error => {});
  };
  const instrument_data = () => {
    instrumentData()
      .then(res => {
        if (res.status == 'success') {
          setinsdata(res.instrument);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);
      });
  };
  const talent_data = () => {
    talentData()
      .then(res => {
        if (res.status == 'success') {
          settalentdata(res.talent);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);
      });
  };

  const [img, setimg] = useState(userData?.image);
  const selectimg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setimg(image.path);
    });
  };

  const editProfile_detail = () => {
    profileDetail({Auth: userData?.api_token})
      .then(res => {
        if (res.status == 'success') {
          setarydata(res.userdata);
          // console.log(res.userdata.lastname)
        }
      })
      .catch(error => {});
  };

  const editupdate = () => {
    setloding(true);
    seterr('');
    let valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      mail.replace(/\s/g, ''),
    );

    if (!first || !last || !mail || !age || !genre || !ins) {
      setloding(false);
      seterr('All Fields is Required');
    } else if (!valid) {
      setloding(false);
      seterr('Enter Valid Email Adress');
    } else {
      const data = new FormData();
      data.append('firstname', first);
      data.append('lastname', last);
      data.append('email', mail);
      data.append('age', age);
      data.append('location', val);
      data.append('gender', value);
      data.append('music_credit', credit);
      data.append('about_me', aboutme);
      ins.forEach(element => {
        // data.append('interest[]', element);
        data.append('instrument[]', element);
      });
      Talent.forEach(element => {
        console.log('Elemet isssss', element);
        // data.append('interest[]', element);
        data.append('interest[]', element);
      });
      console.log('------------------------------', genre);
      genre.forEach(element => {
        // data.append('interest[]', element);
        if (element != null) {
          data.append('genre[]', element);
        }
      });
      {
        if (facebook) {
          const fac = 'https://www.facebook.com/' + facebook;
          facebook && data.append('facebook', fac);
        }
      }
      {
        if (youtube) {
          const you = 'https://www.youtube.com/' + youtube;
          youtube && data.append('youtube', you);
        }
      }
      {
        if (cloud) {
          const clo = 'https://www.cloudflare.com/' + cloud;
          cloud && data.append('soundcloud', clo);
        }
      }
      {
        if (tik) {
          const tok = 'https://www.tiktok.com/' + tik;
          tik && data.append('tiktok', tok);
        }
      }
      {
        if (instagram) {
          const inta = 'https://www.instagram.com/' + instagram;
          instagram && data.append('instagram', inta);
        }
      }
      {
        if (twitter) {
          const twi = 'https://www.twitter.com/' + twitter;
          twitter && data.append('twitter', twi);
        }
      }
      {
        if (geniusap) {
          const geniusa = 'https://genius.com/' + geniusap;
          geniusap && data.append('genius', geniusa);
        }
      }

      if (img) {
        img &&
          data.append('image', {
            uri: img,
            type: 'image/jpeg',
            name: 'image' + new Date() + '.jpg',
          });
      }

      console.log('Datttttttaaaaa', data);

      EditProfile({Auth: userData.api_token, data})
        .then(res => {
          if (res.status == 'success') {
            userAuthorize(res.userdata)(dispatch);
            {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Profile Updated Successfully',
                    ToastAndroid.SHORT,
                  )
                : null;
              setloding(false);
            }
            navigation.navigate('bottomtab');
          }
        })
        .catch(error => {
          setloding(false);
        });
    }
  };

  console.log('T+I+S', img);
  const [modalVisible, setModalVisible] = useState(false);
  // const data = [
  //   'hiphop',
  //   'Trap',
  //   'Pop',
  //   'R&B',
  //   'EDM',
  //   'Reggaeton',
  //   'Gospel',
  //   'Rock',
  //   'Latin',
  //   'Film Music',
  //   'K-Pop',
  //   'Country',
  //   'Classical',
  //   'Metal',
  //   'Laptop Producer',
  //   'N/A',
  // ];
  const [modalIns, setModalIns] = useState(false);
  // const datas = [
  //   'Piano',
  //   'Synth',
  //   'Guitar',
  //   'Bass',
  //   'Vocalist',
  //   'Drums',
  //   'Percussion',
  //   'Violin',
  //   'Viola',
  //   'Trumpet',
  //   'Sax',
  //   'Flute',
  //   'Clarinet',
  //   'Harp',
  //   'Brass',
  //   'Strings',
  //   'Cello',
  // ];

  const [modalTalent, setModalTalent] = useState(false);
  // const dataTalent = [
  //   'Producer',
  //   'Songwriter',
  //   'Artist',
  //   'Musician',
  //   'Manager',
  //   'A&R',
  //   'Publisher',
  //   'Music Supervisor',
  //   'Lawyer',
  //   'Film Composer',
  //   'Mix Engineer',
  //   'Studio Owner',
  //   'Agent',
  //   'Music Video Director',
  // ];
  const selectTalent = it => {
    console.log('---------->------>>>>>>>', it);
    if (genre.length > 0) {
      let y = genre.findIndex(m => m == it);
      if (y != -1) {
        let arr6 = [...genre];
        arr6.splice(y, 1);
        setgenre(arr6);
      } else {
        if (it != 'Custom') {
          setgenre([...genre, it]);
        } else {
          settagHander('1');
          settagModal(true);
          setModalVisible(false);
        }
      }
    } else {
      setgenre([...genre, it]);
      if (it === 'Custom') {
        settagModal(true);
      }
    }
  };
  const checkradio = it => {
    if (genre.length != 0) {
      let y = genre.findIndex(item => item == it);
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
      style={styles.main}
      onPress={() => {
        selectTalent(item.name);
      }}
      activeOpacity={0.8}>
      <Text style={styles.radiotitle}>{item.name}</Text>
      {checkradio(item.name) ? (
        <Image
          source={images.radio}
          style={styles.radiobtn}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );

  // -------------------
  const selectTalents = it => {
    if (ins.length > 0) {
      // let y = radio.includes(it);
      let y = ins.findIndex(m => m == it);
      if (y != -1) {
        let arr7 = [...ins];
        arr7.splice(y, 1);
        setIns(arr7);
      } else {
        if (it != 'Custom') {
          setIns([...ins, it]);
        } else {
          settagHander('2');
          settagModal(true);
          setModalIns(false);
        }
      }
    } else {
      setIns([...ins, it]);
    }
  };
  const checkradios = it => {
    if (ins.length != 0) {
      let y = ins.findIndex(item => item == it);
      if (y != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const renderItems = ({item}) => (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        selectTalents(item.name);
      }}
      activeOpacity={0.8}>
      <Text style={styles.radiotitle}>{item.name}</Text>
      {checkradios(item.name) ? (
        <Image
          source={images.radio}
          style={styles.radiobtn}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );

  // ---------------------------
  const selectSkill = it => {
    if (Talent.length > 0) {
      // let y = radio.includes(it);
      let y = Talent.findIndex(m => m == it);
      if (y != -1) {
        let arr7 = [...Talent];
        arr7.splice(y, 1);
        setTalent(arr7);
      } else {
        if (it != 'Custom') {
          setTalent([...Talent, it]);
        } else {
          settagHander('3');
          settagModal(true);
          setModalTalent(false);
        }
      }
    } else {
      setTalent([...Talent, it]);
    }
  };
  const checkSkill = it => {
    if (Talent.length != 0) {
      let y = Talent.findIndex(item => item == it);
      if (y != -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  const renderSkill = ({item}) => (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        selectSkill(item.name);
      }}
      activeOpacity={0.8}>
      <Text style={styles.radiotitle}>{item.name}</Text>
      {checkSkill(item.name) ? (
        <Image
          source={images.radio}
          style={styles.radiobtn}
          resizeMode="contain"
        />
      ) : null}
    </TouchableOpacity>
  );

  const [gen, setgen] = useState(false);
  const [val, setVal] = useState(userData?.location);
  const [genitem, setgenItem] = useState([]);

  const [open, setopen] = useState(false);
  const [value, setValue] = useState(userData?.gender);
  const [openitem, setopenItem] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Prefer not to say', value: 'Prefer not to say'},
  ]);
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
        <Header title={'Edit Profile'} />
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
          <View style={styles.root}>
            {/* <View style={styles.top}>
              <Icon
                name="arrowleft"
                size={25}
                color={Colors.white}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.title}>Edit Profile</Text>
              <Text></Text>
            </View> */}
            <ScrollView
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  width: wp(70),
                  height: hp(20),
                  justifyContent: 'center',
                  marginVertical: wp(5),
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  style={styles.profile}
                  onPress={() => selectimg()}>
                  {/* <View
                    style={{
                      height: wp(8),
                      width: wp(8),
                      borderRadius: wp(4),
                      backgroundColor: 'black',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}> */}
                  <Image
                    source={images.imgupload}
                    style={{
                      width: wp(8),
                      height: wp(8),
                      tintColor: Colors.white,
                    }}
                    resizeMode="contain"
                  />
                  {/* </View> */}
                </TouchableOpacity>
                <Image
                  source={img == null ? images.logo : {uri: img}}
                  style={styles.logos}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.box}>
                <View style={styles.boxinside}>
                  <View style={styles.form}>
                    <Box
                      lab="First Name"
                      val={first}
                      onchg={txt => setfirst(txt)}
                    />
                    <Box
                      lab="Last Name"
                      val={last}
                      onchg={txt => setlast(txt)}
                    />
                    <Box lab="Email" val={mail} onchg={txt => setmail(txt)} />
                    <Box lab="Age" val={age} onchg={txt => setage(txt)} />
                    {/* <Box
                  lab="ABOUT ME"
                  val={aboutme}
                  onchg={txt => setaboutme(txt)}
                /> */}
                    <Box
                      lab="Bio"
                      val={aboutme}
                      onchg={txt => setaboutme(txt)}
                    />
                    <Box
                      lab="Credits"
                      val={credit}
                      onchg={txt => setcredit(txt)}
                    />
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
                          backgroundColor: '#655b74',
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
                    <View
                      style={{
                        alignSelf: 'center',
                        zIndex: 2,
                        marginTop: wp(2),
                        height: gen ? wp(50) : wp(15),
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
                          borderColor: 'grey',
                          color: 'white',
                          // flex: 1,
                          height: wp(35),
                          backgroundColor: '#655b74',
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
                      <Box
                        lab="GENRE"
                        val={genre.toString()}
                        onchg={txt => {
                          setgenre(txt);
                        }}
                        type="generr"
                      />
                      <Icon1
                        name="keyboard-arrow-down"
                        size={20}
                        color={Colors.white}
                        style={{
                          position: 'absolute',
                          top: wp(7),
                          alignSelf: 'flex-end',
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalIns(true)}>
                      <Box
                        lab="INSTRUMENT"
                        val={ins.toString()}
                        onchg={txt => {
                          setIns(txt);
                        }}
                        type="edt"
                      />
                      <Icon1
                        name="keyboard-arrow-down"
                        size={20}
                        color={Colors.white}
                        style={{
                          position: 'absolute',
                          top: wp(7),
                          alignSelf: 'flex-end',
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalTalent(true)}>
                      <Box
                        lab="Skill & Telent"
                        val={Talent.toString()}
                        onchg={txt => selectTalent(txt)}
                        type="edt"
                      />

                      <Icon1
                        name="keyboard-arrow-down"
                        size={20}
                        color={Colors.white}
                        style={{
                          position: 'absolute',
                          top: wp(7),
                          alignSelf: 'flex-end',
                        }}
                      />
                    </TouchableOpacity> */}

                    {/* <Text
                      style={{
                        color: 'white',
                        marginTop: wp(8),
                        fontSize: 14,
                        fontFamily: 'MontserratAlternates-SemiBold',
                        top: 2,
                      }}>
                      ADD LINKS
                    </Text>

                    <View>
                      <Image
                        source={images.fac}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={facebook}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setfacebook(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.you}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={youtube}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setyoutube(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.tiktok}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={tik}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            settik(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.cl}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={cloud}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setcloud(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>

                    <View>
                      <Image
                        source={images.int}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={instagram}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setinstagram(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>
                    <View>
                      <Image
                        source={images.twi}
                        style={styles.icon}
                        resizeMode="contain"
                      />
                      <Box
                        lab="social"
                        val={twitter}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            settwitter(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View>
                    <View>
                      <Image
                        source={images.geni}
                        style={styles.icon}
                        resizeMode="contain"
                      />

                      <Box
                        lab="social"
                        val={geniusap}
                        onchg={txt => {
                          if (!txt.includes(' ') && !formatss.test(txt)) {
                            setgeniusap(txt);
                          }
                        }}
                        labplace="yourName"
                      />
                    </View> */}
                  </View>
                </View>
              </View>
              <Text
                style={{
                  marginTop: hp(6),
                  alignSelf: 'center',
                  color: 'red',
                  fontSize: 13,
                  fontFamily: 'MontserratAlternates-SemiBold',
                }}>
                {err}
              </Text>

              <GradientButton
                title="Save"
                onPress={editupdate}
                style={{marginHorizontal: 10, marginBottom: hp(5)}}
              />
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={styles.button}
                onPress={() => editupdate()}>
                <Text style={styles.login}>Update</Text>
              </TouchableOpacity> */}
            </ScrollView>

            <Loader sts={loding} />
          </View>
        </KeyboardAvoidingView>
        {tagModal ? (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor: 'red'
            }}>
            <View
              style={{
                alignItems: 'center',
                // height:50,hjhjh
                justifyContent: 'center',
              }}>
              <View>
                <View style={{alignSelf: 'flex-end'}}>
                  <IconC
                    onPress={() => settagModal(false)}
                    name={'cross'}
                    color={'#fff'}
                    size={24}
                  />
                </View>
                <Tags
                  textInputProps={{
                    placeholder: 'Enter tag and press space to select',
                  }}
                  onChangeTags={tags => {
                    if (tagHandler === '1') {
                      selectTalent(tags[tags.length - 1]);
                    } else if (tagHandler === '2') {
                      selectTalents(tags[tags.length - 1]);
                    } else if (tagHandler === '3') {
                      selectSkill(tags[tags.length - 1]);
                    }
                  }}
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
            </View>
          </View>
        ) : (
          <Modal
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
                  showsVerticalScrollIndicator={false}
                  data={genredata}
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
        )}
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
                data={insdata}
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
                data={talentdata}
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
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Editprofile;
