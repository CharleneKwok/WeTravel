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

// map styles
const MutiBrandNetwork = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#e5c163",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#c4c4c4",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#e5c163",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#e5c163",
      },
      {
        lightness: "0",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#e5c163",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#575757",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#2c2c2c",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#999999",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];

const Becomeadinosaur = [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#f5f5f2",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.attraction",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.school",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        visibility: "simplified",
      },
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#71c8d4",
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        color: "#e5e8e7",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        color: "#8ba129",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.sports_complex",
    elementType: "geometry",
    stylers: [
      {
        color: "#c7c7c7",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#a0d3d3",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        color: "#91b65d",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        gamma: 1.51,
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "poi.government",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        color: "#ccc",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road",
  },
  {
    featureType: "road.highway",
  },
];

const UnsaturatedBrowns = [
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "geometry",
    stylers: [
      {
        hue: "#ff4400",
      },
      {
        saturation: -68,
      },
      {
        lightness: -4,
      },
      {
        gamma: 0.72,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry",
    stylers: [
      {
        hue: "#0077ff",
      },
      {
        gamma: 3.1,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        hue: "#00ccff",
      },
      {
        gamma: 0.44,
      },
      {
        saturation: -33,
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        hue: "#44ff00",
      },
      {
        saturation: -23,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        hue: "#007fff",
      },
      {
        gamma: 0.77,
      },
      {
        saturation: 65,
      },
      {
        lightness: 99,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        gamma: 0.11,
      },
      {
        weight: 5.6,
      },
      {
        saturation: 99,
      },
      {
        hue: "#0091ff",
      },
      {
        lightness: -86,
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        lightness: -48,
      },
      {
        hue: "#ff5e00",
      },
      {
        gamma: 1.2,
      },
      {
        saturation: -23,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        saturation: -64,
      },
      {
        hue: "#ff9100",
      },
      {
        lightness: 16,
      },
      {
        gamma: 0.47,
      },
      {
        weight: 2.7,
      },
    ],
  },

  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];

const LightDream = [
  {
    featureType: "poi.park",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.medical",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    stylers: [
      {
        hue: "#FFBB00",
      },
      {
        saturation: 43.400000000000006,
      },
      {
        lightness: 37.599999999999994,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "road.highway",
    stylers: [
      {
        hue: "#FFC200",
      },
      {
        saturation: -61.8,
      },
      {
        lightness: 45.599999999999994,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        hue: "#FF0300",
      },
      {
        saturation: -100,
      },
      {
        lightness: 51.19999999999999,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        hue: "#FF0300",
      },
      {
        saturation: -100,
      },
      {
        lightness: 52,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        hue: "#0078FF",
      },
      {
        saturation: -13.200000000000003,
      },
      {
        lightness: 2.4000000000000057,
      },
      {
        gamma: 1,
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        hue: "#00FF6A",
      },
      {
        saturation: -1.0989010989011234,
      },
      {
        lightness: 11.200000000000017,
      },
      {
        gamma: 1,
      },
    ],
  },
];

const Main = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const checkUserUpdate = useSelector((state) => state.auth.user);
  const [center, setCenter] = useState({});
  const dispatch = useDispatch();
  const list = useSelector((state) => state.mainList.list);
  const [childClick, setChildClick] = useState("");
  const [autoComplete, setAutoComplete] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [originalPlace, setOriginalPlace] = useState(null);
  const [mapStyle, setMapStyle] = useState(LightDream);
  useEffect(() => {
    if (user) {
      if (user.mapAppearance === "MutiBrandNetwork") {
        setMapStyle(MutiBrandNetwork);
      } else if (user.mapAppearance === "Becomeadinosaur") {
        setMapStyle(Becomeadinosaur);
      } else if (user.mapAppearance === "UnsaturatedBrowns") {
        setMapStyle(UnsaturatedBrowns);
      } else {
        setMapStyle(LightDream);
      }
    }
  }, [checkUserUpdate]);

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
            defaultZoom={17}
            margin={[50, 50, 50, 50]}
            options={{
              styles: mapStyle,
            }}
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
