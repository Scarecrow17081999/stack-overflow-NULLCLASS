import * as constants from "../constants";
import * as api from "../api";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.USER_PROFILE_SUCCESS,
      payload: JSON.parse(localStorage.getItem("user")),
    });
  } catch (error) {
    dispatch({
      type: constants.USER_REGISTER_FAILURE,
      payload: error,
    });
  }
};
export const getMyProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.GET_MY_PROFILE_REQUEST,
    });
    const { data } = await api.getMyProfile();
    dispatch({
      type: constants.GET_MY_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: constants.GET_MY_PROFILE_FAILURE,
      payload: error,
    });
  }
};
export const updateMyProfile = (profileData) => async (dispatch) => {
  try {
    dispatch({
      type: constants.UPDATE_PROFILE_REQUEST,
    });
    const { data } = await api.updateProfile(profileData);
    dispatch({
      type: constants.UPDATE_PROFILE_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: constants.UPDATE_PROFILE_FAILURE,
      payload: error,
    });
  }
};
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.GET_ALL_USERS_REQUEST,
    });

    const { data } = await api.getAllUsers();
    dispatch({
      type: constants.GET_ALL_USERS_SUCCESS,
      payload: data.users,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: constants.GET_ALL_USERS_FAILURE,
      payload: error,
    });
  }
};

export const login = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });
    const { data } = await api.login(userData);
    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data.user });
    dispatch(getUser());
    navigate("/");
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const logout = (navigate) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LOGOUT_REQUEST });
    const { data } = await api.logout();
    dispatch({ type: constants.USER_LOGOUT_SUCCESS, payload: data.message });
    dispatch(getUser());
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({
      type: constants.USER_LOGOUT_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
export const signUp = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_REGISTER_REQUEST });
    const { data } = await api.signUp(userData);
    dispatch({ type: constants.USER_REGISTER_SUCCESS, payload: data.user });
    dispatch(getUser());
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({
      type: constants.USER_REGISTER_FAILURE,
      payload: error?.response?.data?.message,
    });
  }
};
