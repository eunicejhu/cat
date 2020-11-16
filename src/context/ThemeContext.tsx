import React from "react";

export enum Theme {
  Dark,
  Light,
}

const ThemeContext = React.createContext({
  theme: Theme.Dark,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (theme: Theme): void => {},
});

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
