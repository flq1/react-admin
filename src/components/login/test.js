import axios from "axios";
import React from "react";
import { message, Button } from "antd";
export default function test() {
  const instance = axios.create({
    baseURL: "/api",
    timeout: 1000,
    headers: {}
  });

  instance.interceptors.request.use(function(config) {
    console.log(config);
    if (token) {
      config.headers.authorization = ` Bearer ${token}`;
    }
    return config;
  });
  instance.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );
  let token = "";
  const btn1 = () => {
    instance({
      method: "POST",
      url: "/login",
      data: {
        username: "admin",
        password: "admin"
      }
    })
      .then(value => {
        if (value.data.status === 0) {
          console.log(value);
          token = value.data.data.token;
          console.log(token);
          message.success("This is a success message");
        }
      })
      .catch(err => {
        console.log(11);
        console.log(err);
      });
  };
  const btn2 = () => {
    console.log(111);
  };
  const btn3 = () => {
    console.log(111);
  };

  return (
    <div>
      <Button onClick={btn1}>test1</Button>
      <Button onClick={btn2}>test2</Button>
      <Button onClick={btn3}>test3</Button>
    </div>
  );
}
