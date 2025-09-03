import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants';
export default StyleSheet.create({
  root: {
    flex: 1,
    marginHorizontal: 15,
  },
  profile: {
    left: wp(12),
    zIndex: 4,
    top: wp(29),
    backgroundColor: Colors.main_back_color,
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    alignItems: 'center',
    borderColor: Colors.white,
    borderWidth: 1,
  },
  logos: {
    width: wp(37),
    height: wp(37),
    marginTop: 10,
    alignSelf: 'center',
  },

  logos1: {
    width: wp(30),
    height: wp(30),
    marginBottom: hp(5),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    borderRadius: wp(15),
  },
  headerImage: {
    flex: 1,
    backgroundColor: 'yellow',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.white,
    textAlign: 'center',
  },
  forget: {
    fontSize: 15,
    letterSpacing: 1,
    color: Colors.white,
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  acc: {
    fontSize: 12,
    letterSpacing: 1,
    color: Colors.white,
    alignSelf: 'center',
    marginVertical: hp(1.5),
    fontFamily: 'MontserratAlternates-Regular',
  },
  container: {
    marginTop: hp(6),
  },
  inputbox: {
    marginTop: hp(2),
    marginBottom: hp(1.5),
  },
  button: {
    backgroundColor: Colors,
    borderRadius: 16,
    width: wp(91),
    height: wp(14),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
    borderRadius: 360,
  },
  login: {
    color: Colors.main_back_color,
    letterSpacing: 1,

    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
  },
});
