import "@testing-library/jest-dom";
import React from "react";
import {act, render, waitFor} from "@testing-library/react";
import Nico from "./Nico.js";

const books = [{
    title: "Vile Bodies",
    author: "Evelyn Waugh",
    country: "GBR",
    description: "description of Vile Bodies",
    thumbnail: "vile-bodies-thumbnail.jpg"
}];

global.fetch = jest.fn(() => {

  return Promise.resolve({
        json: () => Promise.resolve(books)
      });
});

describe("nico's page", () => {
  it("says the name of the app", async () => {
    await act(async () => {
      const { getByText } = render(<Nico/>);
      await waitFor(() => {
        getByText(books[0].title);
        getByText(books[0].author);
        getByText(books[0].country);
      });
    });
  });
});