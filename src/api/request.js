import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 20000, //请求超出时间
  headers: {}
});
instance.interceptors.request.use(function(config) {
  let token = "";
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  // 如果请求头是post
  // application/json ,就不用处理
  // 如果是application/x-www-from-urlencoded 就要处理
  if (config.method === "post") {
    config.data = Object.keys(config.data)
      .reduce((p, c) => {
        p += `&${c}=${config.data[c]}`;
        return p;
      }, "")
      .slice(1);
    config.headers["content-type"] = "application/x-www-form-urlencoded";
  }
  console.log(config);
  return config;
});

instance.interceptors.response.use(
  function(response) {
    console.log(response);
    if (response.data.status === 0) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
  },
  function(error) {
    const errCode = {
      401: "没有权限访问当前接口",
      403: "禁止访问当前接口",
      404: "当前资源未找到",
      500: "服务器发生未知错误，请联系管理员"
    };
    let errmsg = "";
    if (error.response) {
      errmsg = errCode[error.response.status];
    } else {
      if (error.message.indexOf("Network ERROR") !== -1) {
        errmsg = "网络连接失败，请重新连接网络试试";
      } else if (error.message.indexOf("timeout") !== -1) {
        errmsg = "网络连接超时，请连上WiFi试试";
      }
    }

    return Promise.reject(errmsg || "发生未知错误，请联系管理员");
  }
);
export default instance;
