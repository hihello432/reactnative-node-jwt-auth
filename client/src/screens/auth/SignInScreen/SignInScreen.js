import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../../assets/images/kt-logo.png';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import SocialSignInButtons from '../../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../../components/Toast/Toast';
import {useToken} from '../../../components/TokenManager/TokenContext';
import {signInUser} from '../../../services/auth';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const showToast = useToast();
  const {token, setToken} = useToken();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handleInput = (name, value) => {
    setLoginInfo(prevLoginInfo => ({...prevLoginInfo, [name]: value}));
  };

  const handleLogin = async () => {
    try {
      if (!loginInfo.email || !loginInfo.password) {
        throw new Error('Please fill in all required fields.');
      }

      const res = await signInUser({data: loginInfo});

      if (res.status === 'success') {
        setToken(res.token);
        showToast('success', 'Login Successfully', res.message);
        navigation.navigate('Home');
        setLoginInfo({email: '', password: ''});
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      console.log('Login error:', error.message);
      showToast('error', 'Login Failed', error.message);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="email"
          value={loginInfo.email}
          onChange={value => handleInput('email', value)}
        />
        <CustomInput
          placeholder="password"
          value={loginInfo.password}
          onChange={value => handleInput('password', value)}
          secureTextEntry={true}
        />

        <CustomButton text="Sign in" onPress={handleLogin} />
        {/* <CustomButton
          text="Forgot Password"
          type="TERITIATY"
          onPress={handleForgotPassword}
        /> */}

        {/* <SocialSignInButtons /> */}

        <CustomButton
          text="Don't have account? Create new"
          type="TERITIATY"
          onPress={handleRegister}
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
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginVertical: 10,
  },
});
export default SignInScreen;
