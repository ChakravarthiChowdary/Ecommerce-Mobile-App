import {
  SIGNIN_FAIL,
  SIGNIN_START,
  SIGNIN_SUCCESS,
  LOG_OUT,
  AUTO_LOGIN,
  ADD_USER_SUCCESS,
} from "../actions/authActions";
import stateUpdate from "../../utils/stateUpdate";
import { UPDATE_PROFILE_SUCCESS } from "../actions/profileUpdateActions";

const initialState = {
  loading: false,
  token: null,
  error: null,
  userId: null,
  userData: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_START:
      return stateUpdate(state, { loading: true });
    case SIGNIN_SUCCESS:
      return stateUpdate(state, {
        loading: false,
        token: action.payload.idToken,
        userId: action.payload.localId,
        error: null,
      });
    case SIGNIN_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    case LOG_OUT:
      return stateUpdate(state, { token: null, userId: null, userData: null });
    case AUTO_LOGIN:
      return stateUpdate(state, {
        token: action.payload.tokenId,
        userId: action.payload.userId,
      });
    case ADD_USER_SUCCESS:
      return stateUpdate(state, {
        userData: action.payload,
      });
    case UPDATE_PROFILE_SUCCESS:
      return stateUpdate(state, { userData: action.payload });
    default:
      return state;
  }
};

export default authReducer;
