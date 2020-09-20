import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { colors } from "../constants/Colors";

const TextInputComp = ({
  style,
  placeholder,
  text,
  textChangedHandler,
  secureTextEntry,
  placeholderColor,
  keyboardType,
  multiline,
}) => {
  return (
    <TextInput
      style={{ ...styles.textInput, ...style }}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      secureTextEntry={secureTextEntry}
      multiline={multiline}
      value={text}
      keyboardType={keyboardType}
      onChangeText={textChangedHandler}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    borderColor: "transparent",
    borderBottomColor: colors.primary,
    padding: 5,
    marginBottom: 10,
  },
});

export default TextInputComp;
