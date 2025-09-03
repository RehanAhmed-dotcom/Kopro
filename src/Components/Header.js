// ExampleComponent.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { images } from '../constants';
import Icon6 from 'react-native-vector-icons/MaterialIcons';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
const Header = ({ title, count=0, showRightIcon = false }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
             <View style={styles.side}>
                <Image style={styles.logo} source={images.testlogo} resizeMode='cover' />
            </View>
            <Text style={styles.title}>{title}</Text>
            {showRightIcon ? 
                <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  marginRight: wp(2),
                }}
                onPress={() => {
                  navigation.navigate('notification');
                }}>
                <Icon6 name="notifications-active" size={27} color={'white'} />
                {count > 0 ? (
                  <View
                    style={{
                      position: 'absolute',
                      right: -4,
                      top: -5,
                      backgroundColor: 'red',
                      width: wp(4.6),
                      height: wp(4.6),
                      borderRadius: wp(2.3),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 10,
                      }}>
                      {count}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity> : null}
         
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
       
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    side: {
        width: 41, // Same width as logo to balance layout
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 41,
        width: 41,
    },
    title: {
        position: 'absolute',
        left: 0,
        right: 0,
        fontFamily: 'MontserratAlternates-Semibold',
        textAlign: 'center',
        fontSize: 20,
        color:"white",
    },
});
