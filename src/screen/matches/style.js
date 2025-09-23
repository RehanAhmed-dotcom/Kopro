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

  logos: {
    width: wp(8),
    height: wp(8),
    alignSelf: 'center',
    tintColor: 'white',
  },

  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },

  box: {
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },
  boxinside: {
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
  },
  home: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,

    color: Colors.white,
  },
  // text: {
  //   fontSize: 15,
  //   color: Colors.white,
  //   textAlign: 'center',
  // },
  titletext: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.main_back_color,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: hp(1),
  },
  mainBox: {
    flexDirection: 'row',
    alignItem: 'center',
    marginTop: wp(4),
    backgroundColor: Colors.gray,
    paddingLeft: 10,
    // borderBottomWidth: 0.7,
    borderRadius: 10,
    borderBottomColor: 'white',
    paddingTop: 10,
    paddingBottom: wp(1),
  },
  main: {
    flexDirection: 'column',
    alignItem: 'center',
    justifyContent: 'center',
    width: wp(60),
    marginLeft: wp(2),
  },
  text: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
  },
  text1: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    letterSpacing: 1,
    color: 'grey',
  },
  img: {
    width: wp(18),
    height: wp(18),
  },
  profile: {
    width: wp(16),
    height: wp(16),
    // alignSelf: 'center',
    borderRadius: wp(8),
    // marginTop:wp(5)
  },
  title: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    color: 'white',
    lineHeight: hp(3),
    marginBottom: hp(3),
  },

  button: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  login: {
    fontSize: 19,
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
  match_img: {
    width: wp(36),
    height: hp(27),
    resizeMode: 'contain',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: wp(15),
  },
  titlename: {
    color: 'white',
    paddingVertical: wp(2.2),
    paddingHorizontal: wp(2.5),
    fontWeight: 'bold',
    letterSpacing: 1,
    fontSize: 14,
    fontFamily: 'MontserratAlternates-SemiBold',
    opacity: 1,
  },
  viewimg: {
    width: wp(5),
    height: wp(5),
    tintColor: 'white',
  },
  viewimg1: {
    width: wp(4),
    height: wp(4),
    tintColor: 'white',
  },
});
