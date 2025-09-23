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
    fontFamily: 'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
  },

  post: {
    fontSize: 10,
    fontFamily: 'MontserratAlternates-Regular',
    letterSpacing: 1,
    color: Colors.white,
  },
  box: {
    marginTop: hp(1),
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
    width: wp(90),
    height: hp(75),
    // backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(3),
    paddingHorizontal: wp(5),
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

  icon: {
    width: wp(12),
    height: wp(12),
  },
  listview: {
    width: wp(80),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: wp(4),
    paddingVertical: wp(6),
    borderRadius: wp(2),
    backgroundColor: 'black',
    paddingLeft: wp(5),
    paddingRight: wp(2),
  },
  titleList: {
    fontSize: 15,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.white,
    letterSpacing: 2,
    width: wp(45),
  },
  appli: {
    fontSize: 10,
    fontFamily: 'MontserratAlternates-SemiBold',
    color: Colors.white,
  },
  listtag: {
    fontSize: 12,
    fontFamily: 'MontserratAlternates-Regular',
    color: 'lightblue',
    marginBottom: hp(0.1),
  },
  listdet: {
    fontSize: 12,
    fontFamily: 'MontserratAlternates-Regular',
    color: 'white',
  },
  listBl: {
    marginTop: wp(1.5),
  },
});
