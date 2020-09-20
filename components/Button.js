import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { colors } from "../constants/Colors";
import Text from "./Text";

const ButtonComponent = ({ style, title, color, onPress, iconComponent }) => {
  return (
    <TouchableOpacity style={{ ...styles.buttonStyle }} onPress={onPress}>
      <View style={{ ...styles.buttonView }}>
        {iconComponent}
        <Text
          style={{
            ...style,
            color: "#fff",
            fontSize: 15,
            justifyContent: "center",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: colors.secondary,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  buttonView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ButtonComponent;
