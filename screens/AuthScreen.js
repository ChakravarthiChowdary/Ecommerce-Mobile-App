import React, { useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { colors } from "../constants/Colors";
import { signInUser } from "../store/actions/authActions";
import { getProducts } from "../store/actions/productsActions";

const image = require("../assets/images/signin.jpg");

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const loginClickedHandler = async () => {
    await dispatch(
      signInUser({
        email: username,
        password: password,
        returnSecureToken: true,
      })
    );
    dispatch(getProducts());
  };
  return (
    <ImageBackground source={image} style={styles.image}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.authBackgroundGradient}>
          <View style={styles.authInnerView}>
            <Text style={styles.authText}>Verify Yourself</Text>
            <View style={styles.authContainerView}>
              <TextInput
                placeholder="Username"
                placeholderColor="#fff"
                style={styles.authInput}
                text={username}
                textChangedHandler={(text) => setUsername(text)}
              />
              <TextInput
                placeholder="Password"
                placeholderColor="#fff"
                style={styles.authInput}
                secureTextEntry={true}
                text={password}
                textChangedHandler={(text) => setPassword(text)}
              />
            </View>
            {error ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 12 }}>
                  {error.message}
                </Text>
              </View>
            ) : null}
            <View style={styles.authButtonView}>
              {loading ? (
                <ActivityIndicator size={32} color={colors.secondary} />
              ) : (
                <Button
                  title="LOGIN"
                  color={colors.secondary}
                  onPress={loginClickedHandler}
                />
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  authInnerView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    margin: 10,
    alignItems: "center",
  },
  authBackgroundGradient: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  authContainerView: {
    width: "100%",
  },
  authButtonView: {
    width: "100%",
    marginTop: 10,
  },
  authInput: {
    height: 50,
    borderBottomColor: "#fff",
    color: "#fff",
    fontSize: 16,
  },
  authText: { color: "#fff", fontSize: 23, marginBottom: 20 },
});

export const authScreenOptions = {
  headerTitle: "Authenticate",
};

export default AuthScreen;
