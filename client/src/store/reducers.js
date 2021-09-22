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

const userInfo = (state = intialUserInfo, action) => {
  switch(action.type) {
    case 'SET_INFO': {
      return {
        ...state,
        ...action.userInfo
      }
    }
    default: return state;
  };
}

const reducers = combineReducers({
  isAuthenticated,
  userInfo,
});

export default reducers;