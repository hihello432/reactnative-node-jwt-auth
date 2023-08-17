// ToastContext.js
import React, {createContext, useContext, forwardRef} from 'react';
import Toast from 'react-native-toast-message';

const ToastContext = createContext();

const ToastProvider = ({children}, ref) => {
  const showToast = (type, title, message) => {
    Toast.show({
      type,
      position: 'top',
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast ref={ref} />
    </ToastContext.Provider>
  );
};

// Wrap ToastProvider with forwardRef
const ForwardedToastProvider = forwardRef(ToastProvider);

export {ForwardedToastProvider as ToastProvider, ToastContext};

export const useToast = () => useContext(ToastContext);
