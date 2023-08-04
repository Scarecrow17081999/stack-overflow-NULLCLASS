import axios from "axios";
const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("Profile")) {
//     req.headers.authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("Profile")).token
//     }`;
//   }
//   return req;
// });

// user //
export const login = (data) => API.post(`/login`, data);
export const logout = () => API.get(`/logout`);
export const getAllUsers = () => API.get(`/users`);
export const getMyProfile = () => API.get(`/me`);
export const updateProfile = (updateData) =>
  API.put(`/update/profile`, updateData);
export const signUp = (data) => API.post(`/register`, data);
// questions//
export const postQuestion = (data) => API.post(`/question`, data);
export const getAllQuestions = () => API.get(`/question`);
export const getSingleQuestion = (id) => API.get(`/question/${id}`);
export const deleteQuestion = (id) => API.delete(`/question/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/question/vote/${id}`, { value, userId });
// answers //
export const deleteAnswer = (id, answerData) =>
  API.patch(`/delete/${id}`, answerData);
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/${id}`, { noOfAnswers, answerBody, userAnswered });

export const payment = (data) => API.post(`/pay`, data);
export const getMyPlan = (id) => API.get(`/pay`, id);
