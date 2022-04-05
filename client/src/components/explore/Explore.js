import React, { useEffect, useState } from "react";
import Page from "../UI/Page";
import NewPost from "./NewPost";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import classes from "./Explore.module.scss";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../store/auth-actions";
import { useHistory } from "react-router-dom";
import { Snackbar } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AllPosts from "./AllPosts";

const Explore = () => {
  const [open, setOpen] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (window.pageYOffset > 200) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, []);

  const postSuccessHandler = () => {
    setPostSuccess(true);
  };

  const newPostClose = () => {
    setOpen(false);
  };

  const showNewPost = (newPost) => {
    setPosts((prev) => [newPost].concat(prev));
  };

  return (
    <Page isDarkMode={true}>
      {open && (
        <NewPost
          onClose={newPostClose}
          onPostBar={postSuccessHandler}
          showNewPost={showNewPost}
        />
      )}
      <section>
        <div className={classes["explore-image"]} />
        <AllPosts
          className={classes["explore-posts"]}
          setPosts={setPosts}
          posts={posts}
          isUserPosts={false}
        />
      </section>
      {showScroll && (
        <Fab
          variant="circular"
          aria-label="back to top"
          className={classes["to-top"]}
          title="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowUpwardIcon sx={{ mr: 1 }} className={classes["to-top-icon"]} />
        </Fab>
      )}
      <Fab
        color="secondary"
        aria-label="add"
        className={classes["add-post"]}
        title="Add post"
        onClick={() => {
          setOpen(true);
          dispatch(checkLogin());
          if (!localStorage.getItem("profile")) {
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
