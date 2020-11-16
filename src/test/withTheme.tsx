import React from "react";
import ThemeContext, { Theme } from "../context/ThemeContext";

export const theme = { theme: Theme.Dark, setTheme: jest.fn() };
type Props = {};
const withTheme = (
  Component: React.JSXElementConstructor<Props>
) => (props: {}) => (
  <ThemeContext.Provider value={theme}>
    <Component {...props} />
  </ThemeContext.Provider>
);

export default withTheme;
