import {
  StyleSheet,
  ImageBackground,
  StatusBar,
  FlatList,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors, {images} from '../../constants';
import {Friends_data} from '../apis/index';
import {useSelector} from 'react-redux';
import Loader from '../../constants/loader';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Otheruser = ({navigation}) => {
  const [loding, setloding] = useState(false);
  const {userData, ids} = useSelector(({USER}) => USER);
  const [ary, setary] = useState([]);
  console.log('--', ids);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      friend_data();
    });
    return unsubscribe;
  }, [navigation]);

  const friend_data = () => {
    setloding(true);
    const data = new FormData();
    data.append('id', ids);

    Friends_data({Auth: userData?.api_token, data})
      .then(res => {
        console.log('Friends data..........', res);
        setloding(false);
        if (res.status == 'success') {
          setary(res.Mutual);
          setloding(false);
        }
      })
      .catch(error => {
        setloding(false);
        console.log('Error Meaasge', error.response.data);
      });
  };
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.mainBox}
      onPress={() => {
        navigation.navigate('producerdetail', {dataitem: item.id});
      }}>
      <View style={styles.img}>
        <Image
          source={item.image == null ? images.explore : {uri: item.image}}
          style={styles.profile}
          resizeMode="contain"
        />
      </View>
      <View style={styles.main}>
        <Text style={styles.text}>{item.firstname + ' ' + item.lastname}</Text>
        <Text style={styles.text1}>
          {item.mutualfriend}{' '}
          {item.mutualfriend <= 1 ? 'Mutual Friend' : 'Mutual Friends'}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.headerImage}
      source={images.back}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.root}>
        <View style={styles.top}>
          <Icon1
            name="arrowleft"
            size={23}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Friends</Text>
          <Text>{'    '}</Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.gray,
            marginHorizontal: wp(5),
            borderRadius: wp(5),
            height: hp(80),
          }}>
          <FlatList
            data={ary}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <Loader sts={loding} />
      </View>
    </ImageBackground>
  );
};

export default Otheruser;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
    height: hp(100),
  },

  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: hp(5),
    marginBottom: hp(3),
    marginHorizontal: wp(5),
  },
  mainBox: {
    flexDirection: 'row',
    alignItem: 'center',
    marginTop: wp(4),
    marginHorizontal: wp(5),
    borderBottomWidth: 0.7,
    borderBottomColor: 'white',
    paddingBottom: wp(2),
  },
  main: {
    flexDirection: 'column',
    alignItem: 'center',
    // justifyContent: 'center',
    // marginRight: wp(5),
    justifyContent: 'center',
    width: wp(60),
    height: wp(20),
    marginLeft: wp(4),
  },
  text: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
  },
  text1: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    letterSpacing: 1,
    color: 'grey',
  },
  img: {
    width: wp(20),
    height: wp(20),
  },
  profile: {
    width: wp(20),
    height: wp(20),
    // alignSelf: 'center',
    borderRadius: wp(10),
    // marginTop:wp(5)
  },
});
