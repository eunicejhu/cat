import React from "react";
import { fireEvent } from "@testing-library/react";
import AddPostForm from "./AddPostForm";
import store, { useAppDispatch } from "../../store/index";
import { INITIAL_STATE } from "../../test/mock_data";

import renderWithStore from "../../test/renderWithStore";

// option1: manually mock store
jest.mock("../../store/index");
beforeEach(() => {
  store.getState = jest.fn(() => INITIAL_STATE);
});
beforeEach(() => {
  jest.clearAllMocks();
});

test("type text in title and content input, select a user from the dropdown of users, click save post button to add a post", async () => {
  const dispatch = jest.fn();
  useAppDispatch.mockReturnValue(dispatch);
  const { getByTestId, getByRole } = renderWithStore(<AddPostForm />, {
    store,
  });
  fireEvent.change(getByTestId("title"), { target: { value: "Title 3" } });
  fireEvent.change(getByTestId("content"), {
    target: { value: "Content 3" },
  });

  fireEvent.change(getByTestId("users"), { target: { value: "2" } });
  fireEvent.click(getByRole("button"));

  expect(dispatch).toHaveBeenCalledTimes(1);
});

// option2: use customRender
test("Both title, content and userId should be provided to enable the submission", () => {
  const dispatch = jest.fn();
  useAppDispatch.mockReturnValue(dispatch);
  const { getByTestId, getByRole } = renderWithStore(<AddPostForm />, {
    store,
  });
  fireEvent.change(getByTestId("title"), { target: { value: "Title 1" } });

  fireEvent.click(getByRole("button"));
  expect(getByRole("button").disabled).toBeTruthy();
  fireEvent.change(getByTestId("content"), {
    target: { value: "Content 1" },
  });
  fireEvent.click(getByRole("button"));
  expect(dispatch).toHaveBeenCalledTimes(0);
  fireEvent.change(getByTestId("users"), { target: { value: "1" } });
  fireEvent.click(getByRole("button"));
  expect(dispatch).toHaveBeenCalledTimes(1);
});
