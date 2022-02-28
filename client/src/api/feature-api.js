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

// for user info setting
export const changeBio = (bio) => API.put("/user/settings/bio", bio);
export const changeAvatar = (avatar) =>
  API.put("/user/settings/avatar", avatar);
export const changeUsername = (username) =>
  API.put("/user/settings/username", username);
export const changeMap = (map) => API.put("/user/settings/map", map);
export const changeWholeApp = (wholeAppearance) =>
  API.put("/user/settings/whole", wholeAppearance);
