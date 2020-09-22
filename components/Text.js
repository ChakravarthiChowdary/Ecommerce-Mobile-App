import React from "react";
import { StyleSheet, Text } from "react-native";

const TextComponent = ({ style, children, onPress }) => {
  return (
    <Text style={{ ...styles.textStyle, ...style }} onPress={onPress}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "RobotoRegular",
    fontSize: 18,
  },
});

export default TextComponent;
