import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Colors, {images} from '../../constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Notify, Notifytrue} from '../apis/index';
import {useSelector} from 'react-redux';

import styles from './style';

import Loader from '../../constants/loader';
import Header from '../../Components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Notification = ({navigation}: {navigation: any}) => {
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');
  const [Dataary, setDataary] = useState([]);
  const {userData} = useSelector(({USER}) => USER);
  console.log('::', Dataary);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      NotifiFun();
    });
    return unsubscribe;
  }, [navigation]);

  const NotifiFun = () => {
    seterr('');
    Notify({Auth: userData?.api_token})
      .then(res => {
        setDataary(res.data);
        Notifichekall();
      })
      .catch(error => {
        console.log('Error Meaasge', error.response.data.message);
      });
  };
  const Notifichekall = () => {
    seterr('');
    Notifytrue({Auth: userData?.api_token})
      .then(res => {
        console.log('hi..........', res);
      })
      .catch(error => {
        console.log('Error Meaasge', error.response);
      });
  };
  const Flatnotification = ({item}) => (
    <TouchableOpacity
      style={styles.main}
      onPress={() => {
        item.type == 'message'
          ? navigation.navigate('Chat')
          : item.type == 'joingroup'
          ? navigation.navigate('own')
          : item.type == 'new_apply'
          ? navigation.navigate('mypost')
          : item.type == 'verified'
          ? null
          : navigation.navigate('producerdetail', {dataitem: item.user_id});
      }}>
      <View style={styles.profileimg}>
        <Icon name="bell" size={15} color={'#FF00E5'} />
      </View>
      <View
        style={{marginLeft: widthPercentageToDP(3), justifyContent: 'center'}}>
        <View style={styles.seq}>
          <Text style={[styles.name, {color: Colors.white}]}>{item.name}</Text>
        </View>

        {/* <View style={styles.seq}>
          <Text style={styles.comment}>Commented on your post</Text>
        </View> */}
        <Text style={styles.msg}>{item.message}</Text>
      </View>
      <View
        style={{height: '100%', position: 'absolute', right: 10, bottom: -10}}>
        <Text style={styles.tim}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  const {top} = useSafeAreaInsets();
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1, top}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}
        <Header title={'Notifications'} />
        <View style={styles.root}>
          <View style={styles.top}>
            {/* <Icon
              name="arrowleft"
              size={25}
              color={Colors.white}
              onPress={() => navigation.goBack()}
            /> */}
            {/* <Text style={styles.home}>Notification</Text> */}
            <Text></Text>
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              {Dataary.length > 0 ? (
                <FlatList
                  data={Dataary}
                  renderItem={Flatnotification}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                    marginBottom: heightPercentageToDP(2),
                  }}>
                  No Notifications
                </Text>
              )}
              <Loader sts={loding} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Notification;
