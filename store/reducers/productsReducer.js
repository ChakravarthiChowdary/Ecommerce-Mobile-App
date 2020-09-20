import {
  ADD_TO_FAVOURITES,
  GET_FAVOURITES_FAIL,
  GET_FAVOURITES_START,
  GET_FAVOURITES_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_START,
  GET_PRODUCTS_SUCCESS,
  REMOVE_FROM_FAVOURITES,
} from "../actions/productsActions";
import { LOG_OUT } from "../actions/authActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  products: [],
  favouriteProducts: [],
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_START:
      return stateUpdate(state, { loading: true });
    case GET_PRODUCTS_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        error: null,
        products: action.payload,
      });
    case GET_PRODUCTS_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case GET_FAVOURITES_START:
      return stateUpdate(state, { loading: true });
    case GET_FAVOURITES_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        error: null,
        favouriteProducts: action.payload,
      });
    case GET_FAVOURITES_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case REMOVE_FROM_FAVOURITES:
      const updFavAfterDel = state.favouriteProducts.filter(
        (fav) => fav.id !== action.payload
      );
      return stateUpdate(state, { favouriteProducts: updFavAfterDel });
    case ADD_TO_FAVOURITES:
      const updFavAfterAdd = state.favouriteProducts.concat(action.payload);
      return stateUpdate(state, { favouriteProducts: updFavAfterAdd });
    case LOG_OUT:
      return stateUpdate(state, { favouriteProducts: [], products: [] });
    default:
      return state;
  }
};

export default productReducer;
