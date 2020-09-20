import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../constants/Colors";
import CartButton from "./Button";
import Text from "./Text";
import {
  addToFavourites,
  removeFromFavourites,
} from "../store/actions/productsActions";
import QuantityComponent from "./QuantityComponent";
import { addToCart } from "../store/actions/cartActions";

const Product = ({ item, userId, navigation }) => {
  const dispatch = useDispatch();
  let isFav = useSelector((state) =>
    state.products.favouriteProducts.find((fav) => fav.id === item.id)
  );

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const favClickedHandler = () => {
    if (userId) {
      if (isFav) {
        dispatch(removeFromFavourites(item.id));
      } else {
        dispatch(addToFavourites(item));
      }
    } else {
      navigation.navigate("Auth");
    }
    isFav = !isFav;
  };

  const cartClickedHandler = async () => {
    if (userId) {
      setLoading(true);
      await dispatch(addToCart(item, quantity));
      setLoading(false);
    } else {
      navigation.navigate("Auth");
    }
  };

  const quantitiChangedHandler = (text) => {
    text = parseInt(text, 10);
    if (text > 12) {
      setQuantity(12);
    } else {
      setQuantity(text);
    }
  };

  const plusClickedHandler = () => {
    if (quantity != 12) {
      setQuantity((prevState) => prevState + 1);
    }
  };

  const minusClickedHandler = () => {
    if (quantity != 1) {
      setQuantity((prevState) => prevState - 1);
    }
  };

  return (
    <View style={styles.product}>
      <Image
        source={{
          uri:
            item.imageURL !== ""
              ? item.imageURL
              : "https://unsplash.com/photos/DlZD4V2j9oM/800*600",
        }}
        style={styles.image}
      />
      <View style={styles.innerView}>
        <Text style={{ fontSize: 16, fontFamily: "RobotoBold" }}>
          {item.title}
        </Text>
        <View style={styles.price}>
          <Text style={styles.mrp}>MRP :₹{item.mrp}/-</Text>
          <Text style={{ fontSize: 16, fontFamily: "RobotoBold" }}>
            Our Price :₹{item.sellingprice}/-
          </Text>
        </View>
      </View>
      <View style={styles.buttonsView}>
        <View style={styles.buttons}>
          <Ionicons
            name={isFav ? "md-heart" : "md-heart-empty"}
            size={32}
            color={colors.secondary}
            onPress={favClickedHandler}
          />
          <QuantityComponent
            quantity={quantity.toString()}
            onChange={quantitiChangedHandler}
            plusClickedHandler={plusClickedHandler}
            minusClickedHandler={minusClickedHandler}
          />
          {loading ? (
            <ActivityIndicator />
          ) : (
            <CartButton
              title="CART"
              style={{ marginLeft: 10 }}
              iconComponent={<Ionicons name="md-cart" size={23} color="#fff" />}
              onPress={cartClickedHandler}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
    height: Dimensions.get("screen").height / 2.5,
    borderRadius: 15,
    overflow: "hidden",
  },
  price: {
    flexDirection: "row",
    marginVertical: 5,
  },
  mrp: {
    marginRight: 10,
    fontSize: 16,
    fontFamily: "RobotoBold",
  },
  image: {
    height: "60%",
    width: "100%",
  },
  innerView: {
    padding: 10,
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
  },
});

export default Product;
