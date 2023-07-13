import * as constants from "../constants";

const initialState = {
  user: null,

  loading: false,
  message: null,
};
const getMyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_MY_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_MY_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case constants.GET_MY_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default getMyProfileReducer;
