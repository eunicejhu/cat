import React from "react";
import ThemeContext, { THEME } from "../context/ThemeContext";

export const theme = { theme: THEME.DARK, setTheme: jest.fn() };

type ThemeWrapperProps = { children: React.ReactNode };
const ThemeWrapper: React.FC<ThemeWrapperProps> = ({
  children,
}: ThemeWrapperProps) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
);
export default ThemeWrapper;
