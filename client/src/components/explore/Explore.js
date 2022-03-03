import React, { useState } from "react";
import Page from "../UI/Page";
import NewPost from "./NewPost";
import RandomPost from "./RandomPost";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import classes from "./Explore.module.scss";

const Explore = () => {
  const [open, setOpen] = useState(false);

  const newPostClose = () => {
    setOpen(false);
  };

  return (
    <Page>
      {open && <NewPost onClose={newPostClose} />}
      <section>
        <RandomPost />
      </section>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes["add-post"]}
        title="Add post"
        onClick={() => setOpen(true)}
      >
        <AddIcon />
      </Fab>
    </Page>
  );
};

export default Explore;
