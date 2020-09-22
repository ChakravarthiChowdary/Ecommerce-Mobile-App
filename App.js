import { useFonts } from "expo-font";
import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import AppNavigator from "./navigation/AppNavigator";
import authReducer from "./store/reducers/authReducer";
import cartReducer from "./store/reducers/cartReducer";
import ordersReducer from "./store/reducers/ordersReducer";
import productReducer from "./store/reducers/productsReducer";
import profileUpdateReducer from "./store/reducers/profileUpdateReducer";

const rootReducer = combineReducers({
  products: productReducer,
  auth: authReducer,
  cart: cartReducer,
  orders: ordersReducer,
  profile: profileUpdateReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  const [loaded] = useFonts({
    RobotoRegular: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
