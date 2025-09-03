import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {My_total_jobs, DeleteJob} from '../apis/index';
import {useSelector} from 'react-redux';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Mypost = ({navigation}: {navigation: any}) => {
  const {userData} = useSelector(({USER}) => USER);
  const [arydata, setarydata] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      myjobs();
    });
    return unsubscribe;
  }, []);

  const myjobs = () => {
    My_total_jobs({Auth: userData?.api_token})
      .then(res => {
        console.log('Profile Details   respone..........', res);
        if (res.status == 'success') {
          setarydata(res.Jobs.reverse());
        }
      })
      .catch(error => {
        console.log('Error Meaasge', error);
      });
  };

  const deleteselectedpost = dt => {
    Alert.alert('Delete Post', 'Are you sure you want to delete post?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          const data = new FormData();
          data.append('id', dt.id);
          DeleteJob({Auth: userData?.api_token, data})
            .then(res => {
              console.log('Deleted------------------', res);
              if (res.status == 'success') {
                myjobs();
              }
            })
            .catch(error => {
              console.log('Error Meaasge', error);
            });
        },
      },
    ]);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.listview}
      onPress={() => navigation.navigate('detailpost', {dataitem: item})}
      onLongPress={() => deleteselectedpost(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.titleList}>{item.title}</Text>
        <Text style={styles.appli}>Applicants ({item.total})</Text>
      </View>
      <View style={styles.listBl}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {item?.tags?.map(elem => (
            <Text style={styles.listtag}>
              #{elem}
              {'  '}
            </Text>
          ))}
        </View>

        <Text style={styles.listdet}>{item.description}</Text>
        <Text
          style={[
            styles.appli,
            {
              alignSelf: 'flex-end',
              fontSize: 14,
              color: Colors.main_back_color,
            },
          ]}>
          Location ({item.location})
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <ImageBackground style={styles.headerImage} source={images.back2}>
      <SafeAreaView style={{flex:1}}>
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
            size={20}
            color="white"
            style={{width: 100}}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>My Post</Text>
          <Text style={{width: 100}}></Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxinside}>
            <FlatList data={arydata} renderItem={renderItem} />
          </View>
        </View>
      </View>

      </SafeAreaView>
    
    </ImageBackground>
  );
};
export default Mypost;
