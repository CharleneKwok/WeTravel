import axios from "axios";

const API = axios.create({
  baseURL: "https://community-open-weather-map.p.rapidapi.com",
});

API.interceptors.request.use((req) => {
  req.headers = {
    "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST_WEATHER,
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  };
  return req;
});

export const getWeatherData = (lat, lng) =>
  API.get("/find", {
    params: {
      lat: lat,
      lon: lng,
    },
  });
