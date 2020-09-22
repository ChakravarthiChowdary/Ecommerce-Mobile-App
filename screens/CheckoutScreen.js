import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Picker,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  View,
  Button,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "../components/TextInput";
import { colors } from "../constants/Colors";
import Text from "../components/Text";
import { checkOutCart } from "../store/actions/cartActions";
import { Checkbox } from "react-native-paper";
const image = require("../assets/images/signin.jpg");

const CheckoutScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  //redux state
  const orderError = useSelector((state) => state.orders.error);
  const loading = useSelector((state) => state.orders.loading);
  const userData = useSelector((state) => state.auth.userData);
  //component level state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [alternativePhone, setAlternativePhone] = useState("");
  const [addressMode, setAddressMode] = useState("home");
  const [defaultChecked, setDefaultChecked] = useState(false);

  const [error, setError] = useState(null);

  const inputChangedHandler = (text, field) => {
    let inputText = text;
    setError(null);
    if (field === "fname") {
      setFirstname(text);
    } else if (field === "lname") {
      setLastname(text);
    } else if (field === "age") {
      if (text !== "") inputText = parseInt(text, 10);
      else inputText = "";
      if (inputText > 100) {
        inputText = 99;
        setAge(inputText.toString());
      } else {
        setAge(inputText.toString());
      }
    } else if (field === "pnum") {
      if (inputText.length > 10) {
        inputText = "";
        setPhone(inputText.toString());
      } else {
        setPhone(inputText.toString());
      }
    } else if (field === "anum") {
      if (inputText.length > 10) {
        inputText = "";
        setAlternativePhone(inputText.toString());
      } else {
        setAlternativePhone(inputText.toString());
      }
    } else if (field === "address") {
      setAddress(text);
    }
  };

  const proceedClcikedHandler = async () => {
    if (
      firstname !== "" ||
      age !== "" ||
      address !== "" ||
      phone !== "" ||
      alternativePhone !== ""
    ) {
      if (phone.length < 10 || alternativePhone.length < 10) {
        setError("Invalid phone number");
      } else if (phone !== alternativePhone) {
        const orderDetails = {
          firstname: firstname,
          lastname: lastname,
          age: age,
          address: address,
          addressMode: addressMode,
          phone: phone,
          alternativePhone: alternativePhone,
        };

        await dispatch(
          checkOutCart(
            route.params.cartProducts,
            route.params.totalPrice,
            orderDetails
          )
        );
        if (orderError) {
          setError("Cannot place order! Try again later.");
        } else {
          navigation.replace("Home");
          navigation.navigate("OrdersStack");
        }
      } else {
        setError("Two phone numbers cannot be same!");
        setAlternativePhone("");
      }
    } else {
      setError("Mandatory fields cannot be left blank!");
    }
  };

  useEffect(() => {
    setError(null);
    if (defaultChecked) {
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setAge(userData.age);
      setAddress(userData.address);
      setPhone(userData.phone);
      setAlternativePhone(userData.alternatephone);
    } else {
      setFirstname("");
      setLastname("");
      setAge("");
      setAddress("");
      setPhone("");
      setAlternativePhone("");
    }
  }, [defaultChecked]);

  return (
    <ImageBackground source={image} style={styles.image}>
      <TouchableWithoutFeedback
        style={{ height: "100%" }}
        onPress={() => Keyboard.dismiss()}
      >
        <View style={{ height: "100%", backgroundColor: "rgba(0,0,0,0.6)" }}>
          <View style={styles.checkOutOuterView}>
            <View style={{ elevation: 5, padding: 10 }}>
              <View style={styles.checkoutPhoneAndNameView}>
                <TextInput
                  placeholder="First name"
                  style={styles.checkOutInput}
                  placeholderColor="#fff"
                  text={firstname}
                  textChangedHandler={(text) =>
                    inputChangedHandler(text, "fname")
                  }
                />
                <TextInput
                  placeholder="Last name"
                  style={styles.checkOutInput}
                  placeholderColor="#fff"
                  text={lastname}
                  textChangedHandler={(text) =>
                    inputChangedHandler(text, "lname")
                  }
                />
              </View>
              <View style={styles.checkOutAgeView}>
                <TextInput
                  placeholder="Age"
                  style={{ ...styles.checkOutInput, width: "20%" }}
                  keyboardType="number-pad"
                  placeholderColor="#fff"
                  text={age}
                  textChangedHandler={(text) =>
                    inputChangedHandler(text, "age")
                  }
                />
                <View style={styles.checkOutPickerView}>
                  <Picker
                    selectedValue={addressMode}
                    style={{ ...styles.checkOutInput, width: "100%" }}
                    onValueChange={(itemValue, itemIndex) =>
                      setAddressMode(itemValue)
                    }
                  >
                    <Picker.Item label="Home" value="home" />
                    <Picker.Item label="Office" value="office" />
                  </Picker>
                </View>
              </View>
              <TextInput
                placeholder="Address"
                multiline={true}
                style={{ ...styles.checkOutInput, width: "100%" }}
                placeholderColor="#fff"
                text={address}
                textChangedHandler={(text) =>
                  inputChangedHandler(text, "address")
                }
              />
              <View style={styles.checkoutPhoneAndNameView}>
                <TextInput
                  placeholder="Phone number"
                  keyboardType="number-pad"
                  style={styles.checkOutInput}
                  placeholderColor="#fff"
                  text={phone}
                  textChangedHandler={(text) =>
                    inputChangedHandler(text, "pnum")
                  }
                />
                <TextInput
                  placeholder="Alternate number"
                  keyboardType="number-pad"
                  style={styles.checkOutInput}
                  placeholderColor="#fff"
                  text={alternativePhone}
                  textChangedHandler={(text) =>
                    inputChangedHandler(text, "anum")
                  }
                />
              </View>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              {error ? (
                <Text style={{ color: "#fff", fontSize: 15 }}>* {error}</Text>
              ) : null}
            </View>

            <Checkbox.Item
              label="Use default address"
              labelStyle={{ fontFamily: "RobotoRegular", color: "#fff" }}
              color="#fff"
              onPress={() => setDefaultChecked((prevState) => !prevState)}
              status={defaultChecked ? "checked" : "unchecked"}
              uncheckedColor="#fff"
            />

            <View style={styles.checkoutButtonView}>
              <View style={{ width: "45%" }}>
                <Button
                  title="Discard"
                  color={colors.secondary}
                  onPress={() => navigation.goBack()}
                />
              </View>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <View style={{ width: "45%" }}>
                  <Button
                    title="Proceed"
                    color={colors.primary}
                    onPress={proceedClcikedHandler}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  checkOutOuterView: {
    margin: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flex: 1,
  },
  checkOutAgeView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  checkoutPhoneAndNameView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  checkOutInput: {
    height: 50,
    borderBottomColor: "#fff",
    width: "45%",
    color: "#fff",
    fontSize: 16,
  },
  checkoutButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  checkOutPickerView: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    width: "70%",
  },
});

export default CheckoutScreen;
