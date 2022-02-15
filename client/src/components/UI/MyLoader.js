import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    viewBox="0 0 700 700"
    backgroundColor="#f5f5f5"
    foregroundColor="#dbdbdb"
    {...props}
  >
    <rect x="0" y="0" rx="10" ry="10" width="100%" height="440" />
    <rect x="10" y="480" rx="0" ry="0" width="400" height="30" />
    <rect x="530" y="480" rx="0" ry="0" width="130" height="30" />
    <rect x="10" y="550" rx="0" ry="0" width="239" height="20" />
    <rect x="10" y="610" rx="0" ry="0" width="440" height="20" />
  </ContentLoader>
);

export default MyLoader;
