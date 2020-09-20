import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useDispatch } from "react-redux";

import { colors } from "../constants/Colors";
import { deleteCartItem } from "../store/actions/cartActions";

const CartItem = ({ cartProduct }) => {
  const dispatch = useDispatch();

  const deleteClickedHandler = () => {
    dispatch(deleteCartItem(cartProduct.id));
  };

  return (
    <View style={styles.cartItemOuterView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={{
            uri:
              cartProduct.imageURL !== ""
                ? cartProduct.imageURL
                : "https://unsplash.com/photos/DlZD4V2j9oM/800*600",
          }}
          style={styles.image}
        />
        <View>
          <Text style={{ fontFamily: "RobotoBold", marginLeft: 10 }}>
            {cartProduct.title}
          </Text>
          <Text style={{ fontFamily: "RobotoBold", marginLeft: 10 }}>
            Price : ₹{cartProduct.sellingprice}/-
          </Text>
          <Text style={{ fontFamily: "RobotoBold", marginLeft: 10 }}>
            Quantity : {cartProduct.quantity}
          </Text>
        </View>
      </View>
      <Ionicons
        name="md-trash"
        size={32}
        color={colors.secondary}
        onPress={deleteClickedHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemOuterView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
  },
  image: {
    height: 70,
    width: 70,
  },
});

export default CartItem;
