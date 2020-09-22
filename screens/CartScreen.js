import React, { useCallback, useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Text from "../components/Text";
import { colors } from "../constants/Colors";
import CartItem from "../components/CartItem";
import Loading from "../components/Loading";
import { getCart } from "../store/actions/cartActions";
import Error from "../components/Error";
import NoProducts from "../components/NoProducts";

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  const loadCartItems = useCallback(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    loadCartItems();
  }, [loadCartItems]);

  if (loading) return <Loading size={32} />;

  const tryAgainClickedHandler = () => {
    loadCartItems();
  };

  if (error)
    return (
      <Error error={error} tryAgainClickedHandler={tryAgainClickedHandler} />
    );

  let price = 0;
  if (cartProducts.length >= 1) {
    cartProducts.forEach((cartitem) => {
      price = price + cartitem.sellingprice * cartitem.quantity;
    });
  }

  const orderNowClickedHandler = () => {
    if (!(cartProducts.length < 1)) {
      navigation.navigate("Checkout", {
        cartProducts: cartProducts,
        totalPrice: price,
      });
    }
  };

  return (
    <View style={styles.cartOuterView}>
      <View style={styles.cartTotalOrderView}>
        <Text style={styles.cartTotalStyle}>Total: ₹{price}/-</Text>
        <Button
          title="Order now"
          color={colors.secondary}
          onPress={orderNowClickedHandler}
        />
      </View>
      {cartProducts.length < 1 ? (
        <NoProducts
          message="No products in cart ! Add some."
          navigation={navigation}
          route="Home"
        />
      ) : (
        <FlatList
          data={cartProducts}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={(itemData) => <CartItem cartProduct={itemData.item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cartTotalOrderView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    elevation: 5,
    backgroundColor: "#fff",
  },
  cartOuterView: {
    margin: 10,
  },
  cartTotalStyle: {
    fontFamily: "RobotoBold",
  },
});

export const cartScreenOptions = {
  headerTitle: "Your Cart",
};

export default CartScreen;
