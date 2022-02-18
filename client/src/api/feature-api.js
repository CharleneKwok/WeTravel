import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5001" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const user = JSON.parse(localStorage.getItem("profile"));
    // console.log("🚀 ~ user", user.token);
    req.headers.Authorization = user.token;
    return req;
  }
});

// for location collection list
export const getSaveList = () => API.get("/saveList");
export const addToSaveList = (data) => API.post("/saveList", data);
export const deleteItemOnList = (location_id) =>
  API.delete(`/saveList/${location_id}`);
