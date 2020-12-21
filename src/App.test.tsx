import React from "react";
import { render } from "@testing-library/react";
import App, { useAuthUser } from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";
import Firebase, { FirebaseContext } from "../src/components/Firebase";

import { themes } from "./components/Theme";
import { renderHook } from "@testing-library/react-hooks";
let mockOnAuthStateChanged = jest.fn().mockReturnValue(jest.fn());
jest.mock("../src/components/Firebase", () => ({
    __esModule: true,
    ...(jest.requireActual("../src/components/Firebase") as object),
    default: function () {
        return {
            auth: {
                onAuthStateChanged: mockOnAuthStateChanged,
            },
        };
    },
}));
describe("App", () => {
    it("useAuthUser", () => {
        const firebase = new Firebase();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <FirebaseContext.Provider value={firebase}>
                {children}
            </FirebaseContext.Provider>
        );
        renderHook(() => useAuthUser(), { wrapper });
        expect(mockOnAuthStateChanged).toHaveBeenCalledTimes(1);
    });

    it("render correctly", () => {
        const ui = (
            <FirebaseContext.Provider value={new Firebase()}>
                <Provider store={store}>
                    <BrowserRouter>
                        <App
                            themes={themes}
                            mode={"pink"}
                            setMode={jest.fn()}
                        />
                    </BrowserRouter>
                </Provider>
            </FirebaseContext.Provider>
        );
        const { asFragment } = render(ui);
        expect(asFragment()).toMatchSnapshot();
    });
});
