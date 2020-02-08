import axios from "axios";
import error from "../config/error";
import store from "../../src/redux/store";

// 创建axios实例
const instance = axios.create({
  baseURL: "/api", // 公共的请求路径前缀
  timeout: 20000, // 请求超时时间
  headers: {}
});

// 请求拦截器
instance.interceptors.request.use(config => {
  /*
    设置公共的参数
  */

  // 问题: 需要处理token
  const token = store.getState().user.token;

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  if (config.method === "post") {
    config.data = Object.keys(config.data)
      .reduce((p, c) => {
        p += `&${c}=${config.data[c]}`;
        return p;
      }, "")
      .slice(1);
    config.headers["content-type"] = "application/x-www-form-urlencoded";
  }

  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  response => {
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  err => {
    let errMsg = "";

    if (err.response) {
      errMsg = error[err.response.status];
    } else {
      if (err.message.indexOf("Network Error") !== -1) {
        errMsg = "网络连接失败，请重新连接网络试试";
      } else if (err.message.indexOf("timeout") !== -1) {
        errMsg = "网络连接超时，请连上wifi试试";
      }
    }

    return Promise.reject(errMsg || "发生未知错误，请联系管理员~");
  }
);

export default instance;
