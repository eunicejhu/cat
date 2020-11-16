import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import history from "./helpers/history";
import ThemeContext, { Theme } from "./context/ThemeContext";
import store from "./store/index";

import App from "./App";
import "./index.css";

const Entry = () => {
  const [theme, setTheme] = useState(Theme.Dark);
  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <CookiesProvider>
          <Router history={history}>
            <App />
          </Router>
        </CookiesProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};

ReactDOM.render(<Entry />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
