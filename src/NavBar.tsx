import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignOutButton from "./components/SignOut";

import { useTheme, Themes, Mode } from "./components/Theme";

import {
    LANDING,
    NOTIFICATIONS,
    SIGN_IN,
    HOME,
    ACCOUNT,
    ADMIN,
} from "./constants/routes";

interface StyledLinkProps {
    themes: Themes;
    mode: Mode;
}
const StyledLink = styled(Link)<StyledLinkProps>`
    ${({ themes, mode }) => {
        return ` --btn-text-hover:  ${themes[mode].btnTextHover};
            --btn-bg-hover: ${themes[mode].btnBackgroundHover};
            --color-bg: ${themes[mode].background} ;
            --color-text:${themes[mode].text};
            --spacing:${themes[mode].spacing};
            `;
    }}
    && {
        text-decoration: none;
        color: var(--color-text);
        background-color: var(--color-bg);
        border: none;
        padding: var(--spacing);
    }

    &&:hover {
        color: var(--btn-text-hover);
        cursor: pointer;
        background-color: var(--btn-bg-hover);
    }
`;

const LinkWithTheme = ({ to, text }: { to: string; text: string }) => {
    const { themes, mode } = useTheme();
    return (
        <li>
            <StyledLink themes={themes} mode={mode} to={to}>
                {text}
            </StyledLink>
        </li>
    );
};

const NavBar = () => {
    return (
        <nav>
            <LinkWithTheme to={LANDING} text="Landing" />
            <LinkWithTheme to={SIGN_IN} text="Sign In" />
            <LinkWithTheme to={HOME} text="Home" />
            <LinkWithTheme to={ACCOUNT} text="Account" />
            <LinkWithTheme to={ADMIN} text="Admin" />
            <LinkWithTheme to={NOTIFICATIONS} text="Notifications" />
            <li>
                <SignOutButton />
            </li>
        </nav>
    );
};

export default NavBar;
