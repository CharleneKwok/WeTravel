import React, { useState } from "react";
import Page from "../UI/Page";
import NewPost from "./NewPost";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import classes from "./Explore.module.scss";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../store/auth-actions";
import { Redirect, useHistory } from "react-router-dom";
import { Snackbar } from "@mui/material";
import AllPosts from "./AllPosts";

const Explore = () => {
  const [open, setOpen] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const postSuccessHandler = () => {
    setPostSuccess(true);
  };

  const newPostClose = () => {
    setOpen(false);
  };

  return (
    <Page>
      {open && (
        <NewPost onClose={newPostClose} onPostBar={postSuccessHandler} />
      )}
      <section>
        <AllPosts />
      </section>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes["add-post"]}
        title="Add post"
        onClick={() => {
          setOpen(true);
          dispatch(checkLogin());
          if (!localStorage.getItem("profile")) {
            console.log("?");
            history.push("/login");
          }
        }}
      >
        <AddIcon />
      </Fab>
      <Snackbar
        open={postSuccess}
        onClose={() => setPostSuccess(false)}
        autoHideDuration={2000}
        message="🎉 Post successful!"
      />
    </Page>
  );
};

export default Explore;
