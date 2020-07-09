import {act, render} from "@testing-library/react";
import React from "react";
import Book from "./Book";
import {getByText, queryByText} from "@testing-library/dom";
import '@testing-library/jest-dom/extend-expect';

const defaultBook = {
  title: "Vile Bodies",
  author: "Evelyn Waugh",
  description: "book description",
  thumbnail: "book-thumbnail"
}

function renderBook(args) {
  const defaultProps = {
    book: defaultBook
  };

  const props = { ...defaultProps, ...args };
  return render(<Book {...props} />);
}

describe("book info section", () => {
  it("displays given book data", async () => {
    await act(async () => {
      const { queryByText } = renderBook();
      expect(queryByText(`by ${defaultBook.author}`)).toBeInTheDocument();
      expect(queryByText(defaultBook.title)).toBeInTheDocument();
      expect(queryByText(defaultBook.description)).toBeInTheDocument();
    })
  });

  it("displays nothing when no book data given", async () => {
    await act(async () => {
      const {queryByText} = renderBook({book: null});
      expect(queryByText(`by ${defaultBook.author}`)).not.toBeInTheDocument();
      expect(queryByText(defaultBook.title)).not.toBeInTheDocument();
      expect(queryByText(defaultBook.description)).not.toBeInTheDocument();
    });
  });
});