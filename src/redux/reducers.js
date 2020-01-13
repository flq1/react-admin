import { combineReducers } from "redux";

function aaa(prevState = 2, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}
function bbb(prevState = 2, action) {
  switch (action.type) {
    default:
      return prevState;
  }
}

export default combineReducers({
  aaa,
  bbb
});
