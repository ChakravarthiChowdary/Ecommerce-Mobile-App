import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { Searchbar } from "react-native-paper";

import HeaderButton from "../components/HeaderButton";
import { getProducts } from "../store/actions/productsActions";
import Product from "../components/Product";
import { autoSignIn, logOut } from "../store/actions/authActions";
import Loading from "../components/Loading";
import { colors } from "../constants/Colors";

const HomeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.products.loading);
  const userName = useSelector((state) =>
    state.auth.userData
      ? state.auth.userData.firstname
      : "Guest! Please Sign In"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const logoutFunc = async () => {
    await dispatch(logOut());
    dispatch(getProducts());
    navigation.navigate("Home", {
      isLogOut: false,
    });
  };

  if (route.params) {
    route.params.isLogOut ? logoutFunc() : null;
  }

  useEffect(() => {
    const load = async () => {
      await dispatch(autoSignIn());
      dispatch(getProducts());
    };
    load();
  }, [dispatch]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        !token ? (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="md-person"
              iconSize={23}
              onPress={() => navigation.navigate("Auth")}
            />
          </HeaderButtons>
        ) : (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              iconName="md-heart"
              iconSize={23}
              onPress={() => navigation.navigate("Favourites")}
            />
            <Item
              iconName="md-cart"
              iconSize={23}
              onPress={() => navigation.navigate("Cart")}
            />
          </HeaderButtons>
        ),
    });
  }, [token]);

  if (loading) {
    return <Loading size={32} />;
  }

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <View>
      <View style={styles.homeSeachBar}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          iconColor={colors.primary}
        />
      </View>

      <FlatList
        data={filteredProducts}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={(itemData) => (
          <Product
            item={itemData.item}
            userId={userId}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeWelcomeView: {
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
    padding: 10,
  },
  homeSeachBar: { margin: 10 },
});

export const homeScreenOptions = (navData) => {
  return {
    headerTitle: "Online Shop",
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

export default HomeScreen;
