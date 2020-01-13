// import axios from "axios";

// const instance = axios.create({
//   baseURL: "/api",
//   timeout: 20000, //请求超出时间
//   headers: {}
// });
// instance.interceptors.request.use(function(config) {
//   let token = "";
//   if (token) {
//     config.headers.authorization = `Bearer ${token}`;
//   }
//   // 如果请求头是post
//   // application/json ,就不用处理
//   // 如果是application/x-www-from-urlencoded 就要处理
//   if (config.method === "post") {
//     config.data = Object.keys(config.data)
//       .reduce((p, c) => {
//         p += `$${c}=${config.data[c]}`;
//         return p;
//       }, "")
//       .slice(1);
//     config.headers["content-type"] = "application/x-www-form-urlencoded";
//   }
//   return config;
// });

// instance.interceptors.response.use(
//   function(response) {
//     console.log(response);
//     if (response.data.status === 0) {
//       return response.data.data;
//     } else {
//       return Promise.reject(response.data.msg);
//     }
//   },
//   function(error) {
//     const errCode = {
//       401: "没有权限访问当前接口",
//       403: "禁止访问当前接口",
//       404: "当前资源未找到",
//       500: "服务器发生未知错误，请联系管理员"
//     };
//     let errmsg = "";
//     if (error.response) {
//       errmsg = errCode[error.response.status];
//     } else {
//       if (error.message.indexOf("Network ERROR") !== -1) {
//         errmsg = "网络连接失败，请重新连接网络试试";
//       } else if (error.message.indexOf("timeout") !== -1) {
//         errmsg = "网络连接超时，请连上WiFi试试";
//       }
//     }

//     return Promise.reject(errmsg || "发生未知错误，请联系管理员");
//   }
// );
// export default instance;

/**
 * 封装axios的模块
 */

import axios from "axios";
//import errCode from '../config/error-code';

// 创建axios实例
const instance = axios.create({
  baseURL: "/api", // 公共的请求路径前缀
  timeout: 20000, // 请求超时时间
  headers: {
    // 公共请求头参数
  }
});

// 设置拦截器函数

// 请求拦截器
instance.interceptors.request.use(config => {
  /*
    设置公共的参数
  */

  // 问题: 需要处理token
  let token = "";

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  /*
    如果是POST请求。需要开发者检查请求头是：application/json  applicaion/x-www-form-urlencoded
    如果是 application/json ， 就不用处理（因为axios默认值就是这个）
    如果是 application/x-www-form-urlencoded，就需要对请求参数进行urlencoded转换
  */
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
    /*
      成功返回成功的promise
      失败返回失败的promise
    */
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  err => {
    /*
      根据不同的错误原因，提示不同错误
    */
    const errCode = {
      401: "没有权限访问当前接口",
      403: "禁止访问当前接口",
      404: "当前资源未找到",
      500: "服务器发生未知错误，请联系管理员"
    };

    // 错误原因
    let errMsg = "";

    if (err.response) {
      // 接受到响应了，但是响应是失败的
      // 根据响应状态码判断错误类型
      errMsg = errCode[err.response.status];
    } else {
      // 没有接受到响应
      // 根据响应message(错误信息)来判断错误类型
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
