import React from "react";
import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";

import Text from "./Text";
import { colors } from "../constants/Colors";

const QuantityComponent = ({
  quantity,
  onChange,
  plusClickedHandler,
  minusClickedHandler,
}) => {
  return (
    <View style={styles.buttonQuantityOuterView}>
      <TouchableOpacity onPress={minusClickedHandler}>
        <View style={styles.buttonQuantityView}>
          <Text style={styles.buttonIncrement}>-</Text>
        </View>
      </TouchableOpacity>
      <TextInput
        keyboardType="number-pad"
        value={quantity}
        style={{ marginLeft: 10 }}
        onChangeText={onChange}
      />
      <TouchableOpacity style={{ marginLeft: 10 }} onPress={plusClickedHandler}>
        <View style={styles.buttonQuantityView}>
          <Text style={styles.buttonIncrement}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonIncrement: { color: "#fff", fontFamily: "RobotoBold" },
  buttonQuantityView: {
    paddingHorizontal: 10,
    backgroundColor: colors.secondary,
  },
  buttonQuantityOuterView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },
});

export default QuantityComponent;
