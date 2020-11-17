import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, StoreCreator } from "@reduxjs/toolkit";
import { INITIAL_STATE } from "./mock_data";
import { rootReducer } from "./store";
import { State } from "../store/index";

type RenderOptions = {
  initialState?: State;
  store?: ReturnType<StoreCreator>;
  route?: string;
};
const renderWithStoreAndRouter = (
  ui: React.ReactElement,
  {
    initialState = INITIAL_STATE,
    store = createStore(rootReducer, initialState),
    route = "/",
  }: RenderOptions = {}
) => {
  window.history.pushState({}, "Home", route);
  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );

  return render(ui, { wrapper });
};

export default renderWithStoreAndRouter;
