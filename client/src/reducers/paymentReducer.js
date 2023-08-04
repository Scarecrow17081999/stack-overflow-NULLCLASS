import * as constants from "../constants";

const initialState = {
  success: null,
  message: null,
  loading: false,
  payment: null,
};
const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_MY_PLAN_REQUEST:
    case constants.PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.GET_MY_PLAN_SUCCESS:
    case constants.PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
      };
    case constants.GET_MY_PLAN_FAILURE:
    case constants.PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default paymentReducer;
