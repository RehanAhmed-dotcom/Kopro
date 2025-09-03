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
  profile: {
    width: wp(12),
    height: wp(12),
    alignSelf: 'center',
    borderRadius: wp(5),
  },
  chatimg: {
    width: wp(66),
    height: wp(40),
    alignSelf: 'center',
    borderRadius: wp(2),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    // marginBottom: hp(1),
  },

  box: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  boxinside: {
    flex: 1,
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
    height: '100%',
  },
  textbox: {
    width: wp(70),
    paddingLeft: wp(4),
    paddingRight: wp(2),
    paddingVertical: hp(1),
    backgroundColor: 'white',
    borderRadius: wp(2),
    flexWrap: 'nowrap',
    marginBottom: hp(1),
  },
  msg: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    color: 'black',
  },
  tim: {
    alignSelf: 'flex-end',
    fontSize: 10,
    fontFamily: 'MontserratAlternates-Regular',
  },
  input: {
    height: wp(12),
    borderWidth: 1,
    padding: 10,
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
    backgroundColor: 'grey',
    borderRadius: 20,
    paddingLeft: wp(3),
    width: wp(62),
    color: 'white',
  },
  chaticon: {
    width: wp(6),
    height: wp(6),
    tintColor: 'white',
  },
});
