import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Keyboard,
  Button,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Avatar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import { colors } from "../constants/Colors";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { updateProfile } from "../store/actions/profileUpdateActions";
const image = require("../assets/images/signin.jpg");

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const loading = useSelector((state) => state.profile.loading);
  const [firstname, setFirstname] = useState("");
  const [fixedFirstName, setFixedFirstName] = useState("");
  const [fixedLastName, setFixedLastName] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [alterphone, setAlterphone] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [error, setError] = useState(null);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(() => {
    if (userData) {
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setFixedFirstName(userData.firstname);
      setFixedLastName(userData.lastname);
      setAddress(userData.address);
      setAge(userData.age);
      setAddress(userData.address);
      setPhone(userData.phone);
      setAlterphone(userData.alternatephone);
      setEmail(userData.email);
    }
  }, [userData]);

  const saveClickedHandler = () => {
    if (
      userData.firstname !== firstname ||
      userData.lastname !== lastname ||
      userData.age !== age ||
      userData.address !== address ||
      userData.phone !== phone ||
      userData.alternatephone !== alterphone
    ) {
      if (
        firstname !== "" &&
        lastname !== "" &&
        age !== "" &&
        address !== "" &&
        phone !== "" &&
        alterphone !== ""
      ) {
        if (phone === alterphone) {
          setError("Phone and alternate phone should be different!");
        } else {
          const updatedData = {
            firstname: firstname,
            lastname: lastname,
            age: age,
            address: address,
            phone: phone,
            email: email,
            alternatephone: alterphone,
          };
          dispatch(updateProfile(updatedData));
        }
      } else {
        setError("Mandatory Fields cannot be left blank!");
      }
    } else {
      setError("Nothing changed!");
    }
  };

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
        let age = parseInt(text, 10);
        if (age > 100) {
          age = 100;
          setAge(age.toString());
        } else setAge(text);
        break;
      case "address":
        setAddress(text);
        break;
      case "phone":
        if (text.length > 10) {
          setPhone("");
        } else {
          setPhone(text);
        }
        break;
      case "alterphone":
        if (text.length > 10) {
          setAlterphone("");
        } else {
          setAlterphone(text);
        }
        break;
    }
  };

  return (
    <ImageBackground source={image} style={styles.image}>
      <View
        style={{
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            <View style={styles.profileAvatarView}>
              <Avatar.Text
                size={64}
                label={
                  fixedFirstName.slice(0, 1).toUpperCase() +
                  fixedLastName.slice(0, 1).toUpperCase()
                }
                color="#fff"
                style={{ backgroundColor: colors.accent }}
              />
            </View>
            <View style={styles.profileNameView}>
              <Text
                style={{
                  fontFamily: "RobotoBold",
                  color: "#fff",
                  fontSize: 20,
                }}
              >{`${
                fixedFirstName.charAt(0).toUpperCase() + fixedFirstName.slice(1)
              } ${
                fixedLastName.charAt(0).toUpperCase() + fixedLastName.slice(1)
              }`}</Text>
            </View>
            <View style={styles.profileInputView}>
              <View style={styles.profileInputRowView}>
                <View style={{ width: "46.5%" }}>
                  <Text style={styles.profileInputText}>First name</Text>
                  <TextInput
                    text={firstname}
                    style={styles.profileInput}
                    editable={isSwitchOn}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "fname")
                    }
                  />
                </View>
                <View style={{ width: "46.5%" }}>
                  <Text style={styles.profileInputText}>Last name</Text>
                  <TextInput
                    text={lastname}
                    style={styles.profileInput}
                    editable={isSwitchOn}
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "lname")
                    }
                  />
                </View>
              </View>
              <View style={styles.profileInputRowView}>
                <View style={{ width: "20%" }}>
                  <Text style={styles.profileInputText}>Age</Text>
                  <TextInput
                    text={age}
                    style={styles.profileInput}
                    editable={isSwitchOn}
                    keyboardType="number-pad"
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "age")
                    }
                  />
                </View>
                <View style={{ width: "73%" }}>
                  <Text style={styles.profileInputText}>Email</Text>
                  <TextInput
                    text={email}
                    style={styles.profileInput}
                    editable={false}
                  />
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.profileInputText}>Address</Text>
                <TextInput
                  text={address}
                  style={{
                    fontFamily: "RobotoRegular",
                    fontSize: 18,
                    color: "#fff",
                  }}
                  multiline={true}
                  editable={isSwitchOn}
                  textChangedHandler={(text) =>
                    inputChangedHandler(text, "address")
                  }
                />
              </View>
              <View style={styles.profileInputRowView}>
                <View style={{ width: "46.5%" }}>
                  <Text style={styles.profileInputText}>Phone</Text>
                  <TextInput
                    text={phone}
                    style={styles.profileInput}
                    editable={isSwitchOn}
                    keyboardType="number-pad"
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "phone")
                    }
                  />
                </View>
                <View style={{ width: "46.5%" }}>
                  <Text style={styles.profileInputText}>Alternate Phone</Text>
                  <TextInput
                    text={alterphone}
                    style={styles.profileInput}
                    editable={isSwitchOn}
                    keyboardType="number-pad"
                    textChangedHandler={(text) =>
                      inputChangedHandler(text, "alterphone")
                    }
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <TouchableOpacity>
                    <Text
                      style={{ color: "#fff" }}
                      onPress={() =>
                        navigation.navigate("changepassword", {
                          userData: userData,
                        })
                      }
                    >
                      Change Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      ...styles.profileInputText,
                      marginRight: 10,
                      fontSize: 18,
                    }}
                  >
                    Edit Profile
                  </Text>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={onToggleSwitch}
                    color={colors.primary}
                  />
                </View>
              </View>

              {isSwitchOn && (
                <View>
                  {error ? (
                    <View style={{ marginVertical: 10 }}>
                      <Text style={{ color: "#fff", fontSize: 16 }}>
                        * {error}
                      </Text>
                    </View>
                  ) : null}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                    }}
                  >
                    <View style={{ width: "30%" }}>
                      <Button
                        title="Discard"
                        color={colors.secondary}
                        onPress={onToggleSwitch}
                      />
                    </View>

                    <View style={{ width: "30%" }}>
                      {loading ? (
                        <ActivityIndicator />
                      ) : (
                        <Button
                          title="Save"
                          color={colors.primary}
                          onPress={saveClickedHandler}
                        />
                      )}
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
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
  profileAvatarView: {
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  profileNameView: {
    alignItems: "center",
    width: "100%",
  },
  profileInputView: {
    margin: 20,
  },
  profileInputRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  profileInput: {
    width: "100%",
    fontFamily: "RobotoRegular",
    fontSize: 18,
    color: "#fff",
  },
  profileInputText: {
    color: "#fff",
    fontSize: 16,
  },
});

export const profileScreenOptions = (navData) => {
  return {
    headerTitle: "My Profile",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-menu"
          iconSize={23}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

export default ProfileScreen;
