import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { fireEvent } from "@testing-library/react";
import { getByTestId } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import ConfirmPasswordInput from "./ConfirmPasswordInput";

let container;
beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
});
afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("validate password when input password,", () => {
  const validate = jest.fn();

  act(() => {
    render(<ConfirmPasswordInput validate={validate} />, container);
  });

  const passwordInput = getByTestId(container, "password");

  fireEvent.change(passwordInput, { target: { value: "******" } });

  expect(validate).toHaveBeenCalledTimes(1);
});

it("show error when password is invalid", () => {
  const ERROR_MESSAGE = "Password is invalid";
  const validate = jest.fn();
  validate.mockReturnValueOnce(ERROR_MESSAGE);

  act(() => {
    render(<ConfirmPasswordInput validate={validate} />, container);
  });
  const passwordInput = getByTestId(container, "password");
  const error = getByTestId(container, "error_pwd");

  fireEvent.change(passwordInput, { target: { value: "****" } });

  expect(validate).toHaveBeenCalledTimes(1);
  expect(error).toHaveTextContent(ERROR_MESSAGE);
});

it("Show error when confirmation is not identical to password", () => {
  const ERROR = "Password is not identical";
  const setValue = jest.fn();

  act(() => {
    render(<ConfirmPasswordInput setValue={setValue} />, container);
  });

  const passwordInput = getByTestId(container, "password");
  const confirmPasswordInput = getByTestId(container, "password_confirmation");
  const error = getByTestId(container, "error_confirmPwd");

  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "ddsfsd" } });

  expect(error).toHaveTextContent(ERROR);
  expect(setValue).toHaveBeenLastCalledWith("");
});

it("Clear confirmation and error when modify password", () => {
  act(() => {
    render(<ConfirmPasswordInput />, container);
  });

  const passwordInput = getByTestId(container, "password");
  const confirmPasswordInput = getByTestId(container, "password_confirmation");
  const errorConfirmPwd = getByTestId(container, "error_confirmPwd");

  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "1234s" } });
  fireEvent.change(passwordInput, { target: { value: "78888" } });

  expect(confirmPasswordInput).toHaveValue("");
  expect(errorConfirmPwd).toBeEmpty();
});

it("clear error when confirmation is identical to password", () => {
  const setValue = jest.fn();

  act(() => {
    render(<ConfirmPasswordInput setValue={setValue} />, container);
  });

  const passwordInput = getByTestId(container, "password");
  const confirmPasswordInput = getByTestId(container, "password_confirmation");
  const errorConfirmPwd = getByTestId(container, "error_confirmPwd");

  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "12345" } });
  expect(setValue).toHaveBeenCalledTimes(1);
  expect(errorConfirmPwd).not.toBeEmpty();

  fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
  expect(setValue).toHaveBeenCalledTimes(2);
  expect(errorConfirmPwd).toBeEmpty();
});
