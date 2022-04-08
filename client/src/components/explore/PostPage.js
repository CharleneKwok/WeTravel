import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import classes from "./PostPage.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Avatar from "../header/Avatar";
import Backdrop from "../UI/Backdrop";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comments from "./Comments";

const PostPage = (props) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const info = props.info;
  const [currImage, setCurrImage] = useState(0);

  return (
    <>
      {localStorage.getItem("profile") ? (
        <>
          <Backdrop onClick={() => props.onClose()} />
          <div className={classes.wrapper}>
            <div className={classes.user}>
              <CloseIcon
                fontSize="large"
                className={classes.close}
                titleAccess="Close Post"
                onClick={props.onClose}
              />
              <Avatar src={user.avatar} />
              <Link
                className={classes["info__name"]}
                to={`/user-space?id=${info.userId}`}
                title="Jump to user space..."
                target="_blank"
              >
                {info.username}
              </Link>
            </div>
            <div className={classes.info}>
              <div className={classes["info__imgs"]}>
                {info.images.map((image, i) => (
                  <div
                    className={`${classes["info__img"]} ${
                      currImage === i
                        ? classes["info__img--show"]
                        : classes["info__img--hide"]
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                    key={`image_${i}`}
                  ></div>
                ))}
                {currImage !== 0 && (
                  <ArrowBackIosIcon
                    className={classes["info__img--back"]}
                    titleAccess="Last"
                    onClick={() => setCurrImage((prev) => prev - 1)}
                  />
                )}
                {currImage + 1 !== info.images.length && (
                  <ArrowForwardIosIcon
                    className={classes["info__img--forword"]}
                    titleAccess="Next"
                    onClick={() => setCurrImage((prev) => prev + 1)}
                  />
                )}
              </div>
              <section>
                <h2>{info.title}</h2>
                <p>{info.content}</p>
                <div className={classes["info__more"]}>
                  <p>{info.createdAt}</p>
                  <div className={classes["info__more--likes"]}>
                    {props.likes.includes(user._id) ? (
                      <FavoriteIcon
                        className={classes["info__more--likesIcon"]}
                        onClick={props.likePost}
                      />
                    ) : (
                      <FavoriteBorderIcon onClick={props.likePost} />
                    )}
                    <p>{props.nFormatter(props.likes.length, 1)}</p>
                  </div>
                </div>
              </section>
              <Comments postId={info._id} />
            </div>
          </div>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PostPage;
