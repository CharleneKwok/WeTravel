import React, { useState } from "react";
import classes from "./PostItem.module.scss";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { userLogout } from "../../store/auth-actions";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { likePost, unlikePost } from "../../api/feature-api";
import Avatar from "../header/Avatar";
import PostPage from "./PostPage";
import DeleteIcon from "@mui/icons-material/Delete";

const PostItem = (props) => {
  const info = props.info;
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();
  const [likes, setLikes] = useState(info.likes);
  const [showDetails, setShowDetails] = useState(false);
  const location = useLocation();

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
        setLikes((prev) => [...prev, user._id]);
        await likePost(info._id);
      } else {
        setLikes((prev) => prev.filter((id) => id !== user._id));
        await unlikePost(info._id);
      }
    } catch ({ response }) {
      if (response.status === 401) {
        dispatch(userLogout(user.email));
        localStorage.removeItem("profile");
        history.push("/login");
      }
    }
  };

  const showDetailsHandler = () => {
    setShowDetails(true);
  };

  return (
    <>
      {showDetails && (
        <PostPage
          info={info}
          onClose={() => {
            setShowDetails(false);
          }}
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
          onClick={showDetailsHandler}
        />
        <section>
          <h2 onClick={showDetailsHandler}>{info.title}</h2>
          <p onClick={showDetailsHandler}>{info.content}</p>
          <div className={classes["info-wrapper"]}>
            <div className={classes["info"]}>
              <Avatar src={info.avatar} className={classes.avatar} />
              <Link
                className={classes.username}
                to={`/user-space?id=${info.userId}`}
                target="_blank"
              >
                {info.username}
              </Link>
            </div>
            <div className={classes["info__feature"]}>
              {location.pathname.includes("/space/posts") && (
                <DeleteIcon
                  onClick={() => props.onDeletePost(info._id)}
                  titleAccess="Delete post"
                />
              )}
              {localStorage.getItem("profile") && (
                <div className={classes["info"]}>
                  {likes.includes(user._id) ? (
                    <FavoriteIcon
                      className={classes.likes}
                      onClick={userLike}
                    />
                  ) : (
                    <FavoriteBorderIcon onClick={userLike} />
                  )}
                  <p>{nFormatter(likes.length, 1)}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PostItem;
