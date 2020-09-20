import {
  ADD_TO_CART_FAIL,
  ADD_TO_CART_START,
  ADD_TO_CART_SUCCESS,
  CLEAR_CART,
  DELETE_CART,
  GET_CART_FAIL,
  GET_CART_START,
  GET_CART_SUCCESS,
} from "../actions/cartActions";
import stateUpdate from "../../utils/stateUpdate";
import { LOG_OUT } from "../actions/authActions";

const initialState = {
  loading: false,
  error: null,
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_START:
      return stateUpdate(state, { loading: true });
    case GET_CART_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        error: null,
        cart: action.payload,
      });
    case GET_CART_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case LOG_OUT:
      return stateUpdate(state, { initialState });
    case DELETE_CART:
      const updCartAfterDel = state.cart.filter(
        (cart) => cart.id !== action.payload
      );
      return stateUpdate(state, { cart: updCartAfterDel });
    case ADD_TO_CART_START:
      return stateUpdate(state, { loading: true });
    case ADD_TO_CART_SUCCESS:
      let addedCart = state.cartProducts.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      addedCart = addedCart.concat(action.payload);
      return stateUpdate(state, {
        cart: addedCart,
        loading: false,
        error: null,
      });
    case ADD_TO_CART_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case CLEAR_CART:
      return stateUpdate(state, { cart: [] });
    default:
      return state;
  }
};

export default cartReducer;
