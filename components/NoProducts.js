import React from "react";
import { View, Button, StyleSheet } from "react-native";

import Text from "./Text";
import { colors } from "../constants/Colors";

const NoProducts = ({ message, style, navigation, route }) => {
  return (
    <View style={{ ...styles.NoProductsView, ...style }}>
      <Text style={{ fontFamily: "RobotoBold", marginVertical: 10 }}>
        {message}
      </Text>
      <Button
        title="Add Some"
        color={colors.secondary}
        onPress={() => navigation.navigate(route)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  NoProductsView: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoProducts;
