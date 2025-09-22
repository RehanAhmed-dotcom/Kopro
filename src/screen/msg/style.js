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
    width: 22,
    height: 22,
    alignSelf: 'center',
    borderRadius: wp(5),
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    marginBottom: hp(6),
  },

  box: {
    flex: 1,
    marginHorizontal: wp(5),
  },
  boxinside: {
    flex: 1,
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  textbox: {
    maxWidth: wp(65),
    paddingLeft: wp(4),
    paddingRight: wp(4),
    paddingVertical: hp(1),
    backgroundColor: '#1F1F1F',
    borderRadius: wp(2),
    flexWrap: 'nowrap',
    marginBottom: hp(2),
  },
  msg: {
    fontSize: 14,
    fontFamily: 'MontserratAlternates-Regular',
  },
  tim: {
    alignSelf: 'flex-end',
    fontSize: 10,
    fontFamily: 'MontserratAlternates-Regular',
  },
  input: {
    height: wp(12),
    // borderWidth: 1,
    padding: 10,
    fontSize: 14,

    fontFamily: 'MontserratAlternates-Regular',
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingLeft: wp(3),
    width: wp(74),
    color: 'white',
  },
  chaticon: {
    width: wp(6),
    height: wp(6),
    tintColor: 'white',
  },
});
