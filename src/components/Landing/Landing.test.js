import "@testing-library/jest-dom";
import React from "react";
import {act, render} from "@testing-library/react";
import Landing from "./Landing.js";

global.fetch = jest.fn(() => {
  let countries = ["GBR"];
  return Promise.resolve({
        json: () => Promise.resolve(countries)
      });
    }
)

describe("landing page", () => {
  it("says the name of the app", async () => {
    await act(async () => {
      const { getByText } = render(<Landing/>);
      getByText("nico's book world");
    })
  });
});
