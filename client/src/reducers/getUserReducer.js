import * as constants from "../constants";

const initialState = {
  user: null,
  users: null,
  loading: false,
  message: null,
};
const getUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.USER_PROFILE_SUCCESS:
      return action.payload;
    case constants.USER_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case constants.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case constants.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getUserReducer;
