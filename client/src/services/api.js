import axios from "axios";

const API = axios.create({
  baseURL: "/"
});

export const signUpService = ({ username, password }) =>
  new Promise((resolve, reject) => {
    console.log("user", { username, password });
    API.post("donorsAuth/register", {
      username,
      password
    })
      .then(response => {
        console.log("response", response);
        const user = response.data.user;
        console.log("user", user);
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });
