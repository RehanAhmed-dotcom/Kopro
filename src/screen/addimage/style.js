import {StyleSheet} from 'react-native';
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
    width: wp(27),
    height: hp(15),
    borderRadius: 10,
    marginLeft: wp(2),
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
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  box: {
    flex: 1,
    marginHorizontal: wp(5),
    marginTop: hp(10),
  },
  boxinside: {
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    // backgroundColor: 'transparent',
    paddingTop: hp(2),
    paddingBottom: hp(4),
    // paddingHorizontal: wp(5),
    marginBottom: hp(10),
  },

  button: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(10),
  },
  login: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
