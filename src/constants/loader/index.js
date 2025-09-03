import React, {useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loader = ({sts}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={sts}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.3)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#9b1b95" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    right: wp(45),
    bottom: hp(45),
    position: 'absolute',
  },
  con: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
