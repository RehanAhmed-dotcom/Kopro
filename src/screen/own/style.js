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

  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(5),
    marginHorizontal: wp(5),
  },
  gitd: {
    fontSize: 13,
    fontFamily: 'MontserratAlternates-SemiBold',
    // letterSpacing: 1,
    color: Colors.white,
    textAlign: 'center',
  },

  title: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,

    color: Colors.white,
  },
  box: {
    marginTop: hp(4),
    width: wp(90),
    alignSelf: 'center',
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },

  pic: {
    width: wp(90),
    borderRadius: wp(4),
    height: hp(20),
  },
  pics: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    borderWidth: 2,
    borderColor: Colors.main_back_color,
    alignSelf: 'center',
    bottom: wp(12),
  },
  profile: {
    zIndex: 4,
    top: wp(9),
    alignSelf: 'center',
    width: wp(6),
    height: wp(6),

    borderRadius: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
  },
  logos: {
    width: wp(20),
    height: wp(20),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    borderWidth: 3,
    borderColor: Colors.main_back_color,
    borderRadius: wp(10),
    opacity: 0.7,
  },
  cover: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
    position: 'absolute',
    alignSelf: 'center',
    top: hp(7),
  },
  topmain: {
    backgroundColor: Colors.gray,
    bottom: wp(10),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),

    height: hp(20),
  },

  mem: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.main_back_color,
  },
  detail: {
    marginHorizontal: wp(5),
    bottom: wp(10),
  },
  detail_title: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.main_back_color,
  },
  detail_text: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    letterSpacing: 1,
    color: 'grey',
    marginTop: wp(2),
  },
});
