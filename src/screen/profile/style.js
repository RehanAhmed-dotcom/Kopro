import {Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants';
export default StyleSheet.create({
  root: {
    flex: 1,
    // marginTop: 50,
  },
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
    // height: hp(100),
    // top: 50,
  },
  profiletitle: {
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: wp(4),
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    bottom: wp(12),
  },
  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: Colors.white,
  },
  box: {
    marginTop: hp(16),
    width: wp(90),
    alignSelf: 'center',
    // marginBottom:hp(10)
  },
  boxinside: {
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
  },
  form: {
    // marginHorizontal: wp(5),
    bottom: wp(10),
  },
  profile: {
    width: wp(25),
    height: wp(25),
    // borderWidth: 1,
    borderColor: 'white',
    // borderRadius: wp(12.5),
  },
  imgplace: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'flex-start',
    bottom: wp(14),
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },

  icon: {
    width: wp(8),
    height: wp(8),
    position: 'absolute',
    top: 22,
    left: wp(4),
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1),
    alignSelf: 'center',
    marginBottom: hp(6),
  },
  login: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
