import {
  GET_ORDERS_FAIL,
  GET_ORDERS_START,
  GET_ORDERS_SUCCESS,
} from "../actions/ordersActions";
import stateUpdate from "../../utils/stateUpdate";
import {
  CHECK_OUT_FAIL,
  CHECK_OUT_START,
  CHECK_OUT_SUCCESS,
} from "../actions/cartActions";

const initialState = {
  loading: false,
  orders: [],
  error: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_START:
      return stateUpdate(state, { loading: true });
    case GET_ORDERS_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        orders: action.payload,
        error: null,
      });
    case GET_ORDERS_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case CHECK_OUT_START:
      return stateUpdate(state, { loading: true });
    case CHECK_OUT_SUCCESS:
      const updatedOrders = state.orders.concat(action.payload);
      return stateUpdate(state, {
        loading: false,
        error: null,
        orders: updatedOrders,
      });
    case CHECK_OUT_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default ordersReducer;
