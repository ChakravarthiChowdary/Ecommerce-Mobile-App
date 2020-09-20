import React, { useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { List } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import OrderItem from "../components/OrderItem";
import Loading from "../components/Loading";
import NoProducts from "../components/NoProducts";
import Error from "../components/Error";
import { getOrders } from "../store/actions/ordersActions";

const OrdersScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const cartLength = useSelector((state) => state.cart.cart.length);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const tryAgainClickedHandler = () => {
    dispatch(getOrders());
  };

  if (error) {
    return (
      <Error error={error} tryAgainClickedHandler={tryAgainClickedHandler} />
    );
  }

  if (orders.length < 1) {
    let route = "Cart";
    if (cartLength < 1) {
      route = "Home";
    }
    return (
      <NoProducts
        message="No currents orders found! Add Some."
        navigation={navigation}
        route={route}
        style={{ flex: 1, margin: 10 }}
      />
    );
  }
  return (
    <List.Section title="Your Orders">
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => <OrderItem order={itemData.item} />}
      />
    </List.Section>
  );
};

export const ordersScreenOptions = (navData) => {
  return {
    headerTitle: "Your Orders",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          iconName="md-cart"
          iconSize={23}
          onPress={() => navData.navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
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

export default OrdersScreen;
