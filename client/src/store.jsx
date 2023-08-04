import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./reducers/index";
const store = createStore(Reducers, compose(applyMiddleware(thunk)));
export default store;
