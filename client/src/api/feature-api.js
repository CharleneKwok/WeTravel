import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"));
    req.headers.Authorization = user.token;
    return req;
  }
});

// for location collection list
export const getSaveList = (id) => API.get(`/saveList/${id}`);
export const addToSaveList = (data) => API.post("/saveList", data);
export const deleteItemOnList = (location_id) =>
  API.delete(`/saveList/${location_id}`);
