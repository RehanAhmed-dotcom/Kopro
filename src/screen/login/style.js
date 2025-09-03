import {Platform,StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants';
export default StyleSheet.create({
  root: {
    flex: 1,
  },

  logos: {
    width: wp(35),
    height: wp(35),
    alignItems: 'center',
    marginBottom: hp(6),
    marginTop: hp(2),
  },
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    letterSpacing: 1,
    left:10,
    top:20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.white,
  },
  forget: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Medium',
    letterSpacing: 1,
    color: Colors.white,
    alignSelf: 'center',
    marginVertical: hp(2),
  },
  acc: {
    fontSize: 12,
    fontFamily: 'MontserratAlternates-Regular',
    letterSpacing: 1,
    color: Colors.white,
    alignSelf: 'center',
  },
  container: {
    marginTop: hp(2),
  },
  inputbox: {
    marginTop: hp(1),
    marginBottom: hp(1.3),
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(9),
  },
  login: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',

    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
