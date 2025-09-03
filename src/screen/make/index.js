import React from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Make = ({navigation}: {navigation: any}) => {
  return (
    <ImageBackground style={styles.headerImage} source={images.back2}>
      {Platform.OS != 'ios' ?  <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent" 
      /> : null}
      <View style={styles.root}>
        <View style={styles.top}>
          <Icon
            name="arrowleft"
            size={25}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Make Connections</Text>
          <Text></Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxinside}>
            <Image
              source={images.make}
              style={styles.logos}
              resizeMode="contain"
            />
            <Text style={styles.text}>
              While working the app, app reminds {'\n'}you to smile,laugh, listen to others {'\n'}music and share music with {'\n'}those who matters
            </Text>
          </View>
          <View style={{alignItems: 'center',marginTop:hp(1)}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button,{backgroundColor:'transparent'}]}
            >
              <Text style={[styles.login,{color:Colors.white}]}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button,{marginTop:hp(1)}]}
              onPress={() => {
                navigation.navigate('talent');
              }}>
              <Text style={styles.login}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Make;
