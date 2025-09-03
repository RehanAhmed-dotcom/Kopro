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
    width: wp(8),
    height: wp(8),
    marginBottom: hp(3),
    alignSelf: 'center',
    tintColor: 'white',
  },
  profile: {
    width: wp(80),
    height: hp(45),
    alignSelf: 'center',
    borderRadius: wp(4),
  },
  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginTop: Platform.OS == 'ios' ? hp(1.5) : hp(5),
    marginHorizontal: wp(5),
  },
  title: {
    fontSize: 14,
    fontFamily:'MontserratAlternates-SemiBold',
    letterSpacing: 1,
    color: Colors.white,
    marginLeft:hp(0.7)
  },
  box: {
    marginHorizontal: wp(5),
    height:hp(67),
    marginBottom:hp(3),
    marginTop:hp(2)
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(7),
  },

  icon: {
    width: wp(10),
    height: wp(10),
    top: wp(5),
  },
  
  picon: {
    width: wp(6),
    height: wp(6),
  },
  bpictures: {
    width: wp(30),
    height: hp(21),
    resizeMode:'contain'
  },
  spictures: {
    width: wp(30),
    height: hp(20),
    resizeMode:'contain'
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  aboutbox: {
    marginHorizontal: wp(5),
  },
  aboutboxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(1),
    paddingBottom: hp(4),
    paddingHorizontal: wp(5),
  },
  home: {
    fontSize: 22,
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  text: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },
  heart: {
    flexDirection: 'row',
    backgroundColor: 'black',
    alignSelf: 'center',
    alignItems:'center',
    paddingHorizontal:wp(4),
    paddingVertical:hp(1),
    backgroundColor:'#643BBB',
    borderRadius:wp(10),
    bottom:wp(5)
  },
  name:{
      color:Colors.main_back_color,
      fontSize: 35,
    fontFamily:'MontserratAlternates-SemiBold',
      
      letterSpacing:1,
      textAlign:'center',
      marginBottom:hp(2)
  },
  detail:{
    color:'white',
    fontSize: 14,
    fontFamily:'MontserratAlternates-Regular',
    textAlign:'center'
},
icn:{
    width:wp(14),
    height:wp(14),
    borderRadius:wp(7),
    backgroundColor:Colors.gray,
    alignItems:'center',
    justifyContent:'center',
    elevation:10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
},
button: {
    backgroundColor: Colors.gray,
    borderRadius: 16,
    width: wp(90),
    height: wp(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
    alignSelf: 'center',
    marginBottom: hp(2),
  },
  login: {
    fontSize: 18,
                  fontFamily:'MontserratAlternates-SemiBold',
    color: Colors.white,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginRight:wp(2)
  },
});
