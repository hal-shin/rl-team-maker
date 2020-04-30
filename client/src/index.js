import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import rootReducer from "./reducers/rootReducer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DialogProvider } from "./contexts/DialogContext";
import App from "./App";
import "./index.css";
import { SocketProvider } from "./contexts/SocketContext";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <DialogProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </DialogProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
