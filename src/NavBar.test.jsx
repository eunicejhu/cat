import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { AuthUserContext } from "./components/Session";

const withBrowserRouterAndStoreAndAuth = (
    ui,
    authUser = null,
    route = "/initial"
) => {
    window.history.pushState({}, "", route);
    return (
        <AuthUserContext.Provider value={authUser}>
            <BrowserRouter>
                <Provider store={store}>{ui}</Provider>
            </BrowserRouter>
        </AuthUserContext.Provider>
    );
};
const mockAuthUser = {};
describe("NavBarNonAuth", () => {
    it("render correctly", () => {
        const ui = withBrowserRouterAndStoreAndAuth(<NavBar />);
        const { getByText } = render(ui);
        expect(getByText(/Landing/g)).toBeInTheDocument();
        expect(getByText(/Sign In/g)).toBeInTheDocument();
    });
});

describe("NavBarAuth", () => {
    it("renders correctly", () => {
        const ui = withBrowserRouterAndStoreAndAuth(<NavBar />, mockAuthUser);
        const { asFragment } = render(ui);
        expect(asFragment()).toMatchSnapshot();
    });

    it("click Home, location pathname set to /home", () => {
        const ui = withBrowserRouterAndStoreAndAuth(<NavBar />, mockAuthUser);
        const { getByText } = render(ui);
        fireEvent.click(getByText(/Home/i));
        expect(window.location.pathname).toBe("/home");
    });

    it("click Notifications, location pathname set to /notifications", () => {
        const ui = withBrowserRouterAndStoreAndAuth(<NavBar />, mockAuthUser);
        const { getByText } = render(ui);
        fireEvent.click(getByText(/Notifications/i));
        expect(window.location.pathname).toBe("/notifications");
    });
});
