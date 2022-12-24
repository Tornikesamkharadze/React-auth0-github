import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";

//dev-c2mlq0gyl2ejsey7.us.auth0.com
//bVgINCjWs75xpATOS8Ltt0xMy5IheYX3
const appKey = process.env.REACT_APP_AUTH_KEY;
const appDomain = process.env.REACT_APP_DOMAIN;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-c2mlq0gyl2ejsey7.us.auth0.com"
      clientId="bVgINCjWs75xpATOS8Ltt0xMy5IheYX3"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);

serviceWorker.unregister();
