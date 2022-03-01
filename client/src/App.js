import React, { Fragment, useEffect, useState } from "react";
import classes from "./App.module.scss";
import open from "./assets/037.png";
import Main from "./components/home/Main";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import Explore from "./components/explore/Explore";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Setting from "./components/setting/Setting";
import decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { getUser, userLogin, userLogout } from "./store/auth-actions";
import { authActions } from "./store/auth-slice";
import PwdReset from "./components/auth/PwdReset";
import ForgotPwd from "./components/auth/ForgotPwd";
import NotExist from "./components/404pages/NotExist";
import Open from "./components/openPage/Open";
import Space from "./components/space/Space";
import Nav from "./components/header/Nav";

function App() {
  // const [openPage, setOpenPage] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      const decodedToken = decode(user.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(userLogout(decodedToken.email));
      } else {
        dispatch(authActions.login({ user: user }));
      }
    }
    // setTimeout(() => {
    //   setOpenPage(false);
    // }, 2600);
  });

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
      <Switch>
        <Route path="/" exact component={Open} />
        <Route path="/home" exact component={Main}>
          <Redirect to="/home/restaurants" />
        </Route>
        <Route path="/home/restaurants" component={Main} />
        <Route path="/home/hotels" component={Main} />
        <Route path="/home/attractions" component={Main} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/space" exact component={Space}>
          <Redirect to="/space/collection" />
        </Route>
        <Route path="/space/collection" component={Space} />
        <Route path="/space/posts" component={Space} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/pwd-reset" component={ForgotPwd} exact />
        {/* <Route path="*" component={NotExist} /> */}
      </Switch>
      {/* )} */}
    </Fragment>
  );
}

export default App;
