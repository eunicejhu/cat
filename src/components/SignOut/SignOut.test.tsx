import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";
import SignOutButton from "./index";
import Firebase, { FirebaseContext } from "../Firebase";

const firebase = new Firebase();
const doSignOutMock = jest.spyOn(firebase, "doSignOut");
it("SignOutButton", () => {
    const ui = (
        <FirebaseContext.Provider value={firebase}>
            <BrowserRouter>
                <SignOutButton />
            </BrowserRouter>
        </FirebaseContext.Provider>
    );
    const { getByTestId } = render(ui);
    user.click(getByTestId("signout"));
    expect(doSignOutMock).toHaveBeenCalledTimes(1);
    expect(window.location.pathname).toBe("/");
});
