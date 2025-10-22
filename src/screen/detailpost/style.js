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
    // height: hp(100),
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
  },
  listtag: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: 'lightblue',
    marginBottom: hp(0.1),
  },
  listdet: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: 'white',
  },
  listBl: {
    marginTop: wp(1.5),
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
  },
  boxinside: {
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(4),
    paddingHorizontal: wp(5),
  },

  profileView: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp(10),
    width: wp(13),
    height: wp(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: wp(10),
    height: wp(10),
  },

  btn: {
    backgroundColor: Colors.main_back_color,
    alignSelf: 'flex-end',
    paddingHorizontal: wp(2),
    paddingVertical: wp(0.7),
    borderRadius: wp(1),
    justifyContent: 'center',
  },
  btntext: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: 'white',
  },
  icon: {
    width: wp(12),
    height: wp(12),
  },
  name: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
  },
  mesg: {
    fontSize: 10,
    fontFamily: 'Helvetica',
    color: 'white',
    width: wp(45),
  },
});
