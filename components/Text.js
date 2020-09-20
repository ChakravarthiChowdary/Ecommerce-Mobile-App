import React from "react";
import { StyleSheet, Text } from "react-native";

const TextComponent = ({ style, children }) => {
  return <Text style={{ ...styles.textStyle, ...style }}>{children}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },
});

export default TextComponent;
