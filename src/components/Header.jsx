import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../global/colors';

const Header = ({ title, showBackButton, onBackPress }) => {

  return (
    <View style={styles.container}>
      {showBackButton && (
        <Pressable
          style={
            ({ pressed }) => (
              [styles.btn, { opacity: pressed ? 0.6 : 1 }]
            )}
          onPress={onBackPress}
        >
          <Ionicons name="arrow-back-outline" size={30} color={colors.blue200} />
        </Pressable>
      )}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "start",
    alignItems: "center",
    padding: 10,
    gap: 6,   
    width: "100%",
    height: 70,
    backgroundColor: colors.blue900,
  },
  text: {
    color: colors.blue200,
    fontSize: 22,
    lineHeight: 24,
    fontFamily: 'Josefin'
  },
  btn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100
  },
  btnText: {
    color: '#fff',
    fontSize: 30
  }
});
