import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import SocialSignInButtons from '../../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useToast} from '../../../components/Toast/Toast';
import {validateEmail, validatePassword} from '../../../util/Validations';
import {signUpUser} from '../../../services/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const showToast = useToast();

  const [registerInfo, setRegisterInfo] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const handleInput = (name, value) => {
    setRegisterInfo(prevRegisterInfo => ({...prevRegisterInfo, [name]: value}));
  };

  const handleRegister = async () => {
    try {
      if (
        !registerInfo.username ||
        !registerInfo.email ||
        !registerInfo.password
      ) {
        throw new Error('Please fill in all required fields.');
      }

      if (!validateEmail(registerInfo.email)) {
        throw new Error('Please provide a valid email.');
      }

      if (!validatePassword(registerInfo.password)) {
        throw new Error('Your password should be at least 8 characters long.');
      }

      if (registerInfo.password !== registerInfo.confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      try {
        const res = await signUpUser({data: registerInfo});

        if (res) {
          showToast(
            'success',
            'Registered',
            'You have successfully registered.',
          );
          navigation.navigate('SignIn');
          setRegisterInfo({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log('Registration error:', error.response.data.message);
          showToast(
            'error',
            'Registration Failed',
            error.response.data.message,
          );
        } else {
          console.log('Registration error:', error.message);
          showToast(
            'error',
            'Registration Failed',
            'An error occurred during registration.',
          );
        }
      }
    } catch (error) {
      console.log('Validation error:', error.message);
      showToast('error', 'Validation Error', error.message);
    }
  };

  const handleLogin = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create New Account</Text>
        <CustomInput
          placeholder="username"
          value={registerInfo.username}
          onChange={value => handleInput('username', value)}
        />
        <CustomInput
          placeholder="email"
          value={registerInfo.email}
          onChange={value => handleInput('email', value)}
        />
        <CustomInput
          placeholder="password"
          value={registerInfo.password}
          onChange={value => handleInput('password', value)}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="confirm password"
          value={registerInfo.confirmPassword}
          onChange={value => handleInput('confirmPassword', value)}
          secureTextEntry={true}
        />

        <CustomButton text="Register" onPress={handleRegister} />

        <Text style={styles.text}>
          By Registering, you confirm that you accept our{' '}
          <Text style={styles.link}>Terms of use</Text>
          and <Text style={styles.link}>Privicy policy</Text>
        </Text>
        {/* <SocialSignInButtons /> */}
        <CustomButton
          text="Have an account ? Sign in"
          type="TERITIATY"
          onPress={handleLogin}
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
export default SignUpScreen;
