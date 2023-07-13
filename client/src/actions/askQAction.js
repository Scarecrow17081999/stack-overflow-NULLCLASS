import * as constants from "../constants";
import * as api from "../api";

export const askQuestion = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: constants.ASK_QUESTION_REQUEST });
    const { data } = await api.postQuestion(userData);
    dispatch({ type: constants.ASK_QUESTION_SUCCESS, payload: data.user });
    dispatch(getAllQuestion());
    navigate("/");
  } catch (error) {
    dispatch({
      type: constants.ASK_QUESTION_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const getAllQuestion = () => async (dispatch) => {
  try {
    dispatch({ type: constants.FETCH_ALL_QUESTIONS_REQUEST });
    const { data } = await api.getAllQuestions();
    dispatch({
      type: constants.FETCH_ALL_QUESTIONS_SUCCESS,
      payload: data.questions,
    });
  } catch (error) {
    dispatch({
      type: constants.FETCH_ALL_QUESTIONS_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const postAnswer = (answerData) => async (dispatch) => {
  const { id, noOfAnswers, answerBody, userAnswered } = answerData;
  try {
    dispatch({ type: constants.POST_ANSWER_REQUEST });
    const { data } = await api.postAnswer(
      id,
      noOfAnswers,
      answerBody,
      userAnswered
    );
    dispatch({
      type: constants.POST_ANSWER_SUCCESS,
      payload: data.updatedQuestion,
    });
    dispatch(getAllQuestion());
  } catch (error) {
    dispatch({
      type: constants.POST_ANSWER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const getQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.FETCH_SINGLE_QUESTION_REQUEST });
    const { data } = await api.getSingleQuestion(id);

    dispatch({
      type: constants.FETCH_SINGLE_QUESTION_SUCCESS,
      payload: data.question,
    });
  } catch (error) {
    dispatch({
      type: constants.FETCH_SINGLE_QUESTION_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const deleteQuestion = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.DELETE_QUESTION_REQUEST });
    const { data } = await api.deleteQuestion(id);

    dispatch({
      type: constants.DELETE_QUESTION_SUCCESS,
      payload: data.question,
    });
  } catch (error) {
    dispatch({
      type: constants.DELETE_QUESTION_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteAnswer = (id, answerData) => async (dispatch) => {
  try {
    dispatch({ type: constants.DELETE_ANSWER_REQUEST });
    const { data } = await api.deleteAnswer(id, answerData);
    dispatch({
      type: constants.DELETE_ANSWER_SUCCESS,
      payload: data.updatedQuestion,
    });
    dispatch(getAllQuestion());
  } catch (error) {
    dispatch({
      type: constants.DELETE_ANSWER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try {
    dispatch({ type: constants.VOTE_QUESTION_REQUEST });
    const { data } = await api.voteQuestion(id, value, userId);
    dispatch({
      type: constants.VOTE_QUESTION_SUCCESS,
      payload: data.question,
    });
    console.log(data);
    dispatch(getAllQuestion());
  } catch (error) {
    console.log(error);
    dispatch({
      type: constants.VOTE_QUESTION_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
