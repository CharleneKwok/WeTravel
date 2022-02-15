import React from "react";
import ContentLoader from "react-content-loader";

const MapLoader = (props) => (
  <ContentLoader
    width="100%"
    height="60%"
    viewBox="0 0 700 280"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    {...props}
  >
    <rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
  </ContentLoader>
);

export default MapLoader;
