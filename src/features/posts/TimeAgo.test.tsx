import React from "react";
import renderer from "react-test-renderer";
import TimeAgo from "./TimeAgo";

jest.mock("../../utils/getTimeAgo.ts", () =>
  jest.fn().mockReturnValue("28 minutes")
);
test("render correctly", () => {
  const date = "2020-11-15T16:16:08.493Z";
  const tree = renderer.create(<TimeAgo date={date} />).toJSON();
  expect(tree).toMatchSnapshot();
});
