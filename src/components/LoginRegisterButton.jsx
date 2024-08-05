import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const LoginRegisterButton = ({ onPress, title }) => {
  return (
    <Pressable
      onPress={onPress}
      style={
        ({ pressed }) => (
          [styles.btn, { opacity: pressed ? 0.6 : 1 }]
        )}
    >
      <Text style={styles.btnText}>{title}</Text>
    </Pressable>
  );
};

export default LoginRegisterButton;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#257',
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 100
  },
  btnText: {
    color: '#fff',
    fontSize: 15
  }
});