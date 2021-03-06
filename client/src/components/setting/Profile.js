import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUsername } from "../../api/feature-api";
import Avatar from "../header/Avatar";
import classes from "./Profile.module.scss";
import Snackbar from "@mui/material/Snackbar";
import { sendResetPwdEmail } from "../../api/auth-api";
import AvatarChange from "./AvatarChange";
import { authActions } from "../../store/auth-slice";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [username, setUsername] = useState(user.username);
  const [openBar, setOpenBar] = useState(false);
  const [openPwdSentBar, setOpenPwdSentBar] = useState(false);
  const [nameUpdateMsg, setNameUpdateMsg] = useState("");
  const [avatarChange, setAvatarChange] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const dispatch = useDispatch();

  const usernameReset = async (e) => {
    e.preventDefault();
    if (user.username === username) {
      setOpenBar(false);
      return;
    }
    try {
      await changeUsername({ username: username });
      console.log("update");
      dispatch(authActions.changeUsername({ username: username }));
      setNameUpdateMsg("🎉 Username Update successful!");
      setOpenBar(true);
    } catch (err) {
      console.log(err);
      setNameUpdateMsg("Username is taken, please try another one!");
      setOpenBar(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };

  const handlePwdResetClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenPwdSentBar(false);
  };

  const pwdReset = async () => {
    try {
      const resp = await sendResetPwdEmail({ email: user.email });
      if (resp.status === 200) {
        localStorage.setItem("resetEmail", user.email);
      }
    } catch (err) {
      console.log(err.resp);
    }
  };

  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => setImageToCrop(reader.result));

      reader.readAsDataURL(event.target.files[0]);
      setAvatarChange(true);
    }
  };

  const cancelChangeAvatar = () => {
    setAvatarChange(false);
  };

  return (
    <>
      {avatarChange ? (
        <AvatarChange
          imageToCrop={imageToCrop}
          cancelChangeAvatar={cancelChangeAvatar}
        />
      ) : (
        <>
          <div className={classes.container}>
            <div className={classes["avatar-change"]}>
              <Avatar className={classes.avatar} src={user.avatar} />
              <label className={classes["upload-file"]}>
                Upload Photo
                <input type="file" onChange={onUploadFile} />
              </label>
            </div>
            <div>
              <h3>EMAIL : </h3>
              <p>{user.email}</p>
            </div>
            <h3>USERNAME : </h3>
            <form onSubmit={usernameReset}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
              />
              <button type="submit" onClick={() => setOpenBar(true)}>
                Update
              </button>
            </form>
            <h3>PASSWORD :</h3>
            <p className={classes["pwd-notice"]}>
              Here you can <b>reset your password</b>. If you use{" "}
              <b>Google login</b> and no password, then you can add password to
              your account.
            </p>
            <button onClick={pwdReset}>Send Verification Email</button>
          </div>
          <Snackbar
            open={openBar}
            autoHideDuration={3000}
            onClose={handleClose}
            message={nameUpdateMsg}
          />
          <Snackbar
            open={openPwdSentBar}
            autoHideDuration={3000}
            onClose={handlePwdResetClose}
            message="🎉 Email sent!"
          />
        </>
      )}
    </>
  );
};

export default Profile;
