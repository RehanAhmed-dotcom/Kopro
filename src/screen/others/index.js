import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Ionicons';

import {showAllgroup} from '../apis/index';
import {useSelector} from 'react-redux';
import Loader from '../../constants/loader';
import database from '@react-native-firebase/database';
import Groups from '../groups';
import ChatComp from './ChatComp';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Others = ({navigation}: {navigation: any}) => {
  const [first, setfirst] = useState('');

  useEffect(() => {
    showallgrp();
  }, [navigation]);
  useEffect(() => {
    showallgrp();
  }, [change]);
  const [loding, setloding] = useState(false);
  const [change, setChange] = useState(false);
  const [arydata, setarydata] = useState([]);
  console.log('--[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[', arydata);
  const [sea, setsea] = useState([]);
  const alter = () => {
    setChange(!change);
  };
  const renderItem = ({item}) => (
    <>
      {item.groupType != 'Private' && (
        <View style={styles.box}>
          <ChatComp item={item} alter={alter} navigation={navigation} />
        </View>
      )}
    </>
  );

  const {userData} = useSelector(({USER}) => USER);
  // console.log('{{{{{{{', userData);
  const showallgrp = () => {
    // setloding(true);
    database()
      .ref(`groups`)
      .orderByChild('timestamp')
      .on('value', dataSnapshot => {
        let group = [];
        dataSnapshot.forEach(child => {
          if (child.val().members != userData?.id) {
            group.push(child.val());
          }
        });
        setarydata(group.reverse());
        setloding(false);
      });
  };
  // console.log('data', newData);
  // console.log('new data', JSON.stringify(arydata));
  const [search, setsearch] = useState([]);
  const SearchJob = () => {
    if (search.length == 0) {
      setsearch(arydata);
      let y = arydata.filter(sub =>
        String(sub.groupName.toLowerCase()).startsWith(first.toLowerCase()),
      );
      console.log('ne', y);
      setarydata(y);
    } else {
      let y = search.filter(sub =>
        String(sub.groupName.toLowerCase()).startsWith(first.toLowerCase()),
      );
      console.log('ne', y);
      setarydata(y);
    }
  };

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
            size={25}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Others Group</Text>
          <Text></Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp(90),
              alignSelf: 'center',
            }}>
            <TextInput
              style={styles.input}
              placeholderTextColor="white"
              placeholder="Search here..."
              // keyboardType="al"
              value={first}
              onChangeText={txt => setfirst(txt)}
              onBlur={() => SearchJob()}
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
                name="close"
                size={22}
                color={Colors.white}
                onPress={() => {
                  setfirst(''), SearchJob();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={arydata}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <Loader sts={loding} />
      </View>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Others;
