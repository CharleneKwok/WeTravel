import React from "react";
import classes from "./PostItem.module.scss";

const PostItem = ({ info }) => {
  return <div>{info.title}</div>;
};

export default PostItem;
