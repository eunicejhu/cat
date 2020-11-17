import React from "react";

export type Theme = "dark" | "light";
export const THEME = {
  DARK: "dark",
  LIGHT: "light",
};
const ThemeContext = React.createContext({
  theme: "dark",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (theme: Theme): void => {},
});

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
