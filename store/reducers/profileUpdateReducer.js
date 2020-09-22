import {
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
} from "../actions/profileUpdateActions";
import stateUpdate from "../../utils/stateUpdate";

const initialState = {
  loading: false,
  error: null,
};

const profileUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_START:
      return stateUpdate(state, { loading: true });
    case UPDATE_PROFILE_SUCCESS:
      return stateUpdate(state, { loading: false, error: null });
    case UPDATE_PROFILE_FAIL:
      return stateUpdate(state, { loading: false, error: action.payload });
    default:
      return state;
  }
};

export default profileUpdateReducer;
