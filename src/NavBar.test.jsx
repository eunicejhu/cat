import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";

const withBrowserRouterAndStore = (ui, route = "/initial") => {
    window.history.pushState({}, "", route);
    return (
        <BrowserRouter>
            <Provider store={store}>{ui}</Provider>
        </BrowserRouter>
    );
};

describe("NavBarNonAuth", () => {
    it("render correctly", () => {
        const ui = withBrowserRouterAndStore(<NavBar authUser={null} />);
        const { getByText } = render(ui);
        expect(getByText(/Landing/g)).toBeInTheDocument();
        expect(getByText(/Sign In/g)).toBeInTheDocument();
    });
});

describe("NavBarAuth", () => {
    it("renders correctly", () => {
        const ui = withBrowserRouterAndStore(<NavBar authUser={{}} />);
        const { asFragment } = render(ui);
        expect(asFragment()).toMatchSnapshot();
    });

    it("click Home, location pathname set to /home", () => {
        const ui = withBrowserRouterAndStore(<NavBar authUser={{}} />);
        const { getByText } = render(ui);
        fireEvent.click(getByText(/Home/i));
        expect(window.location.pathname).toBe("/home");
    });

    it("click Notifications, location pathname set to /notifications", () => {
        const ui = withBrowserRouterAndStore(<NavBar authUser={{}} />);
        const { getByText } = render(ui);
        fireEvent.click(getByText(/Notifications/i));
        expect(window.location.pathname).toBe("/notifications");
    });
});
