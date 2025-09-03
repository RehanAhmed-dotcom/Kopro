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
    marginVertical: hp(5),
    marginHorizontal: wp(5),
  },
  title: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  box: {
    flex: 1,
    marginHorizontal: wp(5),
    marginTop: hp(10),
  },
  boxinside: {
    backgroundColor: 'black',
    borderRadius: wp(4),
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: Colors.white,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
  },
  login: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.main_back_color,
    letterSpacing: 1,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: wp(16),
    height: 45,
    lineHeight: 38,
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.white,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: hp(1),
  },
  focusCell: {
    borderColor: 'white',
  },
});
