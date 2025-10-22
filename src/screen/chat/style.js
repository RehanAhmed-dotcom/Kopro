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
  round: {
    width: wp(3),
    height: wp(3),
    backgroundColor: 'red',
    borderRadius: wp(1.5),
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: wp(1),
    right: wp(1),
    borderWidth: 0.7,
    borderColor: 'white',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  title: {
    fontSize: 14,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: hp(0.7),
  },
  box: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    height: hp(75),
  },
  home: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,

    color: Colors.white,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },
  profile: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3),
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: hp(2),
  },
  seq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(58),
  },
  name: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: Colors.main_back_color,
  },
  num: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: 'white',
    textAlign: 'center',

    fontFamily: 'Helvetica-Bold',
    justifyContent: 'center',
    color: Colors.main_back_color,
  },
  tim: {
    color: 'grey',
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  mesg: {
    color: Colors.white,
    width: wp(37),
    fontSize: 14,
    fontFamily: 'Helvetica',
  },
});
