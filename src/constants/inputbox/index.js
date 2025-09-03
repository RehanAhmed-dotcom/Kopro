import * as React from 'react';
import {Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

const Box = ({lab, wid, place, val, onchg, type, autoCapitalize, labplace}) => {
  const [text, setText] = React.useState('');

  return (
    <>
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'MontserratAlternates-Semibold',
          color: 'white',
        }}>
        {lab}
      </Text>
      <TextInput
        // type="outlined"
        mode="outlined"
        dense
        // underlineColor="grey"
        secureTextEntry={
          lab == 'Confirm Password' ||
          lab == 'Old Password' ||
          lab == 'New Password' ||
          lab == 'Confirm New Password' ||
          lab == 'Password'
            ? true
            : false
        }
        editable={
          type == 'edt' ||
          lab == 'GROUP TYPE' ||
          lab == 'DESCRIPTION' ||
          lab == 'ADD MEMBERS' ||
          lab == 'GENRE' ||
          type == 'profile'
            ? false
            : true
        }
        value={val}
        autoCapitalize={autoCapitalize}
        placeholder={lab ? lab : place}
        placeholderTextColor={lab == 'userne' ? 'white' : 'grey'}
        multiline={
          lab == 'ENTER MESSAGE' ||
          lab == 'INSTRUMENT' ||
          lab == 'Skill & Telent' ||
          lab == 'GENRE' ||
          lab == 'Job Description' ||
          lab == 'Job Tags' ||
          lab == 'GENRE' ||
          lab == 'ABOUT ME' ||
          lab == 'CREDIT' ||
          lab == 'DESCRIPTION'
            ? true
            : false
        }
        theme={{
          colors: {
            placeholder: '#353535',
            text: 'white',
            primary: '#353535',
            background: '#003489',
          },
          roundness: 8,
          fonts: {
            regular: {
              fontFamily: 'MontserratAlternates-Regular',
            },
          },
        }}
        // value={text}
        onChangeText={onchg}
        style={{
          backgroundColor: 'transparent',
          borderColor: 'red',
          margin: 10,
          marginTop: 5,
          height: heightPercentageToDP(5.5),
          width: wid,
          paddingLeft: lab == 'social' ? widthPercentageToDP(12) : 0,
          paddingTop:
            lab == 'social' || lab == 'userne' ? widthPercentageToDP(1) : 0,
          fontSize: val ? 14 : 12,
        }}
        // keyboardType="url"
      />
    </>
  );
};

export default Box;
