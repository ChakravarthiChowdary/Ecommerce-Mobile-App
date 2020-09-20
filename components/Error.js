import React from "react";
import { StyleSheet, View, Button } from "react-native";

import Text from "./Text";
import { colors } from "../constants/Colors";

const Error = ({ error, style, tryAgainClickedHandler }) => {
  return (
    <View style={{ ...styles.homeActivityView, ...style }}>
      <View style={styles.homeErrorView}>
        <Text
          style={{ marginBottom: 10, fontFamily: "RobotoBold", fontSize: 18 }}
        >
          {error.message}
        </Text>
        <Button
          title="Try Again"
          color={colors.secondary}
          onPress={tryAgainClickedHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  homeActivityView: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  homeErrorView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});

export default Error;
