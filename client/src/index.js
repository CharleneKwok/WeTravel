import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
