import { combineReducers } from "redux";

const initialState = {
  isAuthenticated: false,
  userInfo: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null
      }
    default: return state;
  }
};

const collection = (state = [], action) => {
  switch (action.type) {
    case 'SET_BOARDS': 
    return [
      ...state,
      ...action.payload
    ];
    case 'ADD_BOARD': 
    return [
      ...state,
      action.payload
    ];
    case 'DELETE_BOARD':
      return state.filter(({ id }) => id !== action.payload)
    default: return state;
  }
}

const reducers = combineReducers({
  auth,
  collection
});

export default reducers;