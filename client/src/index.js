import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Auth0Provider } from "@auth0/auth0-react";

import rootReducer from "./reducers/rootReducer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DialogProvider } from "./contexts/DialogContext";
import App from "./App.jsx";
import "./index.css";
import { SocketProvider } from "./contexts/SocketContext";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_IDENTIFIER}
    >
      <ThemeProvider>
        <DialogProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </DialogProvider>
      </ThemeProvider>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);
