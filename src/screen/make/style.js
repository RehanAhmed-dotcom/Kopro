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
  },
  logos: {
    width: wp(65),
    height: wp(65),
    marginBottom:hp(3),
    alignSelf:'center',
  },
  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginVertical: hp(5),
    marginHorizontal: wp(5),
  },
  title: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign:'center'
  },
  box: {
    flex: 1,
    marginHorizontal: wp(5),
    marginTop: hp(6),
   
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(8),
    paddingHorizontal: wp(5),

  },
  text: {
    fontSize: 15,
    color: Colors.white,
    textAlign:'center'

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
    fontSize: 19,
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
