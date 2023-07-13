import * as constants from "../constants";
const initialState = {
  updatedQuestion: null,
  loading: false,
  message: null,
};
const answerReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.DELETE_ANSWER_REQUEST:
    case constants.POST_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.DELETE_ANSWER_SUCCESS:
    case constants.POST_ANSWER_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedQuestion: action.payload,
      };
    case constants.DELETE_ANSWER_FAILURE:
    case constants.POST_ANSWER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default answerReducer;
