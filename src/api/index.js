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
