import AsyncStorage from "@react-native-community/async-storage";

export const SIGNIN_START = "SIGNIN_START";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAIL = "SIGNIN_FAIL";

export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

export const LOG_OUT = "LOG_OUT";

export const AUTO_LOGIN = "AUTO_LOGIN";

export const signInUser = (authInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNIN_START });
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTMjfNNwKdj_NPx19SD_Q3p0kuDv5z62g",
        {
          method: "POST",
          body: JSON.stringify(authInfo),
        }
      );
      const authRes = await response.json();
      if (!authRes.error) {
        dispatch({ type: SIGNIN_SUCCESS, payload: authRes });
        dispatch(getUser(authRes.localId));
        await AsyncStorage.setItem("userId", authRes.localId);
        await AsyncStorage.setItem("tokenId", authRes.idToken);
      } else dispatch({ type: SIGNIN_FAIL, payload: authRes.error });
    } catch (error) {
      dispatch({ type: SIGNIN_FAIL, payload: error });
    }
  };
};

export const autoSignIn = () => {
  return async (dispatch) => {
    try {
      const tokenId = await AsyncStorage.getItem("tokenId");
      const userId = await AsyncStorage.getItem("userId");
      let userData = await AsyncStorage.getItem("userInfo");
      userData = JSON.parse(userData);
      await dispatch({ type: AUTO_LOGIN, payload: { tokenId, userId } });
      await dispatch({ type: ADD_USER_SUCCESS, payload: userData });
    } catch (error) {
      throw new error();
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("tokenId");
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userInfo");
    dispatch({ type: LOG_OUT });
  };
};

export const signUpUser = (authInfo, userInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SIGNIN_START });
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTMjfNNwKdj_NPx19SD_Q3p0kuDv5z62g",
        {
          method: "POST",
          body: JSON.stringify(authInfo),
        }
      );
      const authRes = await response.json();
      if (!authRes.error) {
        await AsyncStorage.setItem("userId", authRes.localId);
        await AsyncStorage.setItem("tokenId", authRes.idToken);
        dispatch({ type: SIGNIN_SUCCESS, payload: authRes });
        dispatch(addUser(userInfo, authRes.localId));
      } else dispatch({ type: SIGNIN_FAIL, payload: authRes.error });
    } catch (error) {
      dispatch({ type: SIGNIN_FAIL, payload: error });
    }
  };
};

export const addUser = (userInfo, userId) => {
  return async (dispatch) => {
    await fetch(`https://general-traders.firebaseio.com/users/${userId}.json`, {
      method: "PATCH",
      body: JSON.stringify(userInfo),
    });
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    dispatch({ type: ADD_USER_SUCCESS, payload: userInfo });
  };
};

export const getUser = (userId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://general-traders.firebaseio.com/users/${userId}.json`
    );
    const userData = await response.json();
    await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
    dispatch({ type: ADD_USER_SUCCESS, payload: userData });
  };
};
