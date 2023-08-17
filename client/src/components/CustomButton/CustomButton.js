import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const CustomButton = ({text, type = 'PRIMARY', onPress, bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  container_PRIMARY: {backgroundColor: '#3B71F3'},
  container_TERITIATY: {},
  container_SECONDARY: {borderColor: '#3B71F3', borderWidth: 1},

  text: {fontWeight: 'bold'},
  text_PRIMARY: {color: 'white'},
  text_TERITIATY: {},
  text_SECONDARY: {color: '#3B71F3'},
});
export default CustomButton;
