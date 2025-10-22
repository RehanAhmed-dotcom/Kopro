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
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
    marginBottom:hp(2)
  },

  box: {
    marginHorizontal: wp(5),
    marginBottom:hp(12),
    marginTop:hp(2)
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(6),
    paddingHorizontal: wp(5),
  },
  home: {
    fontSize: 20,
      fontFamily:'Helvetica-Bold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 16,
      fontFamily:'Helvetica-Bold',
    color: Colors.white,
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
      fontFamily:'Helvetica-Bold',
    color: Colors.white,
    marginHorizontal:wp(5),
    textAlign:'center',
    marginVertical:hp(6)
  },
  radiobtn:{
      width:wp(5),
      height:wp(5),
  },
  radiotitle:{
      color:Colors.white,
      fontSize: 14,
      fontFamily:'Helvetica-Bold',
  },
  main:{
      flexDirection:'row',
      justifyContent:'space-between',
      borderBottomWidth:1,
      borderBottomColor:Colors.main_back_color,
      paddingBottom:wp(2),
      marginBottom:hp(3)
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    width: wp(80),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf:'center',
    marginBottom:wp(5)
  },
  login: {
    fontSize: 18,
      fontFamily:'Helvetica-Bold',
    color: Colors.main_back_color,
    fontWeight: '600',
    letterSpacing: 1,
  },


});
