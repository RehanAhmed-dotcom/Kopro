import React, {useEffect} from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Box from '../../constants/inputbox';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { message, myGroup, otherGroups } from '../../assets/svgs';
import { SvgXml } from 'react-native-svg';

const Lab = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex:1}}>
  
      {Platform.OS != 'ios' ? (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      ) : null}
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
          <View style={styles.top}>
            {/* <Text style={{width: wp(18)}}></Text> */}
            <Text style={styles.title}>Lab</Text>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('groups');
              }}>
              <Text style={styles.gitd}>Create New{'\n'}Group</Text>
            </TouchableOpacity> */}
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              <TouchableOpacity
                style={styles.main}
                onPress={() => {
                  navigation.navigate('Chat');
                }}>
                 <SvgXml width={'141'} height={'141'} xml={message} />
                <Text style={styles.names}>Direct Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              <TouchableOpacity
                style={styles.main}
                onPress={() => {
                  navigation.navigate('own');
                }}>
               <SvgXml width={'141'} height={'141'} xml={myGroup} />
               <Text style={[styles.names, {marginTop: wp(2)}]}>
                  My Groups
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.box}>
            <View style={styles.boxinside}>
              <TouchableOpacity
                style={styles.main}
                onPress={() => {
                  navigation.navigate('others');
                }}>
                <SvgXml width={'141'} height={'141'} xml={otherGroups} />
                <Text style={[styles.names, {marginTop: wp(2)}]}>
                  Other Groups
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <View
            style={{
              marginHorizontal: wp(5),
              alignItems: 'center',
              marginTop: wp(3),
            }}>
            <Image
              source={images.g2}
              style={styles.last}
              resizeMode="contain"
            />
          </View> */}
        </View>
      </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Lab;
