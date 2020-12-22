import React from "react";
import PasswordChangeForm from "../PasswordChange";
import { PasswordForgetForm } from "../PasswordForget";
import { StyledPage } from "../Page";
import { useAuthorization } from "../Session";
const Account = () => {
    const authUser = useAuthorization();
    return authUser ? (
        <StyledPage>
            <h2>Reset By Email</h2>
            <PasswordForgetForm />
            <PasswordChangeForm />
        </StyledPage>
    ) : null;
};

export default Account;
