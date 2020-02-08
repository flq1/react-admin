import instance from "./request";
//username, password
export const reqlogin = (username, password) => {
  return instance({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  });
};
// 请求获取分类数据
export const reqGetCategoryList = () => {
  return instance({
    url: "/category/get",
    method: "GET"
  });
};
// 请求添加分类数据
export const reqAddCategory = categoryName => {
  return instance({
    url: "/category/add",
    method: "POST",
    data: {
      categoryName
    }
  });
};
// 请求修改分类数据
export const reqUpdateCategory = (categoryId, categoryName) => {
  return instance({
    url: "/category/update",
    method: "POST",
    data: {
      categoryId,
      categoryName
    }
  });
};
// 请求删除分类数据
export const reqDeleteCategory = categoryId => {
  return instance({
    url: "/category/delete",
    method: "POST",
    data: {
      categoryId
    }
  });
};

// 请求获取商品数据
export const reqGetProductList = (pageNum, pageSize) => {
  return instance({
    url: "/product/list",
    method: "GET",
    params: {
      pageNum,
      pageSize
    }
  });
};

// 请求添加商品数据
export const reqAddProduct = ({ name, desc, price, detail, categoryId }) => {
  return instance({
    url: "/product/add",
    method: "POST",
    data: {
      name,
      desc,
      price,
      detail,
      categoryId
    }
  });
};
