import { combineReducers } from "redux";

const initialSignedIn = false;

const signIn = (state = initialSignedIn, action) => {
  switch(action.type) {
    default: return state;
  }
};

const reducers = combineReducers({
  signIn
});

export default reducers;