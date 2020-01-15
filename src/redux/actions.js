// 同步
// 异步

import { reqlogin } from "../api/index";
import { setItem } from "../utils/storage";
import { SAVE_USER } from "./actiontype";

const saveUser = user => ({ type: SAVE_USER, data: user });

export const saveUserAsync = (username, password) => {
  return dispatch => {
    return reqlogin(username, password).then(response => {
      setItem("user", response);
      // 触发更新
      dispatch(saveUser(response));
    });
  };
};
