import React from 'react';
import {
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import Colors, {images} from '../../constants';
import styles from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Songwriter = ({navigation}: {navigation: any}) => {
  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
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
            style={{marginBottom: wp(5)}}
          />
        </View>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <View style={styles.box}>
            <View style={styles.boxinside}>
              <Image
                source={images.girlsong}
                style={styles.profile}
                resizeMode="contain"
              />
              <View style={styles.heart}>
                <Icon name="heart" size={13} color={Colors.white} />
                <Text style={styles.title}>87% Match!</Text>
              </View>

              <Text
                style={styles.name}
                onPress={() => {
                  navigation.navigate('genre');
                }}>
                Nicholas Rayes
              </Text>
              <Text style={styles.detail}>
                I Live my life like my last day. Traveller, Explorer,{'\n'}
                Photographer.
              </Text>
            </View>
          </View>

          <View style={styles.aboutbox}>
            <View style={styles.aboutboxinside}>
              <Text
                style={{
                  fontSize: 20,
                  color: Colors.main_back_color,
                  fontWeight: 'bold',
                }}>
                About
              </Text>

              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontFamily: 'MontserratAlternates-Regular',
                  letterSpacing: 1,
                  marginVertical: wp(3),
                }}>
                My name is Jessica Parker and i enjoy meting new people and
                finding ways to help them have an uplifting expr=erience. I
                enjiy reading..
              </Text>

              <View style={styles.social}>
                <Image
                  source={images.fac}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Image
                  source={images.you}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Image
                  source={images.tik}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Image
                  source={images.cl}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Image
                  source={images.int}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, {marginTop: wp(2)}]}
            onPress={() => {
              navigation.navigate('songwriter');
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.login}>Songwriter</Text>
              <Image
                source={images.songwriter}
                style={styles.picon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginHorizontal: wp(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              source={images.b1}
              style={styles.bpictures}
              resizeMode="contain"
            />
            <Image
              source={images.b2}
              style={styles.bpictures}
              resizeMode="contain"
            />
            <Image
              source={images.b3}
              style={styles.bpictures}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              marginHorizontal: wp(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              source={images.b1}
              style={styles.spictures}
              resizeMode="contain"
            />
            <Image
              source={images.b2}
              style={styles.spictures}
              resizeMode="contain"
            />
            <Image
              source={images.b3}
              style={styles.spictures}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};
export default Songwriter;
