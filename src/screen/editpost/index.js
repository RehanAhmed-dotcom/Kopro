import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import Box from '../../constants/inputbox';
import {images} from '../../constants';
import styles from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {EditMyPost} from '../apis/index';
import Loader from '../../constants/loader';
import {useSelector} from 'react-redux';
import Tags from 'react-native-tags';
import Icon from 'react-native-vector-icons/AntDesign';

const Editpost = ({navigation, route}) => {
  const {dataitem} = route.params;
  console.log('edit post', dataitem);
  const {userData} = useSelector(({USER}) => USER);

  const [title, settitle] = useState(dataitem?.title);
  const [des, setdes] = useState(dataitem?.description);
  const [totaltags, settotaltags] = useState(dataitem?.tags);
  const [loding, setloding] = useState(false);
  const [err, seterr] = useState('');

  const EditJobDetails = () => {
    setloding(true);
    seterr('');

    if (!title || !des || totaltags.length == 0) {
      setloding(false);
      seterr('All Fields is Required');
    } else {
      const data = new FormData();
      data.append('id', dataitem?.id);
      data.append('title', title);
      data.append('description', des);
      totaltags.forEach(element => {
        data.append('tags[]', element);
      });
      EditMyPost({Auth: userData?.api_token, data})
        .then(res => {
          console.log('Edit my job..........', res);
          if (res.status == 'success') {
            Platform.OS == 'android'
              ? ToastAndroid.show('Edit Job Successfully', ToastAndroid.SHORT)
              : null;
            navigation.navigate('mypost');
          }
        })
        .catch(error => {
          console.log('Error Meaasge', error);
          setloding(false);
        });
    }
  };

  return (
    <ImageBackground style={styles.headerImage} source={images.back}>
      <SafeAreaView style={{flex: 1}}>
        {Platform.OS != 'ios' ? (
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
        ) : null}
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <View style={styles.top}>
              <Icon
                name="arrowleft"
                size={20}
                color="white"
                style={{width: 100}}
                onPress={() => navigation.goBack()}
              />
              <Text style={styles.title}>Edit Post</Text>
              <Text style={{width: 100}}></Text>
            </View>

            <View style={styles.box}>
              <View style={styles.boxinside}>
                <Box
                  lab="Job Title"
                  wid={wp(80)}
                  val={title}
                  onchg={txt => settitle(txt)}
                />
                <Box
                  lab="Job Description"
                  wid={wp(80)}
                  val={des}
                  onchg={txt => setdes(txt)}
                />

                <View style={{marginTop: wp(5)}}>
                  <Tags
                    initialText="EnterTag"
                    initialTags={dataitem?.tags}
                    textInputProps={{
                      placeholder: 'Any type of animal',
                    }}
                    onChangeTags={tags => settotaltags(tags)}
                    onTagPress={(index, tagLabel, event, deleted) =>
                      console.log(
                        index,
                        tagLabel,
                        event,
                        deleted ? 'deleted' : 'not deleted',
                      )
                    }
                    containerStyle={{
                      justifyContent: 'center',
                      width: wp(80),
                    }}
                    inputStyle={{backgroundColor: 'white'}}
                    renderTag={({
                      tag,
                      index,
                      onPress,
                      deleteTagOnPress,
                      readonly,
                    }) => (
                      <TouchableOpacity
                        key={`${tag}-${index}`}
                        onPress={onPress}
                        style={{
                          flexDirection: 'row',
                          backgroundColor: 'grey',
                          borderRadius: wp(5),
                          paddingHorizontal: wp(1),
                          paddingVertical: wp(0.5),
                          alignItems: 'center',
                          marginRight: wp(1),
                          marginBottom: wp(2),
                        }}>
                        <Text style={{flexDirection: 'row', color: 'white'}}>
                          #{tag}{' '}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>

                <Text
                  style={{
                    alignSelf: 'center',
                    color: 'red',
                    fontSize: 13,
                    fontFamily: 'MontserratAlternates-SemiBold',
                  }}>
                  {err}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => EditJobDetails()}
                  style={[styles.button, {marginTop: hp(10)}]}>
                  <Text style={styles.login}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <Loader sts={loding} />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default Editpost;
