import React, { useEffect, useState } from "react";
import classes from "./PostItem.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { userLogout } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { likePost, unlikePost } from "../../api/feature-api";
import { sendGetUser } from "../../api/auth-api";
import Avatar from "../header/Avatar";

const PostItem = ({ info }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(info.likes);
  const [postUser, setPostUser] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const nFormatter = (num, digits) => {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  };

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const resp = await sendGetUser(info.userId);
      if (resp.status === 200) {
        setPostUser(resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, [info.userId]);

  const userLike = async () => {
    try {
      if (!likes.includes(user._id)) {
        const resp = await likePost(info._id);
        if (resp.status === 200) {
          console.log("like");
          setLikes((prev) => [...prev, user._id]);
        }
      } else {
        const resp = await unlikePost(info._id);
        console.log("unlike");
        if (resp.status === 200) {
          setLikes((prev) => prev.filter((id) => id !== user._id));
        }
      }
    } catch ({ response }) {
      if (response.status === 401) {
        console.log("like failed cuz token");
        dispatch(userLogout(user.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    }
  };

  return (
    <div className={classes.container} data-aos="zoom-in">
      <img src={info.images[0]} alt={info.title} loading="lazy" />
      <section>
        <h2>{info.title}</h2>
        <p>{info.content}</p>
        <div className={classes["info-wrapper"]}>
          <div className={classes["info"]}>
            <Avatar src={postUser.avatar} className={classes.avatar} />
            <p className={classes.username}>{postUser.username}</p>
          </div>
          <div className={classes["info"]}>
            {likes.includes(user._id) ? (
              <FavoriteIcon className={classes.likes} onClick={userLike} />
            ) : (
              <FavoriteBorderIcon onClick={userLike} />
            )}
            <p>{nFormatter(likes.length, 1)}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostItem;
