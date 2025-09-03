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
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(1),
    marginHorizontal: wp(5),
  },

  title: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,

    color: Colors.white,
  },
  box: {
    marginTop: hp(2),
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

  pic: {
    width: wp(90),
    borderRadius: wp(4),
    height: hp(20),
  },

  logos: {
    width: wp(24),
    height: wp(24),
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    borderWidth: 3,
    borderColor: Colors.main_back_color,
    borderRadius: wp(12),
  },

  participant: {
    width: wp(15),
    height: wp(15),

    borderRadius: wp(7.5),
  },
  modalimg: {
    width: wp(10),
    borderRadius: wp(5),
    height: wp(10),
    marginRight: wp(3),
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
  private: {
    position: 'absolute',
    bottom: 5,
    left: wp(16),
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
  },
  part: {
    color: 'grey',
    marginVertical: wp(5),
    fontSize: 12,
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  pname: {
    color: 'white',
    fontSize: 16,
    letterSpacing: 1,
    lineHeight: wp(7),
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  pmesg: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'MontserratAlternates-SemiBold',
  },
});
