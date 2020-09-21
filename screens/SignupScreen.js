import React, { useState } from "react";
import {
  Button,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/Text";
import TextInput from "../components/TextInput";
import { colors } from "../constants/Colors";
import { signUpUser } from "../store/actions/authActions";
const image = require("../assets/images/signin.jpg");

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  //redux state
  const loading = useSelector((state) => state.auth.loading);
  //component level state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [alterphone, setAlterphone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [error, setError] = useState(null);

  const inputChangedHandler = (text, field) => {
    setError(null);
    switch (field) {
      case "fname":
        setFirstname(text);
        break;
      case "lname":
        setLastname(text);
        break;
      case "age":
        let age = parseInt(text);
        if (age > 100) {
          age = 99;
          setAge(age.toString());
        } else setAge(text);
        break;
      case "email":
        setEmail(text);
        break;
      case "address":
        setAddress(text);
        break;
      case "phone":
        if (text.length > 10) setPhone("");
        else setPhone(text);
        break;
      case "alterphone":
        if (text.length > 10) setAlterphone("");
        else setAlterphone(text);
        break;
      case "pass":
        setPassword(text);
        break;
      case "confirmpass":
        setConfirmpass(text);
        break;
    }
  };

  const signupClickedHandler = () => {
    if (
      firstname !== "" ||
      age !== "" ||
      email !== "" ||
      address !== "" ||
      phone !== "" ||
      alterphone !== "" ||
      password !== "" ||
      confirmpass !== ""
    ) {
      if (phone.length < 10 || alterphone.length < 10) {
        setError("Invalid Phone number");
      } else if (phone === alterphone) {
        setError("Two phone numbers cannot be same");
        return;
      } else if (password !== confirmpass) {
        setError("Passwords are not same");
        return;
      } else if (password.length <= 6) {
        setError("Password length should be greater than 6");
      } else {
        dispatch(
          signUpUser(
            {
              email: email,
              password: password,
              returnSecureToken: true,
            },
            {
              firstname: firstname,
              lastname: lastname,
              email: email,
              password: password,
              age: age,
              phone: phone,
              alternatephone: alterphone,
              address: address,
            }
          )
        );
      }
    } else {
      setError("Mandatory fields cannot be left blank");
    }
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <View style={styles.signupOuterView}>
            <View style={styles.signupInnerView}>
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontFamily: "RobotoBold",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  SIGN UP
                </Text>
              </View>
              <View style={{ width: "100%" }}>
                <View style={styles.signupNamesView}>
                  <TextInput
                    placeholder="First name"
                    style={{ width: "46.5%", color: "#fff", fontSize: 16 }}
                    placeholderColor="#fff"
                    text={firstname}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "fname")
                    }
                  />
                  <TextInput
                    placeholder="Last name"
                    style={{ width: "46.5%", color: "#fff", fontSize: 16 }}
                    placeholderColor="#fff"
                    text={lastname}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "lname")
                    }
                  />
                </View>
                <View style={styles.signupNamesView}>
                  <TextInput
                    placeholder="Age"
                    style={{ width: "25%", color: "#fff", fontSize: 16 }}
                    keyboardType="number-pad"
                    placeholderColor="#fff"
                    text={age}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "age")
                    }
                  />
                  <TextInput
                    placeholder="Email"
                    style={{ width: "70%", color: "#fff", fontSize: 16 }}
                    placeholderColor="#fff"
                    text={email}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "email")
                    }
                  />
                </View>
                <View style={styles.signupNamesView}>
                  <TextInput
                    placeholder="Address"
                    style={{ width: "100%", color: "#fff", fontSize: 16 }}
                    multiline={true}
                    placeholderColor="#fff"
                    text={address}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "address")
                    }
                  />
                </View>
                <View style={styles.signupNamesView}>
                  <TextInput
                    placeholder="Phone number"
                    style={{ width: "46.5%", color: "#fff", fontSize: 16 }}
                    keyboardType="number-pad"
                    placeholderColor="#fff"
                    text={phone}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "phone")
                    }
                  />
                  <TextInput
                    placeholder="Alternate number"
                    style={{ width: "46.5%", color: "#fff", fontSize: 16 }}
                    keyboardType="number-pad"
                    placeholderColor="#fff"
                    text={alterphone}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "alterphone")
                    }
                  />
                </View>
                <View style={styles.signupNamesView}>
                  <TextInput
                    placeholder="Password"
                    style={{ width: "46.5%", color: "#fff", fontSize: 16 }}
                    secureTextEntry={true}
                    placeholderColor="#fff"
                    text={password}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "pass")
                    }
                  />
                  <TextInput
                    placeholder="Confirm Password"
                    style={{ width: "46.5%", color: "#fff", fontSize: 16 }}
                    secureTextEntry={true}
                    placeholderColor="#fff"
                    text={confirmpass}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "confirmpass")
                    }
                  />
                </View>
                <View style={styles.signupNamesView}>
                  {error && (
                    <Text style={{ fontSize: 14, color: "#fff" }}>
                      * {error}
                    </Text>
                  )}
                </View>
                <View style={{ ...styles.signupNamesView, marginTop: 15 }}>
                  <Button
                    title="Discard"
                    color={colors.secondary}
                    onPress={() => navigation.goBack()}
                  />
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Button
                      title="Sign up"
                      color={colors.primary}
                      onPress={signupClickedHandler}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  signupOuterView: {
    margin: 10,
    justifyContent: "center",
    height: "100%",
  },
  signupInnerView: {
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    padding: 10,
  },
  signupNamesView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export const signupScreenOptions = () => {
  return {
    headerTitle: "Join Us",
  };
};

export default SignupScreen;
