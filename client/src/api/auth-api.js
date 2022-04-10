import axios from "axios";

const API = axios.create({ baseURL: "https://wetravel-app.herokuapp.com/" });

export const sendLogin = (data) => API.post("/user/login", data);
export const sendGoogleLogin = (data) => API.post("/user/google/login", data);
export const sendSignUp = (data) => API.post("/user/signup", data);
export const sendLogout = (data) => API.post("/user/logout", data);

// reset password request
export const sendResetPwdEmail = (email) =>
  API.post("/pwdReset/sendmail", email);
export const resetPwd = (data) => API.post("/pwdReset", data);

export const getRandomPosts = (offset) =>
  API.get(`/post/randomPosts/${offset}`);
