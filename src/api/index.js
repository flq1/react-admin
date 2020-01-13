import instance from "./request";

export const reqlogin = (username, password) => {
  return instance({
    url: "/login",
    methid: "POST",
    data: {
      username,
      password
    }
  });
};
