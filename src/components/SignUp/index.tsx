import React, { useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import Firebase, { useFirebase } from "../Firebase/index";
import Input from "../input/Input";
import * as ROUTES from "../../constants/routes";

const initialState = {
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: "",
};
type ActionType =
    | { type: "TYPE_USERNAME"; payload: string }
    | { type: "TYPE_EMAIL"; payload: string }
    | { type: "TYPE_PASSWORDONE"; payload: string }
    | { type: "TYPE_PASSWORDTWO"; payload: string }
    | { type: "ERROR_SIGNUP"; payload: string }
    | { type: "RESET_INITIAL"; payload: typeof initialState };

type Types =
    | "TYPE_USERNAME"
    | "TYPE_EMAIL"
    | "TYPE_PASSWORDONE"
    | "TYPE_PASSWORDTWO"
    | "ERROR_SIGNUP";

const reducer = (state: typeof initialState, action: ActionType) => {
    switch (action.type) {
        case "TYPE_USERNAME":
            return { ...state, username: action.payload };
        case "TYPE_EMAIL":
            return { ...state, email: action.payload };
        case "TYPE_PASSWORDONE":
            return { ...state, passwordOne: action.payload };
        case "TYPE_PASSWORDTWO":
            return { ...state, passwordTwo: action.payload };
        case "ERROR_SIGNUP":
            return { ...state, error: action.payload };
        case "RESET_INITIAL":
            return { ...action.payload };
    }
};

const SignUpForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const firebase = useFirebase() as Firebase;
    const history = useHistory();

    const { email, passwordOne, passwordTwo, username, error } = state;
    const onInputChanged = (e: React.SyntheticEvent) => {
        const { name, value } = e.target as typeof e.target & {
            name: string;
            value: string;
        };
        const type = `TYPE_${name.toUpperCase()}` as Types;
        dispatch({ type, payload: value });
    };

    const canSubmit =
        Boolean(email) &&
        Boolean(passwordOne) &&
        Boolean(username) &&
        passwordOne === passwordTwo;

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            await firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
            dispatch({ type: "RESET_INITIAL", payload: initialState });
            history.push(ROUTES.HOME);
        } catch (error) {
            dispatch({ type: "ERROR_SIGNUP", payload: error.message });
        }
    };
    return (
        <form>
            <Input
                type="text"
                data-testid="username"
                name="username"
                value={username}
                onChange={onInputChanged}
            ></Input>
            <Input
                type="email"
                data-testid="email"
                name="email"
                value={email}
                onChange={onInputChanged}
            ></Input>
            <Input
                type="password"
                data-testid="passwordOne"
                name="passwordOne"
                value={passwordOne}
                onChange={onInputChanged}
            ></Input>
            <Input
                type="password"
                data-testid="passwordTwo"
                name="passwordTwo"
                value={passwordTwo}
                onChange={onInputChanged}
            ></Input>
            <p>{Boolean(error) ? error : ""}</p>
            <button
                type="submit"
                data-testid="submit"
                disabled={!canSubmit}
                onClick={onSubmit}
            ></button>
        </form>
    );
};

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

export { SignUpForm, SignUpLink };
export default SignUpPage;
