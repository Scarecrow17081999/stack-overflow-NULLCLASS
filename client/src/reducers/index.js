import { combineReducers } from "redux";
import authReducer from "./authReducer";
import getUserReducer from "./getUserReducer";
import questionReducer from "./questionReducer";
import answerReducer from "./answerReducer";
import getMyProfileReducer from "./myProfileReducer";
export default combineReducers({
  user: authReducer,
  getUser: getUserReducer,
  questions: questionReducer,
  answer: answerReducer,
  myProfile: getMyProfileReducer,
});
