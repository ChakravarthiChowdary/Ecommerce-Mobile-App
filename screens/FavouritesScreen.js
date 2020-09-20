import React, { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Product from "../components/Product";
import Loading from "../components/Loading";
import Text from "../components/Text";
import { getFavouriteProducts } from "../store/actions/productsActions";
import NoProducts from "../components/NoProducts";

const FavouritesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const favouriteProducts = useSelector(
    (state) => state.products.favouriteProducts
  );
  const loading = useSelector((state) => state.products.loading);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (favouriteProducts.length < 1) dispatch(getFavouriteProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading size={32} />;
  }

  if (favouriteProducts.length < 1) {
    return (
      <NoProducts
        message="No favourite products found ! Add some."
        style={{ flex: 1, margin: 10 }}
        navigation={navigation}
        route="Home"
      />
    );
  }
  return (
    <View>
      <FlatList
        data={favouriteProducts}
        renderItem={(itemData) => (
          <Product
            item={itemData.item}
            navigation={navigation}
            userId={userId}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  favNoProductsView: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavouritesScreen;
