import React, { useState } from "react";
import Avatar from "../header/Avatar";
import ImageCropper from "./ImageCropper";
import classes from "./AvatarChange.module.scss";
import { changeAvatar } from "../../api/feature-api";
import { useHistory } from "react-router-dom";
import { settingActions } from "../../store/setting-slice";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const AvatarChange = ({ imageToCrop, cancelChangeAvatar }) => {
  const [croppedImage, setCroppedImage] = useState(undefined);
  const history = useHistory();
  const dispatch = useDispatch();

  const storeAvatar = async () => {
    try {
      const resp = await changeAvatar({ avatar: croppedImage });
      if (resp.status === 200) {
        dispatch(authActions.changeAvatar({ avatar: croppedImage }));
        cancelChangeAvatar();
      }
    } catch ({ response }) {
      if (response.status === 401) {
        dispatch(settingActions.setOpenSettings());
        history.push("/login");
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
    </>
  );
};

export default AvatarChange;
