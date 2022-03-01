import React, { useState } from "react";
import Avatar from "../header/Avatar";
import ImageCropper from "./ImageCropper";
import classes from "./AvatarChange.module.scss";
import { changeAvatar } from "../../api/feature-api";
import Snackbar from "@mui/material/Snackbar";
import { useHistory } from "react-router-dom";
import { settingActions } from "../../store/setting-slice";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const AvatarChange = ({ imageToCrop, cancelChangeAvatar }) => {
  const [croppedImage, setCroppedImage] = useState(undefined);

  const [open, setOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const storeAvatar = async () => {
    try {
      const resp = await changeAvatar({ avatar: croppedImage });
      if (resp.status === 200) {
        dispatch(authActions.changeAvatar({ avatar: croppedImage }));
        setOpen(true);
        // cancelChangeAvatar();
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        history.push("/login");
        dispatch(settingActions.setOpenSettings());
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        {croppedImage ? (
          <Avatar src={croppedImage} className={classes.avatar} />
        ) : (
          <Avatar className={classes.avatar} />
        )}
        {croppedImage ? (
          <Avatar src={croppedImage} className={classes["avatar-sm"]} />
        ) : (
          <Avatar className={classes["avatar-sm"]} />
        )}
        <div className={classes.image}>
          <ImageCropper
            imageToCrop={imageToCrop}
            onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
          />
        </div>
        <div className={classes.btns}>
          <button className={classes.cancel} onClick={cancelChangeAvatar}>
            Cancel
          </button>
          <button onClick={storeAvatar}>Confirm</button>
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        message="🎉 Change Avatar Successful!"
      />
    </>
  );
};

export default AvatarChange;
