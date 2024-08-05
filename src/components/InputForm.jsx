import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";

const InputForm = ({ label, placeHolder = "", value, onChangeText, error = "", isSecure = false }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.subtitle}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",    
  },
  subtitle: {
    width: "90%",
    fontSize: 18,
    fontFamily: "Josefin",    
  },
  error: {
    paddintTop: 4,
    marginTop: 5,
    fontSize: 16,
    color: colors.red600,
    fontFamily: "Josefin",
    fontStyle: "italic",
  },
  input: {
    width: "90%",
    marginTop: 10,
    borderWidth: 0,
    borderBottomWidth: 3,
    borderBottomColor: colors.gray100,
    padding: 2,
    fontFamily: "Josefin",
    fontSize: 14,
  },
});
