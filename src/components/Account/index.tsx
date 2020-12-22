import React from "react";
import PasswordChangeForm from "../PasswordChange";
import { PasswordForgetForm } from "../PasswordForget";
import { StyledPage } from "../Page";
const Account = () => (
    <StyledPage>
        <h2>Reset By Email</h2>
        <PasswordForgetForm />
        <PasswordChangeForm />
    </StyledPage>
);

export default Account;
