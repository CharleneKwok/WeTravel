import React, { useEffect, useState } from "react";
import classes from "./PostItem.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { userLogout } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { likePost, unlikePost } from "../../api/feature-api";
import Avatar from "../header/Avatar";
import PostPage from "./PostPage";

const PostItem = ({ info }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(info.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDetails, setShowDetails] = useState(false);

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

  const userLike = async () => {
    try {
      if (!likes.includes(user._id)) {
        const resp = await likePost(info._id);
        if (resp.status === 200) {
          setLikes((prev) => [...prev, user._id]);
        }
      } else {
        const resp = await unlikePost(info._id);
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
    <>
      {showDetails && (
        <PostPage
          info={info}
          onClose={() => setShowDetails(false)}
          likePost={userLike}
          likes={likes}
          nFormatter={nFormatter}
        />
      )}
      <div className={classes.container}>
        <img
          src={info.images[0]}
          alt={info.title}
          loading="lazy"
          onClick={() => setShowDetails(true)}
        />
        <section>
          <h2 onClick={() => setShowDetails(true)}>{info.title}</h2>
          <p onClick={() => setShowDetails(true)}>{info.content}</p>
          <div className={classes["info-wrapper"]}>
            <div className={classes["info"]}>
              <Avatar src={info.avatar} className={classes.avatar} />
              <p className={classes.username}>{info.username}</p>
            </div>
            {localStorage.getItem("profile") && (
              <div className={classes["info"]}>
                {likes.includes(user._id) ? (
                  <FavoriteIcon className={classes.likes} onClick={userLike} />
                ) : (
                  <FavoriteBorderIcon onClick={userLike} />
                )}
                <p>{nFormatter(likes.length, 1)}</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PostItem;
