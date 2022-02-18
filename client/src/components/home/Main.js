import React, { useEffect, useState } from "react";
import Page from "../UI/Page";
import TravelList from "./TravelList";
import classes from "./Main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { listActions } from "../../store/list-slice";
import { Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import { getWeatherData } from "../../api/weather-api";
import WeatherMarker from "./WeatherMarker";

const Main = () => {
  const [center, setCenter] = useState({});
  const dispatch = useDispatch();
  const list = useSelector((state) => state.mainList.list);
  const [childClick, setChildClick] = useState("");
  const [autoComplete, setAutoComplete] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [originalPlace, setOriginalPlace] = useState(null);

  const backCurrPosition = () => {
    setCenter({ lat: originalPlace.lat, lng: originalPlace.lng });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setOriginalPlace({ lat: latitude, lng: longitude });
        setCenter({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const resp = await getWeatherData(center.lat, center.lng);
        setWeatherData(resp.data.list);
      } catch (err) {
        console.log(err);
      }
    };
    if (center.lat && center.lng) {
      getWeather();
    }
  }, [center]);

  const placeChange = () => {
    if (autoComplete !== null) {
      const newLat = autoComplete.getPlace().geometry.location.lat();
      const newLng = autoComplete.getPlace().geometry.location.lng();
      setCenter({ lat: newLat, lng: newLng });
    } else {
      console.log("not loaded yet");
    }
  };

  return (
    <Page className={classes.main}>
      <TravelList className={classes.list} childClick={childClick} />
      <div className={classes["map-container"]}>
        <div className={classes["top-bar"]}>
          <Autocomplete
            className={classes["search-dropdown "]}
            onLoad={(autocomplete) => setAutoComplete(autocomplete)}
            onPlaceChanged={placeChange}
          >
            <div className={classes.search}>
              <SearchIcon />
              <input placeholder="Explore new places"></input>
            </div>
          </Autocomplete>
          <button onClick={backCurrPosition}>Back to your location</button>
        </div>
        <div className={classes["google-map"]}>
          {/* <MapLoader /> */}
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={center}
            center={center}
            defaultZoom={16}
            margin={[50, 50, 50, 50]}
            // need ne and sw
            onChange={({ bounds }) => {
              dispatch(
                listActions.changeLocation({
                  swLoction: bounds.sw,
                  neLocation: bounds.ne,
                })
              );
            }}
            onChildClick={(e) => setChildClick(e)}
          >
            {list?.map((item, i) => (
              <Marker
                i={i}
                item={item}
                key={item.location_id}
                lat={item.latitude}
                lng={item.longitude}
              />
            ))}
            {weatherData?.map((data, i) => (
              <WeatherMarker
                key={i}
                data={data}
                lat={data.coord.lat}
                lng={data.coord.lon}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    </Page>
  );
};

export default Main;
