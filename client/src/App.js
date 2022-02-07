import React, { Fragment, useEffect, useState } from "react";
import classes from "./App.module.scss";
import open from "./assets/open.png";
import Main from "./components/main/Main";
import { Routes, Route } from "react-router-dom";
import Explore from "./components/explore/Explore";
import Profile from "./components/profile/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Nav from "./components/header/Nav";

function App() {
  const [openPage, setOpenPage] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpenPage(false);
    }, 2600);
  }, []);

  return (
    <Fragment>
      {/* {openPage ? (
        <div className={classes.container}>
          <div>
            <img src={open} alt="opening" />
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
        <Route path="*" element={<p>this page doesn't exist.</p>} />
      </Routes>
      {/* )} */}
    </Fragment>
  );
}

export default App;
