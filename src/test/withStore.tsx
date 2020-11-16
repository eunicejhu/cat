import React from "react";
import { Provider } from "react-redux";
import store from "../store/index";

type Props = {};
const withStore = (Component: React.JSXElementConstructor<Props>) => (
  props: Props
) => (
  <Provider store={store}>
    <Component {...props} />
  </Provider>
);

export default withStore;
