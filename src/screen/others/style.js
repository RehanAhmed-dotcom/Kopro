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
    height: hp(100),
  },
  input: {
    height: wp(12),
    borderWidth: 1,
    padding: 10,
    backgroundColor: Colors.gray,
    borderRadius: 20,
    paddingLeft: wp(5),
    width: wp(90),
    fontSize: 14,
    color: 'white',
    fontFamily: 'Helvetica',
  },

  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(5),
    marginHorizontal: wp(5),
  },

  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
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
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    borderWidth: 2,
    borderColor: Colors.main_back_color,
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
    fontFamily: 'Helvetica-Bold',
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

    // height:hp(26)
  },
  main: {
    flexDirection: 'row',
    marginTop: wp(5),
    alignItems: 'center',
    marginHorizontal: wp(5),
    justifyContent: 'space-between',
  },
  mem: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: Colors.main_back_color,
    width: wp(50),
  },
  mem1: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: Colors.main_back_color,
  },
  detail: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  join: {
    // marginHorizontal: wp(5),
    // marginTop: hp(2),

    width: wp(30),
    height: wp(10),
    paddingHorizontal: wp(3),
    paddingVertical: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(10),
  },
  detail_title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: Colors.main_back_color,
  },
  detail_text: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    letterSpacing: 1,
    color: 'grey',
    marginTop: wp(2),
  },
  boxmodal: {
    // marginLeft: wp(10),
    // marginRight: wp(13),
    flex: 1,
    marginBottom: hp(7),
    paddingTop: hp(16),
    alignItems: 'center',
    // overflow: 'visible',
  },
  boxinsidemodal: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    paddingHorizontal: wp(5),
    marginHorizontal: wp(2),
    paddingBottom: wp(10),
    height: hp(50),
    width: wp(80),
    overflow: 'hidden',
  },
});
