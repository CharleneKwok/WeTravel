import React from "react";

const WeatherMarker = ({ data }) => {
  return (
    <div>
      <img
        src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
        alt="weather"
      />
    </div>
  );
};

export default WeatherMarker;
