import React, { useState } from "react";
import {
  View,
  ImageBackground,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "../components/TextInput";
import Text from "../components/Text";
import { Button } from "react-native-paper";
import { colors } from "../constants/Colors";
import { updatePassword } from "../store/actions/profileUpdateActions";

const image = require("../assets/images/signin.jpg");

const ChangePassScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(route.params.userData.email);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const errorState = useSelector((state) => state.profile.error);
  const loading = useSelector((state) => state.profile.loading);
  const oldPasswordState = useSelector((state) => state.auth.userData.password);

  const changePassClickedHandler = async () => {
    if (password !== "" || oldPassword !== "" || confirmPassword !== "") {
      if (oldPasswordState !== oldPassword) {
        setError("Old password is incorrect!");
      } else if (oldPassword === password) {
        setError("New password should be different!");
      } else if (password.length < 6) {
        setError("Password length should be greater than 6");
      } else if (password !== confirmPassword) {
        setError("Confirm password is not same as new password!");
      } else {
        Keyboard.dismiss();
        Alert.alert(
          "Confirm",
          "Changing password leads logging you out",
          [
            {
              text: "Cancel",
              onPress: () => navigation.goBack(),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: async () => {
                const userData = route.params.userData;
                userData.password = password;
                await dispatch(updatePassword(password, userData));
              },
            },
          ],
          { cancelable: false }
        );
      }
    } else {
      setError("Mandatory fields cannot be left blank!");
    }
  };

  const inputChangedHandler = (text, field) => {
    setError(null);
    switch (field) {
      case "oldpass":
        setOldPassword(text);
        break;
      case "newpass":
        setPassword(text);
        break;
      case "confirmpass":
        setConfirmPassword(text);
        break;
    }
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.changePassBackground}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{ margin: 10 }}>
            <View style={styles.changePassFormView}>
              <Text style={styles.changePassHeading}>Change Password</Text>
            </View>
            <View>
              <Text style={styles.changePassInputText}>Email</Text>
              <TextInput
                text={email}
                style={styles.changePassInputText2}
                editable={false}
              />
            </View>
            <View>
              <Text style={styles.changePassInputText}>Old Password</Text>
              <TextInput
                text={oldPassword}
                style={styles.changePassInputText2}
                secureTextEntry={true}
                textChangedHandler={(text) =>
                  inputChangedHandler(text, "oldpass")
                }
              />
            </View>
            <View>
              <Text style={styles.changePassInputText}>New Password</Text>
              <TextInput
                text={password}
                style={styles.changePassInputText2}
                secureTextEntry={true}
                textChangedHandler={(text) =>
                  inputChangedHandler(text, "newpass")
                }
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.changePassInputText}>
                Confirm new password
              </Text>
              <TextInput
                text={confirmPassword}
                style={styles.changePassInputText2}
                secureTextEntry={true}
                textChangedHandler={(text) =>
                  inputChangedHandler(text, "confirmpass")
                }
              />
            </View>
            <View style={{ marginBottom: 10 }}>
              {error && (
                <Text style={styles.changePassErrorText}>* {error}</Text>
              )}
              {errorState && (
                <Text style={styles.changePassErrorText}>
                  * {errorState.message}
                </Text>
              )}
            </View>
            <View>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Button
                  mode="contained"
                  onPress={changePassClickedHandler}
                  color={colors.primary}
                  labelStyle={{ color: "#fff" }}
                  style={{ marginBottom: 15 }}
                >
                  Change Password
                </Button>
              )}
              <Button
                mode="contained"
                onPress={() => navigation.goBack()}
                color={colors.secondary}
                labelStyle={{ color: "#fff" }}
              >
                Discard
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  changePassInputText: { color: "#fff", fontSize: 16 },
  changePassBackground: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
  },
  changePassFormView: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  changePassErrorText: { fontSize: 16, color: "#fff" },
  changePassInputText2: { color: "#fff", fontSize: 18 },
  changePassHeading: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "RobotoBold",
  },
});

export const changePassScreenOptions = {
  headerTitle: "Change Password",
};

export default ChangePassScreen;
