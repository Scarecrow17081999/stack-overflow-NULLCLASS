import * as constants from "../constants";

const initialState = {
  user: null,
  loading: false,
  message: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.USER_LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case constants.USER_LOGIN_FAILURE:
    case constants.USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.USER_REGISTER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case constants.USER_REGISTER_FAILURE:
    case constants.USER_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.USER_LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case constants.USER_LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
