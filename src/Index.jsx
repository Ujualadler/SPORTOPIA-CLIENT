import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Store } from "./Redux/Store.jsx";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    {/* <React.StrictMode> */}
      <GoogleOAuthProvider clientId="391163149271-ccqfppan73kp9e7ogrmehofrhkjiehh9.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    {/* </React.StrictMode> */}
  </Provider>
);
