import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { createEpicMiddleware } from "redux-observable";

// redux-observer dependencies
import RestHelper from "../utils/RestHelper";
import appConfig from "../appConfig";

//reducers
import AuthenticationReducer from "./reducers/AuthenticationReducer";

//epics
import { authenticationEpic } from "./epics/AuthenticationEpic";

const reducers = {
  auth: AuthenticationReducer,
};

const appReducers = combineReducers(reducers);

const authEpicMiddleWare = createEpicMiddleware({
  dependencies: {
    rest: RestHelper,
    appConfig: appConfig,
  },
});

const middlewares = [authEpicMiddleWare];

const runMiddleWares = () => {
  authEpicMiddleWare.run(authenticationEpic);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

runMiddleWares();

export default store;
