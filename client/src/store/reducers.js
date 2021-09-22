import { combineReducers } from "redux";

const initialIsAuthenticated = false;
const intialUserInfo = {};

const isAuthenticated = (state = initialIsAuthenticated, action) => {
  switch(action.type) {
    case 'SET_AUTH': {
      state = action.status;
      return state;
    }
    default: return state;
  };
};

const setUserInfo = (state = intialUserInfo, action) => {
  switch(action.type) {
    default: return state;
  };
}

const reducers = combineReducers({
  isAuthenticated,
  setUserInfo,
});

export default reducers;