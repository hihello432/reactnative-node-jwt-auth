import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';

const NewPasswordScreen = () => {
  const navigation = useNavigation();

  const [confirmInfo, setConfirmInfo] = useState({
    code: '',
    newPassword: '',
  });

  const handleInput = (name, value) => {
    setConfirmInfo(prevConfirmInfo => ({...prevConfirmInfo, [name]: value}));
  };

  const handleBackToLogin = () => {
    navigation.navigate('SignIn');
  };

  const handleSubmit = () => {
    navigation.navigate('SignIn');
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset Your Password</Text>
        <CustomInput
          placeholder="Enter Your Code"
          value={confirmInfo.code}
          onChange={value => handleInput('code', value)}
        />

        <CustomInput
          placeholder="Enter Your Password"
          value={confirmInfo.newPassword}
          onChange={value => handleInput('newPassword', value)}
        />

        <CustomButton text="Submit" onPress={handleSubmit} />

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
export default NewPasswordScreen;
