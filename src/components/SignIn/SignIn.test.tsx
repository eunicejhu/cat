import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import SignInPage from "./index";
import Firebase, { FirebaseContext } from "../Firebase";

describe("SignIn page", () => {
    let firebase = new Firebase();
    let doSignInWithEmailAndPasswordMock: jest.SpyInstance = jest.spyOn(
        firebase,
        "doSignInWithEmailAndPassword"
    );

    beforeEach(() => {
        doSignInWithEmailAndPasswordMock.mockClear();
    });
    it("form submit success", async () => {
        doSignInWithEmailAndPasswordMock.mockResolvedValue({
            name: "isabella",
        });
        const ui = (
            <FirebaseContext.Provider value={firebase}>
                <BrowserRouter>
                    <SignInPage />
                </BrowserRouter>
            </FirebaseContext.Provider>
        );
        const { getByTestId, findByTestId } = render(ui);
        const EmailInput = getByTestId("email");
        const PasswordInput = getByTestId("password");
        const SubmitButton = getByTestId("submit");

        user.type(EmailInput, "eunicejhu@gmail.com");
        user.type(PasswordInput, "*****");
        user.click(SubmitButton);
        expect(doSignInWithEmailAndPasswordMock).toHaveBeenCalledWith(
            "eunicejhu@gmail.com",
            "*****"
        );
        expect(await findByTestId("email")).toHaveValue("");
        expect(await findByTestId("password")).toHaveValue("");
        expect(window.location.pathname).toBe("/account");
    });
    it("form submit failure", async () => {
        doSignInWithEmailAndPasswordMock.mockRejectedValue(
            new Error("Failed to signin")
        );
        const ui = (
            <FirebaseContext.Provider value={firebase}>
                <BrowserRouter>
                    <SignInPage />
                </BrowserRouter>
            </FirebaseContext.Provider>
        );
        const { getByTestId, findByText } = render(ui);
        const EmailInput = getByTestId("email");
        const PasswordInput = getByTestId("password");
        const SubmitButton = getByTestId("submit");

        user.type(EmailInput, "eunicejhu@gmail.com");
        user.type(PasswordInput, "*****");
        user.click(SubmitButton);
        expect(doSignInWithEmailAndPasswordMock).toHaveBeenCalledWith(
            "eunicejhu@gmail.com",
            "*****"
        );
        expect(await findByText(/Failed to sign in/g)).toBeInTheDocument();
    });
});
