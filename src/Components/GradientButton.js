import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ title, onPress, style = {}, }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={style} onPress={onPress}>
      <LinearGradient
        colors={['#9B1B95', '#C830B9']} // from your design
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} // left to right gradient
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 360, 
    height:51,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14, // optional, based on your Figma padding
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight:'800',
    fontFamily: 'MontserratAlternates-SemiBold',
  },
});

export default GradientButton;
