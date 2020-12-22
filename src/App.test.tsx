import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";
import Firebase, { FirebaseContext } from "../src/components/Firebase";
import { themes } from "./components/Theme";
import { ThemeContext } from "styled-components";

describe("App", () => {
    it("render correctly", () => {
        const ui = (
            <FirebaseContext.Provider value={new Firebase()}>
                <ThemeContext.Provider
                    value={{ themes, mode: "pink", setMode: jest.fn() }}
                >
                    <Provider store={store}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </Provider>
                </ThemeContext.Provider>
            </FirebaseContext.Provider>
        );
        const { asFragment } = render(ui);
        expect(asFragment()).toMatchSnapshot();
    });
});
