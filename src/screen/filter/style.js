import {StyleSheet} from 'react-native';
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
    // alignContent: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    marginBottom: hp(3),
  },

  box: {
    marginHorizontal: wp(5),
    marginBottom: hp(7),
    flex: 1,
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
    paddingBottom: hp(2),
    flex: 1,
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

  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: 'white',
    lineHeight: hp(3),
    marginBottom: hp(2.5),
    textAlign: 'center',
  },
  boxmodal: {
    marginLeft: wp(20),
    marginRight: wp(10),
    marginBottom: hp(7),
    paddingTop: hp(31),
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
  radiobtn: {
    width: wp(5),
    height: wp(5),
  },
  radiotitle: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.main_back_color,
    paddingBottom: wp(2),
    marginBottom: hp(3),
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
  chaticon: {
    width: wp(6),
    height: wp(6),
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(3),
    alignSelf: 'center',
    marginBottom: hp(1),
  },
  login: {
    color: Colors.main_back_color,

    letterSpacing: 1,
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
});
