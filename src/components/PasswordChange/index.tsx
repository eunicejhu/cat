import React, { useState } from "react";
import Firebase, { useFirebase } from "../Firebase";
import Input from "../input/Input";
import { StyledForm, StyledSubmitButton } from "../Page";
const PasswordChangeForm = () => {
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const firebase = useFirebase() as Firebase;
    const onChangeInput = (e: React.SyntheticEvent) => {
        const { value, name } = e.target as typeof e.target & {
            value: string;
            name: string;
        };
        if (name === "password1") {
            setPassword1(value);
        } else {
            setPassword2(value);
        }
    };
    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await firebase.doPasswordUpdate(password1);
            setPassword1("");
            setPassword2("");
            setError("");
            setSuccess(true);
            setTimeout(() => setSuccess(false), 1000);
        } catch (error) {
            setError(error.message);
        }
    };
    const canSubmit =
        Boolean(password1) && Boolean(password2) && password1 === password2;
    return (
        <StyledForm>
            <h2>Reset Password</h2>
            <Input
                type="password"
                name="password1"
                placeholder="Password"
                data-testid="password1"
                value={password1}
                onChange={onChangeInput}
            ></Input>
            <Input
                type="password"
                name="password2"
                placeholder="Confirm Password"
                data-testid="password2"
                value={password2}
                onChange={onChangeInput}
            ></Input>
            <p>{error}</p>
            <StyledSubmitButton
                type="submit"
                data-testid="submit"
                disabled={!canSubmit}
                onClick={onSubmit}
            >
                {success ? "Success!" : "Reset Password"}
            </StyledSubmitButton>
        </StyledForm>
    );
};

export default PasswordChangeForm;
