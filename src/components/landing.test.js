import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import Landing from "./landing";

describe("something", () => {
  it("says the name of the app", () => {
    const landing = render(<Landing />);
    const welcome = landing.queryByText("nico's book world");
    expect(welcome).toBeInTheDocument();
  });
});
