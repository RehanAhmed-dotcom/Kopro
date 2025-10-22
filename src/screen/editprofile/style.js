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
    // height: hp(100),
  },

  profile: {
    left: wp(12),
    zIndex: 4,
    top: wp(29),
    backgroundColor: '#4F483F',
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.white,
  },
  logos: {
    width: wp(35),
    height: wp(35),
    marginBottom: hp(5),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.5,
    borderRadius: wp(19),
    borderColor: 'white',
    borderWidth: 2,
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
    width: wp(90),
    alignSelf: 'center',
  },
  boxinside: {
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: wp(12),
  },
  form: {
    marginHorizontal: wp(5),
    bottom: wp(10),
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
    width: wp(10),
    height: wp(10),
    position: 'absolute',
    top: wp(5),
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
    marginBottom: hp(5),
  },
  login: {
    color: Colors.main_back_color,

    letterSpacing: 1,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
  radiobtn: {
    width: wp(3),
    height: wp(3),
  },
  radiotitle: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.main_back_color,
    paddingBottom: wp(1),
    marginBottom: hp(2),
  },

  boxmodal: {
    marginLeft: wp(20),
    marginRight: wp(10),
    marginBottom: hp(7),
    paddingTop: hp(31),
    position: 'absolute',
    width: wp(60),
  },
  boxinsidemodal: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(6),
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
    height: hp(50),
  },
});
