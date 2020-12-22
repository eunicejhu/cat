import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderHook } from "@testing-library/react-hooks";
import useAuthorization from "./useAuthorization";
import * as ROUTES from "../../constants/routes";
import AuthUserContext from "./context";

describe("useAuthorization", () => {
    beforeEach(() => {
        window.history.pushState({}, "Landing", ROUTES.LANDING);
    });

    it("not authorized", () => {
        const wrapper = ({ children }) => (
            <AuthUserContext.Provider value={null}>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthUserContext.Provider>
        );
        renderHook(() => useAuthorization(), { wrapper });
        expect(window.location.pathname).toBe(ROUTES.SIGN_IN);
    });

    it("authorized", () => {
        const wrapper = ({ children }) => (
            <AuthUserContext.Provider value={{}}>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthUserContext.Provider>
        );
        renderHook(() => useAuthorization(), { wrapper });
        expect(window.location.pathname).toBe(ROUTES.LANDING);
    });

    it("authorize only admin-role user", () => {
        const condition = (user) => user.role === "admin";
        window.history.pushState({}, "Account Page", ROUTES.ACCOUNT);
        const wrapper = ({ children }) => (
            <AuthUserContext.Provider value={{ role: "admin" }}>
                <BrowserRouter>{children}</BrowserRouter>
            </AuthUserContext.Provider>
        );
        renderHook(() => useAuthorization(condition), { wrapper });
        expect(window.location.pathname).toBe(ROUTES.ACCOUNT);
    });
});
