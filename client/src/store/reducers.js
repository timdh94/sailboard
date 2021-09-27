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

const listings = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_LISTINGS': 
      return [
        ...action.payload
      ];
    case 'ADD_USER_LISTING':
      return [
        action.payload,
        ...state
      ];
    case 'REMOVE_USER_LISTING':
      return [
        state.filter(({ id }) => id !== action.payload)
      ];
    default: return state;
  }
};

const bids = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_BIDS':
      return [
        ...action.payload
      ];
    default: return state;
  }
};

const reducers = combineReducers({
  auth,
  collection,
  listings,
  bids,
});

export default reducers;