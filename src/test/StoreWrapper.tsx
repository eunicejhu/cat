import React from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { store } from "./store";

// weakness: we lose the flexibility to pass in initialState
type StoreWrapperProps = { children?: React.ReactNode };
const StoreWrapper: React.FC<StoreWrapperProps> = ({
  children,
}: StoreWrapperProps) => <Provider store={store}>{children}</Provider>;
StoreWrapper.propTypes = {
  children: PropTypes.element,
};
StoreWrapper.defaultProps = {
  children: null,
};
export default StoreWrapper;
