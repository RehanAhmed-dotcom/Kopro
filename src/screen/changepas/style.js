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
    marginTop: Platform.OS == 'ios' ? hp(1.5) :hp(5),
    marginBottom: hp(3),
    marginHorizontal: wp(5),
  },
  logos: {
    width: wp(25),
    height: wp(25),
    alignSelf:'center',
  },
  title: {
 
    fontSize: 20,
    fontFamily:'Helvetica-Bold',
    letterSpacing: 1,
 
    color: Colors.white,
  },
  box: {
    marginTop: hp(4),
    width:wp(90),
    height:hp(68),
    alignSelf:'center',
    elevation:20,
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
    // paddingVertical: hp(2),
    paddingBottom:hp(2),
    paddingHorizontal: wp(5),
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
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
   
    fontSize: 18,
    fontFamily:'Helvetica-Bold',
    color: Colors.main_back_color,
   
    letterSpacing: 1,
  },
});
