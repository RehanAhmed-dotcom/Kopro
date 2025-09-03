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
    width: wp(100),
    height: hp(100),
  },

  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(3),
    marginHorizontal: wp(5),
  },
  boxmodal: {
    marginLeft: wp(24),
    marginRight: wp(10),
    // marginBottom: hp(7),
    marginTop: hp(73),
  },
  boxmodal1: {
    // marginLeft: wp(24),
    // marginRight:wp(10),
    // // marginBottom: hp(7),
    // marginTop:hp(73).

    height: hp(80),
    width: wp(90),
  },
  boxinsidemodal: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingVertical: hp(2),
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    paddingHorizontal: wp(5),
    marginHorizontal: wp(2),
  },
  boxinsidemodal1: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingVertical: hp(2),
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    paddingHorizontal: wp(5),
    marginHorizontal: wp(2),
  },
  modalText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'MontserratAlternates-SemiBold',
    borderBottomWidth: 0.4,
    borderBottomColor: 'white',
    marginTop: wp(3),
  },
  title: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
  },
  box: {
    marginTop: hp(7),
    width: wp(90),
    alignSelf: 'center',
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingBottom: hp(2),
  },
  text: {
    fontSize: 15,
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
  pic: {
    width: wp(90),
    borderRadius: wp(4),
    height: hp(20),
    opacity: 0.3,
  },
  modalimg: {
    width: wp(10),
    borderRadius: wp(5),
    height: wp(10),
    marginRight: wp(3),
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
    position: 'absolute',
    alignSelf: 'center',
    top: hp(7),
  },
  coverText: {
    fontSize: 18,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
  },
});
