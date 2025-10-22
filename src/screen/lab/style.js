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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginBottom: hp(3),
    marginHorizontal: wp(5),
  },

  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
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
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingBottom: hp(1),
    paddingHorizontal: wp(5),
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
    fontFamily: 'Helvetica-Bold',
    color: Colors.main_back_color,
    letterSpacing: 1,
  },
  pic: {
    width: wp(28),
    height: wp(28),
  },
  names: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    color: 'white',
  },
  gitd: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    // letterSpacing: 1,
    color: Colors.white,
    textAlign: 'center',
  },
  main: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: wp(2),
  },
  last: {
    width: wp(45),
    height: wp(45),
  },
  icon: {
    width: wp(8),
    height: wp(8),
  },
});
