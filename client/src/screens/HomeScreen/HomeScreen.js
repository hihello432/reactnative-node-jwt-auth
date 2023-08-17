import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import axios from 'axios';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useToken} from '../../components/TokenManager/TokenContext';
import {useNavigation} from '@react-navigation/native';
import {useToast} from '../../components/Toast/Toast';
import {logoutUser} from '../../services/auth';
import {getUserInfo} from '../../services/user';

const HomeScreen = () => {
  const [userInfo, setUserInfo] = useState(null);
  const {token, setToken} = useToken();
  const navigation = useNavigation();
  const showToast = useToast();

  useEffect(() => {
    getUser();
  }, [token]);

  const getUser = async () => {
    try {
      const res = await getUserInfo(token);
      if (res) {
        setUserInfo(res);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser(token);
      if (res) {
        navigation.navigate('SignIn');
        showToast('success', 'Logout Successfully', res.data.message);
      }
    } catch (error) {
      console.log('Request failed:', error);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome</Text>
        {userInfo && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>{userInfo.username}</Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <CustomButton text="Logout" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontWeight: 'bold', fontSize: 32},
  userInfoContainer: {alignItems: 'center'},
  userInfoText: {fontSize: 18, color: 'black'},
  buttonContainer: {paddingVertical: 10},
});
