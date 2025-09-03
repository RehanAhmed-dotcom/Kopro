import React,{useEffect} from 'react';
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
import SplashScreen from 'react-native-splash-screen'

const Play = ({navigation}: {navigation: any}) => {
  useEffect(() => {
    SplashScreen.hide();
  }, [])
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
          <Text style={styles.title}>Connect with anyone,{'\n'}anywhere</Text>
          <Text></Text>
        </View>

        <View style={styles.box}>
          <View style={styles.boxinside}>
            <Image
              source={images.play}
              style={styles.logos}
              resizeMode="contain"
            />
            <Text style={styles.text}>
              Find the people who match with {'\n'}your music type
            </Text>
          </View>
          <View style={{alignItems: 'center',marginTop:hp(3)}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button,{backgroundColor:'transparent'}]}
              >
              <Text style={[styles.login,{color:Colors.white,  fontSize: 16,fontFamily:'MontserratAlternates-Medium'}]}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.button,{marginTop:hp(1)}]}
              onPress={() => {
                navigation.navigate('addimage');
              }}>
              <Text style={styles.login}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Play;
