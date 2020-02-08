// 同步
// 异步

import {
  reqlogin,
  reqGetCategoryList,
  reqAddCategory,
  reqUpdateCategory,
  reqDeleteCategory
} from "../api/index";
import { setItem } from "../utils/storage";
import {
  SAVE_USER,
  REMOVE_REDUX,
  GET_CATEGORY_LIST,
  CHANGE_LANGUAGE,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "./actiontype";

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

const addCategory = category => ({
  type: ADD_CATEGORY,
  data: category
});
export const addCategoryAsync = categoryName => {
  return dispatch => {
    // 发送请求
    return reqAddCategory(categoryName).then(response => {
      // 调用dispatch，触发更新
      dispatch(addCategory(response));
    });
  };
};

export const changeLanguage = lang => ({ type: CHANGE_LANGUAGE, data: lang });

export const removeredux = () => ({ type: REMOVE_REDUX });

const getCategoryList = categories => ({
  type: GET_CATEGORY_LIST,
  data: categories
});

export const getCategoryListAsync = () => {
  return dispatch => {
    // 发送请求
    reqGetCategoryList().then(response => {
      // 调用dispatch，触发更新
      dispatch(getCategoryList(response));
    });
  };
};

//更新分类
const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  data: category
});

export const updateCategoryAsync = (categoryId, categoryName) => {
  return dispatch => {
    // 发送请求
    return reqUpdateCategory(categoryId, categoryName).then(response => {
      // 调用dispatch，触发更新
      dispatch(updateCategory(response));
    });
  };
};
//删除分类
const deleteCategory = id => ({
  type: DELETE_CATEGORY,
  data: id
});

export const deleteCategoryAsync = categoryId => {
  return dispatch => {
    // 发送请求
    return reqDeleteCategory(categoryId).then(response => {
      // 调用dispatch，触发更新
      dispatch(deleteCategory(response));
    });
  };
};
