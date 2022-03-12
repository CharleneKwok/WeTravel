import React, { useCallback, useEffect, useRef, useState } from "react";
import Page from "../UI/Page";
import NewPost from "./NewPost";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import classes from "./Explore.module.scss";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../store/auth-actions";
import { Redirect, useHistory } from "react-router-dom";
import { Snackbar } from "@mui/material";
import { getRandomPosts } from "../../api/auth-api";
import PostItem from "./PostItem";
import Masonry from "@mui/lab/Masonry";
import MyLoader from "../UI/MyLoader";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Explore = () => {
  const [open, setOpen] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [load, setLoad] = useState(null);
  const [offset, setOffset] = useState(0);
  const [lengthOfAllPosts, setLengthOfAllPosts] = useState(0);

  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prev) => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const resp = await getRandomPosts(offset);
      if (resp.status === 200) {
        const posts = resp.data.posts;
        if (posts.length === 0) {
          setLoad("End");
          return;
        } else {
          setLoad("Loading...");
        }
        setPosts((prev) => prev.concat(posts));
        setLengthOfAllPosts(resp.len);
      }
    } catch (err) {
      console.log(err);
    }
  }, [offset]);

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
        <div className={classes["explore-posts"]}>
          <Masonry columns={{ md: 3, sm: 2, xs: 1, lg: 4 }} spacing={2}>
            {load ? (
              posts?.map((post, i) => (
                <PostItem info={post} key={`post_${i}_${post.title}`} />
              ))
            ) : (
              <>
                <MyLoader />
                <MyLoader />
                <MyLoader />
              </>
            )}
          </Masonry>
          {load && (
            <p className={classes["loading"]} ref={lastItemRef}>
              {load}
            </p>
          )}
        </div>
      </section>
      <Fab
        variant="circular"
        aria-label="back to top"
        className={classes["to-top"]}
      >
        <ArrowUpwardIcon sx={{ mr: 1 }} />
      </Fab>
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
