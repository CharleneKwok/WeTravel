import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import Page from "../UI/Page";
import classes from "./PostPage.module.scss";
import CloseIcon from "@mui/icons-material/Close";

const PostPage = (props) => {
  const history = useHistory();
  return (
    <>
      {localStorage.getItem("profile") ? (
        <div className={classes.container}>
          <CloseIcon
            fontSize="large"
            className={classes.close}
            titleAccess="Close Post"
            onClick={() => props.onClose()}
          />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PostPage;
