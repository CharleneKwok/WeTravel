import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import classes from "./PostPage.module.scss";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const PostPage = (props) => {
  const info = props.info;
  const [currImage, setCurrImage] = useState(0);
  console.log(props.info);

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
          <div className={classes.wrapper}>
            <div className={classes["info__imgs"]}>
              {info.images.map((image, i) => (
                <>
                  <div
                    className={`${classes["info__img"]} ${
                      currImage === i
                        ? classes["info__img--show"]
                        : classes["info__img--hide"]
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                    key={`image_${i}`}
                  ></div>
                </>
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
            <p>{info.title}</p>
          </div>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PostPage;
