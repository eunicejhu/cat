import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index";
import Firebase, { FirebaseContext } from "../src/components/Firebase";

import { themes } from "./components/Theme";

it("render correctly", () => {
    const ui = (
        <FirebaseContext.Provider value={new Firebase()}>
            <Provider store={store}>
                <BrowserRouter>
                    <App themes={themes} mode={"pink"} setMode={jest.fn()} />
                </BrowserRouter>
            </Provider>
        </FirebaseContext.Provider>
    );
    const { asFragment } = render(ui);
    expect(asFragment()).toMatchSnapshot();
});
