import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import Firebase, { useFirebase } from "../Firebase";
import Input from "../input/Input";
import { StyledForm, StyledPage, StyledSubmitButton } from "../Page";
const PasswordForgetForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const firebase = useFirebase() as Firebase;
    const onChangeEmail = (e: React.SyntheticEvent) => {
        const { value } = e.target as typeof e.target & { value: string };
        setEmail(value);
    };
    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await firebase.doPasswordReset(email);
        } catch (error) {
            setError(error.message);
        }
    };
    const canSubmit = Boolean(email);
    return (
        <StyledForm>
            <Input
                type="email"
                placeholder="Email"
                data-testid="email"
                onChange={onChangeEmail}
            ></Input>
            <p>{error}</p>
            <StyledSubmitButton
                type="submit"
                data-testid="submit"
                disabled={!canSubmit}
                onClick={onSubmit}
            >
                Reset Password
            </StyledSubmitButton>
        </StyledForm>
    );
};

const PasswordForgetPage = () => (
    <StyledPage>
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </StyledPage>
);

const PasswordForgetLink = () => (
    <Link data-testid="passwordForgetLink" to={ROUTES.PASSWORD_FORGET}>
        Forget Password?
    </Link>
);
export { PasswordForgetForm, PasswordForgetLink };
export default PasswordForgetPage;
