import {Dimensions, Platform, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Colors from '../../constants';
export default StyleSheet.create({
  root: {
    flex: 1,
  },
  boxmodal: {
    marginRight: wp(5),
    marginBottom: hp(7),
    paddingTop: hp(6),
    left:wp(40),
    position: 'absolute',
  },
  boxinsidemodal: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    width: wp(50),
    paddingTop: wp(5),
  },
  headerImage: {
    flex: 1,
    resizeMode: 'contain',
    height: hp(100),
  },
  profiletitle: {
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: wp(4),
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    bottom: wp(12),
    right: wp(4),
    width: wp(70),
    alignSelf: 'center',
  },
  top: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    alignItems:'center',
    marginHorizontal:15,
    marginBottom: hp(3),
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(7),
  },
  bpictures: {
    width: wp(30),
    height: hp(21),
    resizeMode: 'contain',
  },
  icn: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: Colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
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
  icn: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(2),
    backgroundColor: '#EAB951',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    marginLeft: wp(2),
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    fontWeight: 'bold',
    color: Colors.white,
  },
  box: {
    marginTop: hp(14),
    width: wp(90),
    alignSelf: 'center',
    // marginBottom:hp(10)
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),

    // paddingBottom:wp(10)
  },
  form: {
    marginHorizontal: wp(5),
    bottom: wp(10),
  },
  social: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingHorizontal: wp(4),
  },
  profile: {
    width: wp(25),
    height: wp(25),
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: wp(12.5),
  },
  imgplace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    bottom: wp(14),
  },
  text: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: Colors.white,
  },

  icon: {
    width: wp(10),
    height: wp(10),
    top: wp(5),
  },
  button: {
    // backgroundColor: Colors.white,
    borderRadius: 14,
    width: wp(45),
    alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    // paddingLeft: wp(5),
    marginBottom: wp(2),
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingBottom: wp(2),
  },
  login: {
    color: Colors.main_back_color,
    fontWeight: '600',
    // letterSpacing: 1,
    fontSize: 12.5,
    fontFamily: 'Helvetica-Bold',
  },
  name: {
    color: 'white',
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
  bio: {
    color: 'white',
    fontSize: 14,
    marginHorizontal:10,
    fontFamily: 'Helvetica',
    letterSpacing: 1,
  },
  statsContainer: {
    flexDirection: 'row', 
    marginHorizontal:10,
    marginVertical:20
  },
  stat: {
    alignItems: 'flex-start',
  },
  profile: {
    height: hp(72),
    borderRadius: wp(3),
  },
  
  box: {
    flex:1,
    marginHorizontal: wp(2),
    marginBottom: hp(3),
  },
  boxinside: {
    backgroundColor: Colors.gray,
    borderRadius: wp(4),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Helvetica',
    letterSpacing: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius:hp(2)
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius:hp(2),
    height: '53%', // 50% of the image height
    justifyContent: 'flex-end',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:10,
    marginBottom: 8,
  },
  verificationBadge: {
    backgroundColor: '#1DA1F2',
    borderRadius: 10,
    width: 20,
    height: 20,
    left:10,
    top:2,
    justifyContent: 'center',
    alignItems: 'center',
  },


  gradientTop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gradientMiddle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  gradientBottom: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'left',
  },
  description: {
    fontSize: 16,
    color: '#f0f0f0',
    lineHeight: 24,
    textAlign: 'left',
  },
});
