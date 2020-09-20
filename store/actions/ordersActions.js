export const GET_ORDERS_START = "GET_ORDERS_START";
export const GET_ORDERS_SUCCESS = "GET_ORDERS_SUCCESS";
export const GET_ORDERS_FAIL = "GET_ORDERS_FAIL";

export const getOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: GET_ORDERS_START });
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://general-traders.firebaseio.com/orders/${userId}.json`
      );
      const ordersObject = await response.json();
      let ordersArray = [];
      for (let key in ordersObject) {
        ordersArray.push(ordersObject[key]);
      }
      dispatch({ type: GET_ORDERS_SUCCESS, payload: ordersArray });
    } catch (error) {
      dispatch({ type: GET_ORDERS_FAIL, payload: error });
    }
  };
};
