import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import PostAuthor from "./PostAuthor";
import StoreWrapper from "../../test/StoreWrapper";

test("render correctly", () => {
  const tree = renderer
    .create(
      <StoreWrapper>
        <PostAuthor userId="2" />
      </StoreWrapper>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("show By Unknown author if user does not exist", () => {
  const { getByText } = render(
    <StoreWrapper>
      <PostAuthor userId="unknown" />
    </StoreWrapper>
  );
  expect(getByText(/Unknown author/i)).toBeInTheDocument();
});
