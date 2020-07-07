import "@testing-library/jest-dom";
import React from "react";
import {render} from "@testing-library/react";
import Landing from "./Landing.js";

describe("something", () => {
  it("says the name of the app", () => {
    // TODO mock fetch to fix this test
    const landing = render(<Landing />);
    const welcome = landing.queryByText("nico's book world");
    expect(welcome).toBeInTheDocument();
  });
});
