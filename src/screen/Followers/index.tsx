import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Linking,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
  Share,
  Modal,
  SafeAreaView,
} from 'react-native';
import Colors, { images } from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import { LikeApi, Dislikeapi, detailApi, detailApi1 } from '../apis/index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { notId } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Icon3 from 'react-native-vector-icons/Ionicons';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import { detailApiForm } from '../apis/index';
import LinearGradient from 'react-native-linear-gradient';
const Followers = ({ navigation, route }: { navigation: any; route: any }) => {
  const [arydata, setarydata] = useState('');
  const { userData } = useSelector(({ USER }) => USER);
  const [modalState, setmodalState] = useState(false);
  const [current, setcurrent] = useState('');
  //   const [dataitem, setdataitem] = useState([]);
  const [ary, setary] = useState([]);
  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       console.log(';;;;;;././././.', route.params?.dataitem);
  //       dataMan(route.params?.dataitem);
  //     });
  //     return unsubscribe;
  //   }, [route.params?.dataitem]);
  const { name, dataitem } = route.params;
  // const {dataitem} = route.params;
  //   const [cros, setcros] = useState(dataitem.dislike);
  //   const [tik, settik] = useState(dataitem.like);

  const dataMan = async ids => {
    console.log('route', route.params?.dataitem);
    const data = new FormData();
    data.append('id', null);
    await detailApi1({ Auth: userData?.api_token })
      .then(res => {
        console.log('Home Api  respone..........++++++++++++++++++++', res);
        setdataitem(res.data);
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };

  const onShare5 = async i => {
    try {
      await Share.share({
        message: `Kopro App. ${i}`,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItem: 'center',
        marginTop: wp(4),
        marginHorizontal: wp(5),
        backgroundColor: Colors.gray,
        borderBottomWidth: 0.7,
        borderRadius: 25,
        // borderBottomColor: 'white',
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: wp(2),
      }}
      onPress={() => {
        navigation.navigate('producerdetail', { dataitem: item.id });
      }}
    >
      <View
        style={{
          width: 50,
          height: wp(20),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={item.image == null ? images.explore : { uri: item.image }}
          style={{
            width: 50,
            height: 50,
            // alignSelf: 'center',
            borderRadius: wp(10),
            // marginTop:wp(5)
          }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          alignItem: 'center',
          // justifyContent: 'center',
          // marginRight: wp(5),
          justifyContent: 'center',
          width: wp(60),
          height: wp(20),
          marginLeft: wp(4),
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'MontserratAlternates-SemiBold',
            letterSpacing: 1,
            color: Colors.white,
          }}
        >
          {item.firstname + ' ' + item.lastname}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground style={styles.headerImage} source={images.edit}>
      <SafeAreaView style={{ flex: 1 }}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}
        <View style={styles.root}>
          <View style={styles.top}>
            <Icon1
              name="arrowleft"
              size={25}
              onPress={() => navigation.goBack()}
              color={Colors.white}
              style={{ marginBottom: wp(5) }}
            />
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                fontFamily: 'MontserratAlternates-Semibold',
              }}
            >
              {name}
            </Text>
            {/* <Icon1
              name="sharealt"
              size={25}
              onPress={() => onShare()}
              color={Colors.white}
              style={{marginBottom: wp(5)}}
            /> */}
            <View style={{ width: 30 }} />
          </View>
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={dataitem}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </ScrollView>
        </View>
        <Modal animationType="fade" visible={modalState} transparent={true}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <View
              style={{
                width: wp(90),
                height: hp(55),
                // backgroundColor: Colors.white,
              }}
            >
              <Image
                source={{ uri: current }}
                style={{ width: wp(90), height: hp(55) }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: wp(4),
                  top: -10,
                  backgroundColor: 'red',
                  borderRadius: wp(4),
                  width: wp(8),
                  height: wp(8),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setmodalState(false)}
              >
                <Icon1 name="close" size={20} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Followers;
