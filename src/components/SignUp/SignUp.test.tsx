import React from "react";
import { mocked } from "ts-jest/utils";
import { BrowserRouter } from "react-router-dom";
import SignUpPage, { SignUpForm, SignUpLink } from "./index";
import Firebase, { FirebaseContext, useFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";
import user from "@testing-library/user-event";
import { render } from "@testing-library/react";

jest.mock("../Firebase/index");

describe("SignUpForm test", () => {
    beforeEach(() => {
        mocked(Firebase).mockClear();
    });
    it("signup successfully and redirect to home page after filling in username, email, password", async () => {
        mocked(useFirebase).mockReturnValue({
            doCreateUserWithEmailAndPassword: jest.fn(),
        });
        const ui = (
            <FirebaseContext.Provider value={new Firebase()}>
                <BrowserRouter>
                    <SignUpForm />
                </BrowserRouter>
            </FirebaseContext.Provider>
        );
        const { getByTestId, findByTestId } = render(ui);

        user.type(getByTestId("username"), "eunice");
        user.type(getByTestId("email"), "eunice@gamil.com");
        user.type(getByTestId("passwordOne"), "password**");
        user.type(getByTestId("passwordTwo"), "password**");
        user.click(getByTestId("submit"));

        expect(await findByTestId("email")).toHaveValue("");
        expect(window.location.pathname).toBe(ROUTES.HOME);
    });

    it("cannot submit when any of field is blank or passwordOne is not identical to passwordTwo", () => {
        const ui = (
            <FirebaseContext.Provider value={new Firebase()}>
                <BrowserRouter>
                    <SignUpForm />
                </BrowserRouter>
            </FirebaseContext.Provider>
        );
        const { getByTestId } = render(ui);
        const submitBtn = getByTestId("submit") as HTMLButtonElement;

        user.type(getByTestId("username"), "eunice");
        expect(submitBtn.disabled).toBeTruthy();

        user.type(getByTestId("email"), "eunice@gamil.com");
        user.type(getByTestId("passwordOne"), "password**");
        user.type(getByTestId("passwordTwo"), "password**LLL");
        user.click(submitBtn);

        expect(submitBtn.disabled).toBeTruthy();
        user.type(getByTestId("passwordTwo"), "password**");
        expect(submitBtn.disabled).toBeFalsy();
    });
    it("show error message when Firebase signup authentication failed", async () => {
        const mockDoCreateUserWithEmailAndPassword = jest
            .fn()
            .mockRejectedValueOnce({ message: "failed to create user" });
        mocked(useFirebase).mockImplementation(() => ({
            doCreateUserWithEmailAndPassword: mockDoCreateUserWithEmailAndPassword,
        }));

        const ui = (
            <FirebaseContext.Provider value={new Firebase()}>
                <BrowserRouter>
                    <SignUpForm />
                </BrowserRouter>
            </FirebaseContext.Provider>
        );
        const { getByTestId, findByText } = render(ui);

        user.type(getByTestId("username"), "eunice");
        user.type(getByTestId("email"), "eunice@gamil.com");
        user.type(getByTestId("passwordOne"), "password**");
        user.type(getByTestId("passwordTwo"), "password**");
        user.click(getByTestId("submit"));

        expect(Firebase).toHaveBeenCalledTimes(1);
        expect(mockDoCreateUserWithEmailAndPassword).toHaveBeenLastCalledWith(
            "eunice@gamil.com",
            "password**"
        );
        expect(await findByText(/failed to create user/i)).toBeInTheDocument();
    });
});

describe("SignUpLink test", () => {
    it("click to change url to /signup", () => {
        const ui = (
            <BrowserRouter>
                <SignUpLink />
            </BrowserRouter>
        );
        const { getByText } = render(ui);
        user.click(getByText(/Sign Up/i));
        expect(window.location.pathname).toBe(ROUTES.SIGN_UP);
    });
});

describe("SignUpPage test", () => {
    it("render correctly", () => {
        const { asFragment } = render(<SignUpPage />);
        expect(asFragment()).toMatchSnapshot();
    });
});
