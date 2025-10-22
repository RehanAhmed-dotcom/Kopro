import {
  StyleSheet,
  Platform,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors, {images} from '../../constants';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Mutual from './mutual';
import Following from './following';
import Follower from './follower';
const Friends = ({navigation}) => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.headerImage}
      source={images.back}>
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
            size={23}
            color={Colors.white}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Friends</Text>
          <Text>{'    '}</Text>
        </View>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: 'transparent',
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'Helvetica-Bold',
            },
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'gray',
            tabBarItemStyle: {width: 120},
            tabBarStyle: {
              backgroundColor: '#1A0B19',
              borderWidth: 1,
              marginHorizontal: 20,
              borderColor: Colors.main_back_color,
              borderTopRightRadius: wp(5),
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,

              borderTopLeftRadius: wp(5),
            },
          }}>
          <Tab.Screen name="Mutual" component={Mutual} />
          <Tab.Screen name="Following" component={Following} />
          <Tab.Screen name="Followers" component={Follower} />
        </Tab.Navigator>
      </View>
    </ImageBackground>
  );
};

export default Friends;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
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
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(3),
    marginHorizontal: wp(5),
  },
});
