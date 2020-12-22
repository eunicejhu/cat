import React from "react";
import Firebase, { useFirebase } from "../Firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { useTheme } from "../Theme";
import { Themes, Mode } from "../Theme";

import styled from "styled-components";

interface StyledButtonProps {
    themes: Themes;
    mode: Mode;
}
const StyledButton = styled.button<StyledButtonProps>`
    ${({ themes, mode }) => {
        return ` --btn-text-hover:  ${themes[mode].btnTextHover};
            --btn-bg-hover: ${themes[mode].btnBackgroundHover};
            --color-bg: ${themes[mode].background} ;
            --color-text:${themes[mode].text};
            --spacing:${themes[mode].spacing};`;
    }}
    text-decoration: none;
    color: var(--color-text);
    background-color: var(--color-bg);
    border: none;
    padding: var(--spacing);

    &:hover {
        color: var(--btn-text-hover);
        cursor: pointer;
        background-color: var(--btn-bg-hover);
    }
`;
const SignOutButton = () => {
    const firebase = useFirebase() as Firebase;
    const history = useHistory();
    const { themes, mode } = useTheme();
    const onSignOut = (e: React.SyntheticEvent) => {
        firebase.doSignOut();
        history.push(ROUTES.LANDING);
    };
    return (
        <StyledButton
            themes={themes}
            mode={mode}
            type="button"
            data-testid="signout"
            onClick={onSignOut}
        >
            Sign Out
        </StyledButton>
    );
};

export default SignOutButton;
