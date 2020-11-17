import React from "react";
import ThemeContext from "../context/ThemeContext";

export const theme = { theme: "dark", setTheme: jest.fn() };
type Props = {};
const withTheme = (
  Component: React.JSXElementConstructor<Props>
) => (props: {}) => (
  <ThemeContext.Provider value={theme}>
    <Component {...props} />
  </ThemeContext.Provider>
);

export default withTheme;
