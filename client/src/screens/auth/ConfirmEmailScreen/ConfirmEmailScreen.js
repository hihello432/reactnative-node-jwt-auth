import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const ConfirmEmailScreen = () => {
  const navigation = useNavigation();

  const [confirmInfo, setConfirmInfo] = useState({
    code: '',
  });

  const handleInput = (name, value) => {
    setConfirmInfo(prevConfirmInfo => ({...prevConfirmInfo, [name]: value}));
  };

  const handleConfirm = () => {
    navigation.navigate('Home');
  };

  const handleResendCode = () => {
    console.warn('resend code');
  };

  const handleBackToLogin = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Confirm Your Email</Text>
        <CustomInput
          placeholder="Enter your confirmation code"
          value={confirmInfo.code}
          onChange={value => handleInput('code', value)}
        />

        <CustomButton text="Confirm" onPress={handleConfirm} />

        <CustomButton
          text="Resend Code"
          type="SECONDARY"
          onPress={handleResendCode}
        />

        <CustomButton
          text="Back to Sign in"
          type="TERITIATY"
          onPress={handleBackToLogin}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 10,
    color: '#051C60',
  },
  text: {color: 'gray', marginVertical: 10},
  link: {color: 'orange'},
});
export default ConfirmEmailScreen;
