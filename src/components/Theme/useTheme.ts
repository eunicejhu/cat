import { useContext } from "react";
import ThemeContext from "./Context";

export default function useTheme() {
    const theme = useContext(ThemeContext);
    return theme || {};
}
