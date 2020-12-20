import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SignOutButton from "./components/SignOut";
import app from "firebase/app";

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

const NavAuth = (
    <nav>
        <LinkWithTheme to={LANDING} text="Landing" />
        <LinkWithTheme to={HOME} text="Home" />
        <LinkWithTheme to={ACCOUNT} text="Account" />
        <LinkWithTheme to={ADMIN} text="Admin" />
        <LinkWithTheme to={NOTIFICATIONS} text="Notifications" />
        <li>
            <SignOutButton />
        </li>
    </nav>
);
const NavNonAuth = (
    <nav>
        <LinkWithTheme to={LANDING} text="Landing" />
        <LinkWithTheme to={SIGN_IN} text="Sign In" />
    </nav>
);

interface NavBarProps {
    authUser: app.User | null;
}
const NavBar: React.FC<NavBarProps> = ({ authUser }) => {
    return authUser ? NavAuth : NavNonAuth;
};

export default NavBar;
