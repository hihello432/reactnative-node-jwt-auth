import React from 'react';
import CustomButton from '../CustomButton/CustomButton';

const SocialSignInButtons = () => {
  const handleLoginWithFb = () => {
    console.warn('Facebook');
  };

  const handleLoginWithGoogle = () => {
    console.warn('google');
  };

  const handleLoginWithApple = () => {
    console.warn('apple');
  };

  return (
    <>
      <CustomButton
        text="Sign in with Facebook"
        onPress={handleLoginWithFb}
        bgColor="#E7EAF4"
        fgColor="#4565A9"
      />

      <CustomButton
        text="Sign in with Google"
        onPress={handleLoginWithGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />

      <CustomButton
        text="Sign in with Apple"
        onPress={handleLoginWithApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
      />
    </>
  );
};

export default SocialSignInButtons;
