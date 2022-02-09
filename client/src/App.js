import React, { Fragment, useEffect, useState } from "react";
import classes from "./App.module.scss";
import open from "./assets/037.png";
import Main from "./components/main/Main";
import { Routes, Route } from "react-router-dom";
import Explore from "./components/explore/Explore";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Setting from "./components/setting/Setting";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUser, userLogin, userLogout } from "./store/auth-actions";
import { authActions } from "./store/auth-slice";

function App() {
  // const [openPage, setOpenPage] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      console.log("🚀 ~ user", user);
      const decodedToken = decode(user.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(userLogout(decodedToken.id));
      } else {
        dispatch(authActions.login({ user: user }));
      }
    }
    // setTimeout(() => {
    //   setOpenPage(false);
    // }, 2600);
  }, []);

  return (
    <Fragment>
      {/* {openPage ? (
        <div className={classes.container}>
          <div>
            <img src={open} alt="opening" width="30%" />
            <p className={classes.opening}>WeTravel</p>
          </div>
        </div>
      ) : ( */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<p>this page doesn't exist.</p>} />
      </Routes>
      {/* )} */}
    </Fragment>
  );
}

export default App;
