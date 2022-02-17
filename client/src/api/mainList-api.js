import axios from "axios";

const API = axios.create({ baseURL: "https://travel-advisor.p.rapidapi.com" });

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
