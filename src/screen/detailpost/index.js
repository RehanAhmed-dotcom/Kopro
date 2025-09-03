import React from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import Box from '../../constants/inputbox';
import {images} from '../../constants';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';

const Detailpost = ({navigation, route}: {navigation: any, route: any}) => {
  const {dataitem} = route.params;
  console.log(JSON.stringify(dataitem));
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        marginTop: wp(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('producerdetail', {dataitem: item?.user?.id});
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={styles.profileView}>
          <Image
            source={
              item?.user?.image == null
                ? images.explore
                : {uri: item?.user?.image}
            }
            style={styles.profile}
            resizeMode="contain"
          />
        </View>
        <View style={{marginLeft: wp(3), flexDirection: 'column'}}>
          <Text style={styles.name}>{item.user.firstname}</Text>
          <Text style={styles.mesg} numberOfLines={5}>
            {item.message}
          </Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('msg', {item: item.user})}>
          <Text style={styles.btntext}>Contact</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <ImageBackground style={styles.headerImage} source={images.back2}>
      {Platform.OS != 'ios' ? (
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
      ) : null}
      <View style={styles.root}>
        <View style={styles.top}>
          <Icon
            name="arrowleft"
            size={20}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>{dataitem?.title}</Text>
          {/* <Icon
            name="edit"
            size={20}
            color="white"
            onPress={() => navigation.navigate('editpost', {dataitem})}
          /> */}
          <View style={{width: wp(10)}} />
        </View>

        <View style={styles.box}>
          <View style={styles.boxinside}>
            <View style={styles.listBl}>
              <Text style={styles.titleText}>Description</Text>
              <Text style={styles.listdet}>{dataitem?.description}</Text>
              <Text style={[styles.titleText, {marginTop: 10}]}>Tags</Text>
              <Text style={styles.listtag}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {dataitem?.tags?.map(elem => (
                    <Text style={styles.listtag}>
                      #{elem}
                      {'  '}
                    </Text>
                  ))}
                </View>
              </Text>
              <Text style={[styles.titleText, {marginTop: 10}]}>
                Applicants ({dataitem?.total})
              </Text>

              <FlatList
                data={dataitem?.applicant}
                renderItem={renderItem}
                style={{height: hp(45)}}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Detailpost;
