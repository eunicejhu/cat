import React, { useState } from "react";
import Input from "../input/Input";
import Firebase, { useFirebase } from "../Firebase";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { StyledForm, StyledPage, StyledSubmitButton } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
const SignInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const firebase = useFirebase() as Firebase;
    const history = useHistory();

    const onChangeInput = (e: React.SyntheticEvent) => {
        const { name, value } = e.target as typeof e.target & {
            name: string;
            value: string;
        };
        if (name === "email") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await firebase.doSignInWithEmailAndPassword(email, password);
            setEmail("");
            setPassword("");
            history.push(ROUTES.ACCOUNT);
        } catch (error) {
            setError("Failed to sign in");
        }
    };

    const canSubmit = Boolean(email) && Boolean(password);
    return (
        <StyledForm>
            <Input
                type="email"
                data-testid="email"
                name="email"
                value={email}
                onChange={onChangeInput}
                placeholder="Email"
            ></Input>
            <Input
                type="password"
                data-testid="password"
                name="password"
                value={password}
                onChange={onChangeInput}
                placeholder="Password"
            ></Input>
            <p>{error}</p>
            <StyledSubmitButton
                type="submit"
                data-testid="submit"
                disabled={!canSubmit}
                onClick={onSubmit}
            >
                Sign in
            </StyledSubmitButton>
            <PasswordForgetLink />
        </StyledForm>
    );
};

const SignInPage = () => (
    <StyledPage>
        <h1>Sign In</h1>
        <SignInForm />
    </StyledPage>
);

export default SignInPage;
