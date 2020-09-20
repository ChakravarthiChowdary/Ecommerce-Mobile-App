import AsyncStorage from "@react-native-community/async-storage";

export const GET_CART_START = "GET_CART_START";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAIL = "GET_CART_FAIL";

export const DELETE_CART = "DELETE_CART";

export const ADD_TO_CART_START = "ADD_TO_CART_START";
export const ADD_TO_CART_SUCCESS = "ADD_TO_CART_SUCCESS";
export const ADD_TO_CART_FAIL = "ADD_TO_CART_FAIL";

export const CHECK_OUT_START = "CHECK_OUT_START";
export const CHECK_OUT_SUCCESS = "CHECK_OUT_SUCCESS";
export const CHECK_OUT_FAIL = "CHECK_OUT_FAIL";

export const CLEAR_CART = "CLEAR_CART";

export const getCart = () => {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      dispatch({ type: GET_CART_START });
      const response = await fetch(
        `https://general-traders.firebaseio.com/cart/${userId}.json`
      );
      const cartObject = await response.json();
      let cartArray = [];
      for (let key in cartObject) {
        cartArray.push(cartObject[key]);
      }
      dispatch({ type: GET_CART_SUCCESS, payload: cartArray });
    } catch (error) {
      dispatch({ type: GET_CART_FAIL, payload: error });
    }
  };
};

export const deleteCartItem = (cartId) => {
  return async (dispatch) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      await fetch(
        `https://general-traders.firebaseio.com/cart/${userId}/${cartId}.json`,
        {
          method: "DELETE",
        }
      );
      dispatch({ type: DELETE_CART, payload: cartId });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addToCart = (cartItem, quantity) => {
  return async (dispatch, getState) => {
    try {
      const userId = getState().auth.userId;
      const cartProduct = getState().cart.cart.find(
        (product) => product.id === cartItem.id
      );
      if (cartProduct) {
        cartItem.quantity = quantity + parseInt(cartProduct.quantity, 10);
      } else {
        cartItem.quantity = quantity;
      }

      dispatch({ type: ADD_TO_CART_START });
      await fetch(
        `https://general-traders.firebaseio.com/cart/${userId}/${cartItem.id}.json`,
        { method: "PATCH", body: JSON.stringify(cartItem) }
      );
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: cartItem });
    } catch (error) {
      dispatch({ type: ADD_TO_CART_FAIL, payload: error });
    }
  };
};

const randomStr = (len, arr) => {
  let ans = "";
  for (var i = len; i > 0; i--) {
    ans += arr[Math.floor(Math.random() * arr.length)];
  }
  return ans;
};

export const checkOutCart = (cartProducts, totalPrice, orderDetails) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: CHECK_OUT_START });
      const id = randomStr(8, "12345abcde");
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      const orderItem = {
        cartProducts,
        totalPrice,
        id: id.toString(),
        expectedDelivery: currentDate,
        orderDetails,
      };
      const userId = getState().auth.userId;
      await fetch(
        `https://general-traders.firebaseio.com/orders/${userId}/o${id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(orderItem),
        }
      );
      await fetch(
        `https://general-traders.firebaseio.com/cart/${userId}.json`,
        { method: "DELETE" }
      );
      dispatch({ type: CLEAR_CART });
      dispatch({ type: CHECK_OUT_SUCCESS, payload: orderItem });
    } catch (error) {
      dispatch({ type: CHECK_OUT_FAIL, payload: error });
    }
  };
};
