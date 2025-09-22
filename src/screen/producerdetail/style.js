import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants';
export default StyleSheet.create({
  root: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  icns: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: '#EAB951',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    marginLeft: wp(2),
  },
  logos: {
    width: wp(8),
    height: wp(8),
    marginBottom: hp(3),
    alignSelf: 'center',
    tintColor: 'white',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicButton: {
    backgroundColor: '#ff0eea',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profile: {
    width: wp(90),
    height: 435,

    alignSelf: 'center',
    borderRadius: 10,
  },
  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
  },
  title: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
    marginLeft: hp(0.7),
  },
  box: {
    marginHorizontal: wp(5),
    marginBottom: hp(1),
  },
  social: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(7),
  },

  icon: {
    width: wp(10),
    height: wp(10),
    top: wp(5),
  },

  picon: {
    width: wp(6),
    height: wp(6),
  },
  bpictures: {
    width: wp(30),
    height: hp(21),
    resizeMode: 'contain',
  },
  spictures: {
    width: wp(30),
    height: hp(20),
    resizeMode: 'contain',
  },
  boxinside: {
    // backgroundColor: Colors.gray,
    // borderRadius: wp(4),
    paddingTop: hp(2),
    // paddingBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  aboutbox: {
    // marginHorizontal: wp(5),
  },
  aboutboxinside: {
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(4),
    paddingHorizontal: wp(5),
  },
  home: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },
  heart: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: '#643BBB',
    borderRadius: wp(10),
    bottom: wp(5),
  },
  name: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: 'MontserratAlternates-SemiBold',

    letterSpacing: 1,
    // textAlign: 'center',
  },
  detail: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    textAlign: 'center',
  },
  icn: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  button: {
    // backgroundColor: Colors.gray,
    borderRadius: 16,
    width: wp(90),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  login: {
    fontSize: 14,
    marginLeft: 5,
    fontFamily: 'MontserratAlternates-Regular',
    color: 'grey',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginRight: wp(2),
  },
});
