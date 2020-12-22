import React from "react";
import { render, act } from "@testing-library/react";
import user from "@testing-library/user-event";

import PasswordChangeForm from "./index";
import Firebase, { FirebaseContext } from "../Firebase";

const firebase = new Firebase();
let mockDoPasswordUpdate: jest.SpyInstance = jest.spyOn(
    firebase,
    "doPasswordUpdate"
);

beforeEach(() => {
    mockDoPasswordUpdate.mockClear();
    jest.useFakeTimers();
});

afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
});

it("submit success", async () => {
    jest.useFakeTimers();
    const ui = (
        <FirebaseContext.Provider value={firebase}>
            <PasswordChangeForm />
        </FirebaseContext.Provider>
    );
    const { getByTestId, findByTestId } = render(ui);
    const password1Input = getByTestId("password1");
    const password2Input = getByTestId("password2");
    const submitButton = getByTestId("submit");
    user.type(password1Input, "1234");
    user.type(password2Input, "1234");
    user.click(submitButton);
    expect(mockDoPasswordUpdate).toHaveBeenCalledWith("1234");

    expect(await findByTestId("submit")).toHaveTextContent("Success!");
    act(() => {
        jest.advanceTimersByTime(1000);
    });
    expect(await findByTestId("submit")).toHaveTextContent("Reset Password");
});

it("submit failure", async () => {
    mockDoPasswordUpdate.mockRejectedValue(new Error("Oops"));
    const ui = (
        <FirebaseContext.Provider value={firebase}>
            <PasswordChangeForm />
        </FirebaseContext.Provider>
    );
    const { getByTestId, findByText } = render(ui);
    const password1Input = getByTestId("password1");
    const password2Input = getByTestId("password2");
    const submitButton = getByTestId("submit") as HTMLButtonElement;
    user.type(password1Input, "1234");
    user.type(password2Input, "123");
    expect(submitButton).toBeDisabled();
    user.type(password2Input, "1234");
    user.click(submitButton);
    expect(await findByText(/Oops/g)).toBeInTheDocument();
});
