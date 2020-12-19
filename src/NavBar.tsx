import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./components/SignOut";

import {
    LANDING,
    NOTIFICATIONS,
    SIGN_IN,
    HOME,
    ACCOUNT,
    ADMIN,
} from "./constants/routes";

const NavBar = () => (
    <nav>
        <li>
            <Link to={LANDING}>Landing</Link>
        </li>
        <li>
            <Link to={SIGN_IN}>Sign In</Link>
        </li>
        <li>
            <Link to={HOME}>Home</Link>
        </li>
        <li>
            <Link to={ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={ADMIN}>Admin</Link>
        </li>
        <li>
            <Link to={NOTIFICATIONS}>Notifications</Link>
        </li>
        <SignOutButton />
    </nav>
);

export default NavBar;
