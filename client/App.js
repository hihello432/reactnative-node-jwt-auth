import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useRef} from 'react';
import Navigation from './src/navigation';
import {ToastProvider} from './src/components/Toast/Toast';
import {TokenProvider} from './src/components/TokenManager/TokenContext';

function App() {
  const toastRef = useRef(); // Create a ref for the ToastProvider

  return (
    <ToastProvider ref={toastRef}>
      <TokenProvider>
        <SafeAreaView style={styles.root}>
          <Navigation />
        </SafeAreaView>
      </TokenProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
