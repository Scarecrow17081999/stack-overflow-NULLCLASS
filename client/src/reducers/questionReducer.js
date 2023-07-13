import * as constants from "../constants";
const initialState = {
  question: null,
  questions: null,
  loading: false,
  message: null,
  error: null,
};
const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ASK_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.ASK_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };
    case constants.ASK_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case constants.FETCH_ALL_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.FETCH_ALL_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: action.payload,
      };
    case constants.FETCH_ALL_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case constants.DELETE_QUESTION_REQUEST:
    case constants.FETCH_SINGLE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.DELETE_QUESTION_SUCCESS:
    case constants.FETCH_SINGLE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        question: action.payload,
      };
    case constants.DELETE_QUESTION_FAILURE:
    case constants.FETCH_SINGLE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default questionReducer;
