import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const Loading = ({ style, size }) => {
  return (
    <View style={{ ...styles.activityIndicator, ...style }}>
      <ActivityIndicator size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loading;
