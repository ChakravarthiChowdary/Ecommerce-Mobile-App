import React, { Fragment } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../constants/Colors";
import HomeScreen from "../screens/HomeScreen";
import { homeScreenOptions } from "../screens/HomeScreen";
import OrdersScreen from "../screens/OrdersScreen";
import { ordersScreenOptions } from "../screens/OrdersScreen";
import AuthScreen from "../screens/AuthScreen";
import { authScreenOptions } from "../screens/AuthScreen";
import { Button, View } from "react-native";
import CartScreen from "../screens/CartScreen";
import { cartScreenOptions } from "../screens/CartScreen";
import SignupScreen from "../screens/SignupScreen";
import { signupScreenOptions } from "../screens/SignupScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import CheckoutScreen from "../screens/CheckoutScreen";

const defaultNavigationOptions = {
  headerTintColor: "#fff",
  headerStyle: {
    backgroundColor: colors.primary,
  },
};

const homeDrawerNavOptions = ({ navigation }) => {
  let color = "#000";
  if (navigation.isFocused()) {
    color = "#fff";
  } else {
    color = "#000";
  }
  return {
    drawerIcon: () => <Ionicons name="md-home" size={23} color={color} />,
    drawerLabel: "Home",
  };
};

const orderDrawerNavOptions = ({ navigation }) => {
  let color = "#000";
  if (navigation.isFocused()) {
    color = "#fff";
  }
  return {
    drawerIcon: () => <Ionicons name="md-basket" size={23} color={color} />,
    drawerLabel: "Orders",
  };
};
const Stack = createStackNavigator();

export const StackNavigator = ({ token }) => {
  return (
    <Stack.Navigator screenOptions={defaultNavigationOptions}>
      <Stack.Screen
        name="Home"
        initialParams={{ isLogOut: false }}
        component={HomeScreen}
        options={homeScreenOptions}
      />
      {!token ? (
        <Fragment>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={authScreenOptions}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={signupScreenOptions}
          />
        </Fragment>
      ) : (
        <Fragment>
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={cartScreenOptions}
          />
          <Stack.Screen name="Favourites" component={FavouritesScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen
            name="orders"
            component={OrdersScreen}
            options={ordersScreenOptions}
          />
        </Fragment>
      )}
    </Stack.Navigator>
  );
};

const OrdersStack = createStackNavigator();

const orderStackNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStack.Screen
        name="orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
      <OrdersStack.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
      <OrdersStack.Screen name="Checkout" component={CheckoutScreen} />
    </OrdersStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const drawerContent = (props, token) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {token ? (
        <View style={{ width: "92%", margin: 10 }}>
          <Button
            title="Logout"
            color={colors.secondary}
            onPress={() =>
              props.navigation.navigate("Home", { isLogOut: true })
            }
          />
        </View>
      ) : (
        <View style={{ width: "92%", margin: 10 }}>
          <View>
            <Button
              title="Sign Up"
              color={colors.accent}
              onPress={() => props.navigation.navigate("Signup")}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Button
              title="Sign In"
              color={colors.primary}
              onPress={() => props.navigation.navigate("Auth")}
            />
          </View>
        </View>
      )}
    </DrawerContentScrollView>
  );
};

export const DrawerNavigator = ({ token }) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => drawerContent(props, token)}
      drawerContentOptions={{
        activeBackgroundColor: colors.primary,
        activeTintColor: "#fff",
      }}
      drawerType="slide"
    >
      <Drawer.Screen name="drawerhome" options={homeDrawerNavOptions}>
        {() => <StackNavigator token={token} />}
      </Drawer.Screen>
      {token && (
        <Drawer.Screen
          name="OrdersStack"
          component={orderStackNavigator}
          options={orderDrawerNavOptions}
        />
      )}
    </Drawer.Navigator>
  );
};
