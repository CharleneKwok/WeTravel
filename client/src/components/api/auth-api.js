import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

export const sendLogin = (data) => API.post("/user/login", data);
export const sendSignUp = (data) => API.post("/user/signup", data);
export const sendLogout = (data) => API.post("/user/logout", data);
export const sendGetUser = (id) => API.get(`/user/${id}`);
