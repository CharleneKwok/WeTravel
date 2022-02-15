import axios from "axios";

const API = axios.create({ baseURL: "https://travel-advisor.p.rapidapi.com" });

// const options = {
//   method: "GET",
//   url: "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary",
//   params: {
//     bl_latitude: "11.847676",
//     tr_latitude: "12.838442",
//     bl_longitude: "109.095887",
//     tr_longitude: "109.149359",
//   },
//   headers: {
//     "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
//     "x-rapidapi-key": "a5da9e2614msh4ff783e33e0d183p1ac95fjsned37eddfa900",
//   },
// };

API.interceptors.request.use((req) => {
  req.headers = {
    "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  };
  return req;
});

export const restaurants = (params) =>
  API.get("/restaurants/list-in-boundary", { params: params });
export const hotels = (params) =>
  API.get("/hotels/list-in-boundary", { params: params });
export const attractions = (params) =>
  API.get("/attractions/list-in-boundary", { params: params });
