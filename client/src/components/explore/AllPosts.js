import Masonry from "@mui/lab/Masonry";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getRandomPosts } from "../../api/auth-api";
import MyLoader from "../UI/MyLoader";
import PostItem from "./PostItem";
import classes from "./AllPosts.module.scss";
import { deletePost, getUserPosts } from "../../api/feature-api";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/auth-actions";
import { useHistory } from "react-router-dom";

const AllPosts = (props) => {
  const [load, setLoad] = useState(null);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const observer = useRef();
  const lastItemRef = useCallback((node) => {
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prev) => prev + 10);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    return () => {
      props.setPosts([]);
    };
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      let resp;
      if (props.isUserPosts) {
        resp = await getUserPosts(props.userId, offset);
      } else {
        resp = await getRandomPosts(offset);
      }
      if (resp.status === 200) {
        const posts = resp.data.posts;
        if (posts.length === 0) {
          setLoad("End");
          return;
        } else {
          setLoad("Loading...");
        }
        props.setPosts((prev) => prev.concat(posts));
      }
    } catch ({ response }) {
      if (response.status === 401) {
        console.log("get posts failed cuz token");
        dispatch(userLogout(user.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    }
  }, [offset]);

  const deletePostHandler = async (postId) => {
    try {
      const resp = await deletePost(postId);
      if (resp.status === 200) {
        props.setPosts((prev) => prev.filter((post) => post._id !== postId));
        console.log(props.posts);
      }
    } catch ({ response }) {
      if (response.status === 401) {
        console.log("delete failed cuz token");
        dispatch(userLogout(user.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    }
  };

  return (
    <div className={props.className}>
      <Masonry columns={{ md: 3, sm: 2, xs: 1, lg: 4 }} spacing={2}>
        {load ? (
          props.posts?.map((post, i) => (
            <PostItem
              info={post}
              key={`post_${i}_${post.title}`}
              onDeletePost={deletePostHandler}
            />
          ))
        ) : (
          <>
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
            <MyLoader />
          </>
        )}
      </Masonry>
      {load && props.posts.length !== 0 && (
        <p className={classes["loading"]} ref={lastItemRef}>
          {load}
        </p>
      )}
    </div>
  );
};

export default AllPosts;
