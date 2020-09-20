import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";

import { DrawerNavigator } from "./Navigator";

const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <NavigationContainer>
      <DrawerNavigator token={token} />
    </NavigationContainer>
  );
};

export default AppNavigator;
