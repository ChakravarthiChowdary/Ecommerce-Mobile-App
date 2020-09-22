import { logOut } from "./authActions";
import { getProducts } from "./productsActions";

export const UPDATE_PROFILE_START = "UPDATE_PROFILE_START";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";

export const updateProfile = (userData) => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PROFILE_START });
      const userId = getState().auth.userId;
      await fetch(
        `https://general-traders.firebaseio.com/users/${userId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(userData),
        }
      );
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: userData });
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: error });
    }
  };
};

export const updatePassword = (password, userInfo) => {
  return async (dispatch, getState) => {
    try {
      authInfo = {
        idToken: getState().auth.token,
        returnSecureToken: true,
        password: password,
      };
      const userId = getState().auth.userId;
      dispatch({ type: UPDATE_PROFILE_START });
      const res = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDTMjfNNwKdj_NPx19SD_Q3p0kuDv5z62g`,
        {
          method: "POST",
          body: JSON.stringify(authInfo),
        }
      );
      const response = await res.json();
      if (response.error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: response.error[0] });
        return;
      }
      await fetch(
        `https://general-traders.firebaseio.com/users/${userId}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(userInfo),
        }
      );
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: userInfo });
      dispatch(logOut());
      dispatch(getProducts());
    } catch (error) {
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: error });
    }
  };
};
