import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  TextInput,
  ToastAndroid,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors, {images} from '../../constants';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Plus from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/Entypo';
import File from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Loader from '../../constants/loader';
import DropDownPicker from 'react-native-dropdown-picker';
import Box from '../../constants/inputbox';
import {useSelector} from 'react-redux';
import {
  ShowAllJobsHere,
  ApplyForTheJob,
  showjobSearch,
  locationData,
  instrumentData,
  talentData,
} from '../apis/index';
import Icon from 'react-native-vector-icons/AntDesign';
import GradientButton from '../../Components/GradientButton';

const Job = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [modalVisible, setModalVisible] = useState(false);
  const [jobdetail, setjobdetail] = useState(false);
  const [currentDtail, setcurrentDtail] = useState({});
  const [arydata, setarydata] = useState('');
  console.log('//', currentDtail);
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const [first, setfirst] = useState('');
  const [modallocation, setModallocation] = useState(false);
  const [locationdata, setlocationdata] = useState([]);
  const [meg, setmeg] = useState('');
  const [userid, setuserid] = useState('');
  // const [flatextra, setflatextra] = useState('');
  const [i, seti] = useState(false);
  const [vi, setVi] = useState('');
  const [iitem, setiItem] = useState([]);

  const [sta, setsta] = useState(false);
  const [vsta, setVsta] = useState('');
  const [itemsta, setitemsta] = useState([
    {label: 'Apply', value: 'apply'},
    {label: 'Applied', value: 'applied'},
  ]);

  const [t, sett] = useState(false);
  const [vt, setVt] = useState('');
  const [titem, settItem] = useState([]);

  const [gen, setgen] = useState(false);
  const [val, setVal] = useState('');
  const [genitem, setgenItem] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setfirst('');

      location_data();
      setVi([]);
      setVt([]);
      setVal([]);
    });
    return unsubscribe;
  }, [navigation]);

  const location_data = () => {
    // setloding(true);
    locationData()
      .then(res => {
        setloding(false);
        // console.log('location   respone..........', res);
        if (res.status == 'success') {
          setloding(false);
          let y = [];
          res.location.forEach(element => {
            y.push({label: element.location, value: element.location});
          });
          setgenItem(y);
          instrument_data();
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ShowAllJobs();
      location_data();
    });
    return unsubscribe;
  }, []);

  const renderSkill = ({item}) => (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        FilterJob(item?.location), setModallocation(false);
      }}
      activeOpacity={0.5}>
      <Text style={styles.radiotitle}>{item?.location}</Text>
    </TouchableOpacity>
  );

  const ShowAllJobs = () => {
    ShowAllJobsHere({Auth: userData?.api_token})
      .then(res => {
        console.log('Show all Jobs here   respone..........', res);
        if (res.status == 'success') {
          setarydata(res.Jobs.reverse());
          setloding(false);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };
  const SearchJob = async () => {
    const data = new FormData();
    data.append('search', first);
    await showjobSearch({Auth: userData?.api_token, data})
      .then(res => {
        console.log('Show all Jobs here   respone..........', res);
        if (res.status == 'success') {
          setarydata(res.Jobs);
          // setflatextra(res.Jobs);
          setloding(false);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };
  const FilterJob = () => {
    const data = new FormData();
    data.append('status', vsta);
    data.append('location_filter', val);
    data.append('talent', vt);
    data.append('instrument', vi);
    showjobSearch({Auth: userData?.api_token, data})
      .then(res => {
        if (res.status == 'success') {
          setarydata(res.Jobs);
          setloding(false);
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };

  const resetModle = () => {
    setVal('');
    setVi('');
    setVt('');
  };

  const ApplyJob = () => {
    setModalVisible(false);
    setTimeout(() => {
      setloding(true);
      seterr('');

      if (!meg) {
        setloding(false);
        seterr('All Fields is Required');
      } else {
        const data = new FormData();
        data.append('job_id', userid);
        data.append('message', meg);

        ApplyForTheJob({Auth: userData?.api_token, data})
          .then(res => {
            setloding(false);
            if (res.status == 'success') {
              Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Job Applied Successfully',
                    ToastAndroid.SHORT,
                  )
                : null;
              ShowAllJobs();
              setmeg('');
            }
          })
          .catch(error => {
            console.log('Error Meaasge', error);
            setloding(false);
          });
      }
    }, 2000);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listview}
      onPress={() => {
        // console.log('item', item);
        setcurrentDtail(item), setjobdetail(true);
      }}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          // paddingBottom: 10,
          paddingBottom: wp(3),
        }}>
        <Image
          source={
            item?.user?.image
              ? {uri: item?.user?.image}
              : require('../../assets/images/testlogo.png')
          }
          style={{width: 50, height: 50, borderRadius: 10}}
        />
        <View>
          <Text style={styles.titleList}>{item?.title}</Text>
          <Text style={styles.listtag}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {item?.tags?.map(elem => (
                <Text style={styles.listtag}>
                  {elem}
                  {'  '}
                </Text>
              ))}
            </View>
          </Text>
        </View>

        {/* {item.status == 1 ? (
          <TouchableOpacity style={styles.btn} activeOpacity={1}>
            <Text style={styles.btntext}>Applied</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setModalVisible(true), setuserid(item?.id);
            }}>
            <Text style={styles.btntext}>Apply</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <View style={styles.listBl}>
        {/* <View
            style={{
              flexDirection: 'row',
            }}>
            {item?.tags?.map(elem => (
              <Text style={styles.listtag}>
                {elem}
                {'  '}
              </Text>
            ))}
          </View> */}
        {/* </Text> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon4 name="briefcase" size={20} color={'grey'} />
            <Text
              style={[
                styles.listdet,
                {fontSize: 14, marginLeft: 5, color: 'grey'},
              ]}>
              Work type
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'MontserratAlternates-Regular',
              color: 'white',
            }}>
            {' '}
            Full Time
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon4 name="location-pin" size={20} color={'grey'} />
            <Text
              style={[
                styles.listdet,
                {fontSize: 14, marginLeft: 5, color: 'grey'},
              ]}>
              Location
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'MontserratAlternates-Regular',
              color: 'white',
            }}>
            {' '}
            {item?.location}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 10,
                backgroundColor: 'grey',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Plus name="dollar-sign" size={15} color={'black'} />
            </View>
            <Text
              style={[
                styles.listdet,
                {fontSize: 14, marginLeft: 5, color: 'grey'},
              ]}>
              Salary
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'MontserratAlternates-Regular',
              color: 'white',
            }}>
            {' '}
            {item?.budget}
          </Text>
        </View>
        {/* <GradientButton
          title={`${item.status == 1 ? 'Applied' : 'Apply'}`}
          onPress={login}
          style={{marginHorizontal: 10}}
        /> */}
        {/* {item.status == 1 ? (
          <TouchableOpacity style={styles.btn} activeOpacity={1}>
            <Text style={styles.btntext}>Applied</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setModalVisible(true), setuserid(item?.id);
            }}>
            <Text style={styles.btntext}>Apply</Text>
          </TouchableOpacity>
        )} */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            item.status == 1 ? null : setModalVisible(true),
              setuserid(item?.id);
          }}>
          <LinearGradient
            colors={['#9B1B95', '#C830B9']} // from your design
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}} // left to right gradient
            style={{
              borderRadius: 360,
              height: 51,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              paddingHorizontal: 14,
            }}>
            <Text style={styles.text}>{`${
              item.status == 1 ? 'Applied' : 'Apply'
            }`}</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* <Text style={styles.listdet}>{item?.description}</Text> */}
      </View>
      {/* <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'flex-end',
          marginTop: hp(1.5),
        }}>
        <Text
          style={{
            color: Colors.main_back_color,
            fontSize: 14,
            marginRight: wp(2),
          }}>
          Posted by:
        </Text>
        <Text style={{color: 'white', fontSize: 12, marginRight: wp(1)}}>
          {item?.user?.firstname + ' ' + item?.user?.lastname}
        </Text>
      </TouchableOpacity> */}
    </TouchableOpacity>
  );
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1}}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{
                  width: wp(7),
                  backgroundColor: Colors.main_back_color,
                  height: wp(7),
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  borderRadius: wp(3.5),
                  right: 0,
                  top: -7,
                }}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" size={17} color="white" />
              </TouchableOpacity>
              <Box lab="ENTER MESSAGE" val={meg} onchg={txt => setmeg(txt)} />
              <TouchableOpacity
                style={styles.modalbtn}
                onPress={() => ApplyJob()}>
                <Text style={styles.modalbtntext}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={true} visible={jobdetail}>
          <View style={styles.modaljob}>
            <View style={styles.modalViewjob}>
              <TouchableOpacity
                style={{
                  width: wp(7),
                  backgroundColor: Colors.main_back_color,
                  height: wp(7),
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  borderRadius: wp(3.5),
                  right: 0,
                  top: -7,
                }}
                onPress={() => setjobdetail(false)}>
                <Icon name="close" size={17} color="white" />
              </TouchableOpacity>
              <Text
                style={{
                  color: Colors.main_back_color,
                  fontSize: 14,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  letterSpacing: 1,
                  marginTop: wp(2),
                }}>
                Job Title:
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  marginTop: wp(2),
                  paddingLeft: wp(4),
                }}>
                {currentDtail.title}
              </Text>
              <Text
                style={{
                  color: Colors.main_back_color,
                  fontSize: 14,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  letterSpacing: 1,
                  marginTop: wp(3),
                }}>
                Job Description:
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  marginTop: wp(2),
                  paddingLeft: wp(4),
                }}>
                {currentDtail?.description}
              </Text>

              <Text
                style={{
                  color: Colors.main_back_color,
                  fontSize: 14,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  letterSpacing: 1,
                  marginTop: wp(3),
                }}>
                Job Location:
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  marginTop: wp(2),
                  paddingLeft: wp(4),
                }}>
                {currentDtail?.location}
              </Text>
              <Text
                style={{
                  color: Colors.main_back_color,
                  fontSize: 14,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  letterSpacing: 1,
                  marginTop: wp(3),
                }}>
                Total Applied:
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  marginTop: wp(2),
                  paddingLeft: wp(4),
                }}>
                {currentDtail?.total}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: Colors.main_back_color,
                      fontSize: 14,
                      fontFamily: 'MontserratAlternates-SemiBold',
                      letterSpacing: 1,
                      marginTop: wp(3),
                    }}>
                    Job Posted By:
                  </Text>
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 12,
                      fontFamily: 'MontserratAlternates-Regular',
                      marginTop: wp(2),
                      paddingLeft: wp(4),
                    }}>
                    {currentDtail?.user?.firstname +
                      ' ' +
                      currentDtail?.user?.lastname}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    setjobdetail(false),
                      navigation.navigate('producerdetail', {
                        dataitem: currentDtail?.user?.id,
                      });
                  }}>
                  <Text style={styles.btntext}>See Profile</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  color: Colors.main_back_color,
                  fontSize: 14,
                  fontFamily: 'MontserratAlternates-SemiBold',
                  letterSpacing: 1,
                  marginTop: wp(3),
                }}>
                Job Status
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  marginTop: wp(2),
                  paddingLeft: wp(4),
                }}>
                {currentDtail?.status == 1
                  ? 'You have applied for this job'
                  : 'Not applied yet'}
              </Text>
            </View>
          </View>
        </Modal>

        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}

        <View style={styles.root}>
          <View style={styles.top}>
            <TouchableOpacity
              style={styles.touchPost}
              onPress={() => navigation.navigate('mypost')}>
              {/* <Text style={styles.post}>My Jobs</Text> */}
              {/* <File name="file" color={'white'} size={20} /> */}
              <Image
                source={require('../../assets/images/folder.png')}
                style={{height: 32, width: 32}}
              />
            </TouchableOpacity>
            <Text style={styles.title}>Jobs</Text>
            <TouchableOpacity
              style={{
                // marginHorizontal: wp(5),
                alignSelf: 'flex-end',
                // marginTop: wp(2),
                width: wp(25),

                height: wp(10),
                borderRadius: wp(5),
                justifyContent: 'center',
                alignItems: 'flex-end',
                // backgroundColor: Colors.main_back_color,
              }}
              onPress={() => {
                navigation.navigate('jobpost');
              }}>
              <Image
                source={require('../../assets/images/folder-add.png')}
                style={{height: 32, width: 32}}
              />
              {/* <Plus name="file-plus" color={'white'} size={20} /> */}
              {/* <Text
                style={{
                  color: 'white',
                  fontSize: 13,
                  fontFamily: 'MontserratAlternates-Regular',
                }}>
                Create New Job
              </Text> */}
              {/* <Image source={images.pls} style={styles.icon} resizeMode="contain" /> */}
            </TouchableOpacity>
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp(65),
                    alignSelf: 'center',
                  }}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="white"
                    placeholder="Search Jobs"
                    // keyboardType="al"
                    value={first}
                    onChangeText={txt => setfirst(txt)}
                    onBlur={() => {
                      SearchJob();
                    }}
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
                      color={'grey'}
                      onPress={async () => {
                        // await SearchJob(), setfirst('');
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    // backgroundColor: Colors.main_back_color,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: wp(1.5),
                    paddingHorizontal: wp(1.5),
                    paddingVertical: wp(1.5),
                  }}
                  onPress={() => setModallocation(true)}>
                  {/* <Icon3 name="equalizer" size={22} color="white" /> */}
                  <Image
                    source={require('../../assets/images/filterJob.png')}
                    style={{height: 32, width: 32}}
                  />
                </TouchableOpacity>
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: Platform.OS == 'ios' ? 40 : 0,
                }}
                data={arydata}
                renderItem={renderItem}
                // extraData={flatextra}
              />
            </View>
          </View>
        </View>
        <Loader sts={loding} />
        <Modal animationType="fade" visible={modallocation} transparent={true}>
          <View style={styles.boxmodal}>
            <View style={styles.boxinsidemodal}>
              <View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(2),
                  }}>
                  Status:
                </Text>
                <View
                  style={{
                    alignSelf: 'center',
                    zIndex: 2,
                    height: sta ? wp(30) : wp(12),
                  }}>
                  <DropDownPicker
                    mode="BADGE"
                    badgeColors={Colors.gray}
                    badgeStyle={{
                      borderWidth: 0.5,
                      borderColor: 'white',
                    }}
                    dropDownDirection="BOTTOM"
                    open={sta}
                    value={vsta}
                    listMode="SCROLLVIEW"
                    items={itemsta}
                    setOpen={setsta}
                    setValue={setVsta}
                    setItems={setitemsta}
                    placeholder="Select Status"
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
                      paddingVertical: Platform.OS == 'ios' ? 6 : 3,

                      color: 'white',
                      // flex: 1,
                      height: wp(18),
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
                      width: wp(70),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(6),
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
                      paddingVertical: Platform.OS == 'ios' ? 6 : 3,

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
                      width: wp(70),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(6),
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
                      paddingVertical: Platform.OS == 'ios' ? 6 : 3,

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
                      width: wp(70),
                    }}
                  />
                </View>
                <Text
                  style={{
                    color: Colors.main_back_color,
                    fontSize: 14,
                    fontFamily: 'MontserratAlternates-SemiBold',
                    letterSpacing: 1,
                    marginTop: wp(6),
                    alignSelf: 'flex-start',
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
                      paddingVertical: Platform.OS == 'ios' ? 6 : 3,
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
                      width: wp(70),
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      setModallocation(false), FilterJob();
                    }}
                    style={[
                      styles.button,
                      {
                        marginTop: hp(4),
                        width: wp(30),
                        backgroundColor: Colors.main_back_color,
                        height: wp(12),
                        alignSelf: 'center',
                      },
                    ]}>
                    <Text style={[styles.login, {color: 'white'}]}>Search</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      resetModle();
                    }}
                    style={[
                      styles.button,
                      {
                        marginTop: hp(4),
                        width: wp(30),
                        backgroundColor: Colors.gray,
                        borderColor: Colors.main_back_color,
                        borderWidth: 1,
                        height: wp(12),
                        alignSelf: 'center',
                      },
                    ]}>
                    <Text style={[styles.login, {color: 'white'}]}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={{position: 'absolute', right: -5, top: -5}}
                onPress={() => {
                  setModallocation(false);
                }}>
                <Icon4 name="circle-with-cross" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Job;
