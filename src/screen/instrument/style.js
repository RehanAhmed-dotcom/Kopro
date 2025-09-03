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
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
  },

  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    marginBottom:hp(2)
  },

  box: {
    marginHorizontal: wp(5),
    marginBottom: hp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp(6),
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(1),
    paddingHorizontal: wp(5),
    width: wp(42),
    height: hp(19),
    alignItems: 'center',
    justifyContent:"center",
    flexDirection: 'column',
    marginLeft: wp(2),
  },
  home: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-Medium',
    color: Colors.white,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    color: Colors.white,
    marginHorizontal: wp(5),
    textAlign: 'center',
    marginTop: hp(6),
    paddingBottom: hp(4),
  },
  img: {
    width: wp(8),
    height: wp(8),
  },
  radiobtn: {
    width: wp(4),
    height: wp(4),
    alignSelf: 'flex-end',
  },
  radiotitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  main: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderBottomColor: Colors.main_back_color,
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: hp(2),
    marginTop: hp(4),
  },
  login: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
