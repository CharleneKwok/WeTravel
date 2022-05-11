import React, { Fragment, useEffect } from "react";
import Main from "./components/home/Main";
import { Switch, Route, Redirect } from "react-router-dom";
import Explore from "./components/explore/Explore";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { useDispatch } from "react-redux";
import ForgotPwd from "./components/auth/ForgotPwd";
import NotExist from "./components/404pages/NotExist";
import Open from "./components/openPage/Open";
import Space from "./components/space/Space";
import decode from "jwt-decode";
import { authActions } from "./store/auth-slice";
import UserSpace from "./components/space/UserSpace";
import { userLogout } from "./store/auth-actions";
import "./App.module.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) {
      const decodedToken = decode(user.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        localStorage.removeItem("profile");
        dispatch(userLogout(decodedToken.email));
        console.log("token invalid");
      } else {
        console.log("token valid");
        dispatch(authActions.login({ user: user }));
      }
    }
  }, []);

  return (
    <Fragment>
      <Switch>
        <Route path="/" exact component={Open} />
        <Route path="/home" exact component={Main}>
          <Redirect to="/home/restaurants" />
        </Route>
        <Route path="/login" exact component={Login} />
        <Route path="/home/restaurants" component={Main} />
        <Route path="/home/hotels" component={Main} />
        <Route path="/home/attractions" component={Main} />
        <Route path="/user-space" exact component={UserSpace} />
        <Route path="/explore" exact component={Explore} />
        <Route path="/space" exact component={Space}>
          <Redirect to="/space/collection" />
        </Route>
        <Route path="/space/collection" component={Space} />
        <Route path="/space/posts" component={Space} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/pwd-reset" component={ForgotPwd} exact />
        <Route path="*" component={NotExist} />
      </Switch>
      {/* )} */}
    </Fragment>
  );
}

export default App;
