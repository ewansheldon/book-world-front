import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";

describe("Landing", _ => {
  it("says the name of the app", _ => {
    const landing = render(<Landing />);
    const welcome = landing.queryByText("nico's book world");
    expect(welcome).toBeInTheDocument();
  });
});
