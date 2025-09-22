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
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    justifyContent: 'space-between',
  },
  profileimg: {
    width: 35,
    height: 35,
    backgroundColor: '#30172F',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: wp(9),
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
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(5),
    // paddingHorizontal: wp(5),
    // height:hp(67)
    marginBottom: wp(5),
  },
  home: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },
  profile: {
    width: 15,
    height: 15,
    borderRadius: wp(8),
  },
  main: {
    flexDirection: 'row',
    backgroundColor: '#191919',
    alignItems: 'flex-start',
    paddingTop: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: hp(3),
    borderBottomColor: 'white',
    // borderBottomWidth: 1,
    paddingBottom: hp(2),
  },
  seq: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp(58),
    marginBottom: wp(1.3),
  },
  name: {
    fontSize: 16,
    fontFamily: 'MontserratAlternates-SemiBold',
  },
  tim: {
    color: 'grey',
    fontSize: 10,
    fontFamily: 'MontserratAlternates-Medium',
  },
  comment: {
    color: 'grey',
    width: wp(37),
    fontSize: 12,
    fontFamily: 'MontserratAlternates-Medium',
  },
  msg: {
    width: wp(60),
    fontSize: 12,
    fontFamily: 'MontserratAlternates-Regular',
    color: 'grey',
    flexWrap: 'nowrap',
  },
  postlike: {
    color: 'grey',
    width: wp(37),
    fontSize: 14,

    fontFamily: 'MontserratAlternates-Regular',
  },
});
