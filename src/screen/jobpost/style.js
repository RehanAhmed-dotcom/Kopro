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
    width: wp(100),
    // height:hp(100)
  },

  top: {
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(3),
    marginHorizontal: wp(5),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: Colors.white,
  },
  touchPost: {
    width: wp(18),
  },
  post: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: Colors.white,
  },
  box: {
    marginTop: hp(3),
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
    paddingTop: hp(1),
    paddingBottom: hp(4),
    paddingHorizontal: wp(5),
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
    fontFamily: 'Helvetica-Bold',
    color: Colors.main_back_color,
    letterSpacing: 1,
  },

  icon: {
    width: wp(12),
    height: wp(12),
  },
});
