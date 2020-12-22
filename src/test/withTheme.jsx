import React from "react";
import { ThemeContext, themes } from "../components/Theme";

export const theme = { themes: themes, mode: "pink", setTheme: jest.fn() };

const withTheme = (Component) => (props) => (
    <ThemeContext.Provider value={theme}>
        <Component {...props} />
    </ThemeContext.Provider>
);

export default withTheme;
