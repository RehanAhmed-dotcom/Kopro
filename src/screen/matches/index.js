import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
} from 'react-native';

import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {LikeApi, Dislikeapi, SearchByNameApi} from '../apis/index';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';

const Matches = ({navigation, route}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [loding, setloding] = useState('');
  const [err, seterr] = useState('');
  const data = [
    {
      title: 'Samntha,22',
      imgback: images.m1,
    },
    {
      title: 'Samntha,22',
      imgback: images.m2,
    },
    {
      title: 'Samntha,22',
      imgback: images.m3,
    },
    {
      title: 'Samntha,22',
      imgback: images.m1,
    },
    {
      title: 'Samntha,22',
      imgback: images.m2,
    },
    {
      title: 'Samntha,22',
      imgback: images.m3,
    },
  ];

  console.log('--------------', route.params.resary);

  // const likefun = item => {
  //   setloding(true);
  //   seterr('');
  //   const data = new FormData();
  //   data.append('id', item);

  //   LikeApi({Auth: userData.api_token, data})
  //     .then(res => {
  //       console.log('Like Api   respone..........', res);
  //       if (res.status == 'success') {
  //         ToastAndroid.show('You have like User', ToastAndroid.SHORT);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error Meaasge', error.response.data);
  //       if (error.response.data.message == 'You Already Like This User') {
  //         ToastAndroid.show(
  //           `${error.response.data.message}`,
  //           ToastAndroid.SHORT,
  //         );
  //       } else {
  //         console.log('Error Meaasge', error);
  //       }
  //     });
  // };
  // const dislikefun = item => {
  //   setloding(true);
  //   seterr('');
  //   const data = new FormData();
  //   data.append('id', item);

  //   Dislikeapi({Auth: userData.api_token, data})
  //     .then(res => {
  //       console.log('Like Api   respone..........', res);
  //       if (res.status == 'success') {
  //         ToastAndroid.show('You have Dislike User', ToastAndroid.SHORT);
  //       }
  //     })
  //     .catch(error => {
  //       console.log('Error Meaasge', error.response.data);
  //       if (error.response.data.message == 'You Already DisLike This User') {
  //         ToastAndroid.show(
  //           `${error.response.data.message}`,
  //           ToastAndroid.SHORT,
  //         );
  //       } else {
  //         console.log('Error Meaasge', error);
  //       }
  //     });
  // };

  // const renderItem = ({item}) => (
  //   <TouchableOpacity
  //     style={{
  //       marginBottom: widthPercentageToDP(3),
  //       width: widthPercentageToDP(41),
  //       height: heightPercentageToDP(28),
  //     }}
  //     activeOpacity={0.9}
  //     onPress={() => {
  //       navigation.navigate('producerdetail', {dataitem: item});
  //     }}>
  //     <ImageBackground
  //       style={styles.match_img}
  //       resizeMode={item.image == null ? 'cover' : 'contain'}
  //       source={item.image == null ? images.explore : {uri: item.image}}
  //       imageStyle={{borderRadius: widthPercentageToDP(3)}}>
  //       <View
  //         style={{
  //           backgroundColor: '#6b6c7f',

  //           borderTopRightRadius: widthPercentageToDP(3),
  //           borderTopLeftRadius: widthPercentageToDP(3),
  //           bottom: widthPercentageToDP(34.5),
  //           opacity: 0.7,
  //         }}>
  //         <Text style={styles.titlename}>
  //           {item.firstname + ' ' + item.lastname}
  //         </Text>
  //       </View>

  //       <View
  //         style={{
  //           backgroundColor: '#6b6c7f',
  //           flexDirection: 'row',
  //           justifyContent: 'space-around',
  //           alignItems: 'center',
  //           opacity: 0.7,
  //           borderBottomRightRadius: widthPercentageToDP(3),
  //           borderBottomLeftRadius: widthPercentageToDP(3),
  //         }}>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: 'transparent',
  //             width: widthPercentageToDP(20),
  //             height: widthPercentageToDP(8),
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}
  //           onPress={() => likefun(item.id)}>
  //           <Image
  //             source={images.ms}
  //             style={styles.viewimg}
  //             resizeMode="contain"
  //           />
  //         </TouchableOpacity>
  //         <View
  //           style={{
  //             borderLeftWidth: 1,
  //             borderLeftColor: 'white',
  //             width: widthPercentageToDP(1),
  //             height: heightPercentageToDP(5),
  //           }}></View>
  //         <TouchableOpacity
  //           style={{
  //             backgroundColor: 'transparent',
  //             width: widthPercentageToDP(20),
  //             height: widthPercentageToDP(8),
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //           }}
  //           onPress={() => dislikefun(item.id)}>
  //           <Image
  //             source={images.cs}
  //             style={styles.viewimg1}
  //             resizeMode="contain"
  //           />
  //         </TouchableOpacity>
  //       </View>
  //     </ImageBackground>
  //   </TouchableOpacity>
  // );
  const render = ({item}) => (
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
        {item.mutual > 0 ? (
          <Text style={styles.text1}>
            {item.mutual}{' '}
            {item.mutual <= 1 ? 'Mutual Friend' : 'Mutual Friends'}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
  const [mi, setmi] = useState([]);
  const [mi1, setmi1] = useState([]);
  useEffect(() => {
    let arr = [...route.params.resary];
    let arr1 = [];
    arr.forEach(element => {
      if (arr1.length > 0) {
        if (element.mutual == 0) {
          arr1.unshift(element);
        } else {
          arr1.push(element);
        }
      } else {
        arr1.push(element);
      }

      console.log('[[[--]]]', arr);
    });
    setmi(arr1.reverse());
    // setmi1(arr1);
  }, []);
  return (
    <ImageBackground style={styles.headerImage} source={images.back2}>
      {Platform.OS != 'ios' ? (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      ) : null}
      <View style={styles.root}>
        <View style={styles.top}>
          <Icon
            name="arrowleft"
            size={25}
            onPress={() => navigation.goBack()}
            color={Colors.white}
          />
          <Text style={styles.home}>Search Result</Text>
          <Text></Text>
        </View>
        <View style={styles.box}>
          <View style={styles.boxinside}>
            {/* <Text style={styles.titletext}>Select your interest</Text>
            <Text style={styles.title}>
              Select a few your interests and let everyone know what you're
              passionate about
            </Text> */}
            <View style={{height: heightPercentageToDP(60)}}>
              <FlatList data={mi} renderItem={render} />
            </View>
            {/* <FlatList data={mi} renderItem={render} /> */}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Matches;
