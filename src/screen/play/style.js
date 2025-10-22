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
  logos: {
    width: wp(70),
    height: wp(70),
    marginBottom:hp(3),
    alignSelf:'center',
  },
  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginVertical: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
  },
  title: {
    fontSize: 20,
    fontFamily:'Helvetica-Bold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign:'center'
  },
  box: {
    flex: 1,
    marginHorizontal: wp(5),
    marginTop: hp(10),
   
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingBottom: hp(4),
    paddingHorizontal: wp(5),

  },
  text: {
    fontSize: 16,
    fontFamily:'Helvetica-Bold',
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
    fontSize: 18,
    fontFamily:'Helvetica-Bold',
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
