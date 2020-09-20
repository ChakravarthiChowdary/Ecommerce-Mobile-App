import AsyncStorage from "@react-native-community/async-storage";

//action types for getting products
export const GET_PRODUCTS_START = "GET_PRODUCTS_START";
export const GET_PRODUCTS_SUCCESS = "GET_PRODUCTS_SUCCESS";
export const GET_PRODUCTS_FAIL = "GET_PRODUCTS_FAIL";

//action types for getting favourite products
export const GET_FAVOURITES_START = "GET_FAVOURITES_START";
export const GET_FAVOURITES_SUCCESS = "GET_FAVOURITES_SUCCESS";
export const GET_FAVOURITES_FAIL = "GET_FAVOURITES_FAIL";

export const REMOVE_FROM_FAVOURITES = "REMOVE_FROM_FAVOURITES";
export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (userId) {
        await dispatch(getFavouriteProducts());
      }
      dispatch({ type: GET_PRODUCTS_START });
      const response = await fetch(
        "https://general-traders.firebaseio.com/products.json"
      );
      const productsObject = await response.json();
      let productsArray = [];
      for (let key in productsObject) {
        productsArray.push(productsObject[key]);
      }
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: productsArray });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_FAIL, payload: error });
    }
  };
};

export const getFavouriteProducts = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_FAVOURITES_START });
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://general-traders.firebaseio.com/favourites/${userId}.json`
      );
      const favouritesObject = await response.json();
      let favouritesArray = [];
      for (let key in favouritesObject) {
        favouritesArray.push(favouritesObject[key]);
      }
      dispatch({ type: GET_FAVOURITES_SUCCESS, payload: favouritesArray });
    } catch (error) {
      dispatch({ type: GET_FAVOURITES_FAIL, payload: error });
    }
  };
};

export const removeFromFavourites = (favId) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      dispatch({ type: REMOVE_FROM_FAVOURITES, payload: favId });
      await fetch(
        `https://general-traders.firebaseio.com/favourites/${userId}/${favId}.json`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToFavourites = (favProduct) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      dispatch({ type: ADD_TO_FAVOURITES, payload: favProduct });
      await fetch(
        `https://general-traders.firebaseio.com/favourites/${userId}/${favProduct.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(favProduct),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};
