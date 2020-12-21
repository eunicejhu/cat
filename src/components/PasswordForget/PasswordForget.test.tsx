import React from "react";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import { PasswordForgetForm } from "./index";
import Firebase, { FirebaseContext } from "../Firebase";
import { PasswordForgetLink } from "../PasswordForget";

const firebase = new Firebase();
let mockDoPasswordReset: jest.SpyInstance = jest.spyOn(
    firebase,
    "doPasswordReset"
);
beforeEach(() => {
    mockDoPasswordReset.mockClear();
});

it("submit success", () => {
    const ui = (
        <FirebaseContext.Provider value={firebase}>
            <PasswordForgetForm />
        </FirebaseContext.Provider>
    );
    const { getByTestId } = render(ui);
    const emailInput = getByTestId("email");
    const submitButton = getByTestId("submit");
    user.type(emailInput, "eunicejhu@gmail.com");
    user.click(submitButton);
    expect(mockDoPasswordReset).toHaveBeenCalledWith("eunicejhu@gmail.com");
});

it("submit failure", async () => {
    mockDoPasswordReset.mockRejectedValue(new Error("Oops"));
    const ui = (
        <FirebaseContext.Provider value={firebase}>
            <PasswordForgetForm />
        </FirebaseContext.Provider>
    );
    const { getByTestId, findByText } = render(ui);
    const submitButton = getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();
    user.type(getByTestId("email"), "eunicejhu@gmail.com");
    user.click(submitButton);
    expect(await findByText(/Oops/g)).toBeInTheDocument();
});

it("PasswordForget Link", () => {
    const ui = (
        <BrowserRouter>
            <PasswordForgetLink />
        </BrowserRouter>
    );

    const { getByTestId } = render(ui);
    user.click(getByTestId("passwordForgetLink"));
    expect(window.location.pathname).toBe("/pw-forget");
});
