import React, { useState, useEffect } from "react";
import { getBooks } from "../../api/Requests";
import { withCookies } from "react-cookie";
import { getToken, logOut } from "../../services/AuthService.js"
import * as PropTypes from 'prop-types';
import NicoNewBook from "./NicoNewBook";

const Nico = ({cookies, setAuthorised}) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks(getToken(cookies)).then(setBooks).catch(_ => {
      logOut(cookies);
      setAuthorised(false);
    });
  }, [])

  const booksList = books.map((book, index) => {
    return (
      <tr key={index}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.country}</td>
      </tr>
    )
  });

  const addBookToList = book => {
    setBooks([...books, book]);
  }

  return (
    <>
      <NicoNewBook addBookToList={addBookToList} />
      <hr/>
      <table>
        <caption>BOOKS</caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {booksList}
        </tbody>
      </table>
    </>
  )
}

const cookies = PropTypes.shape({
    get: PropTypes.func.isRequired,
});

Nico.propTypes = {
    cookies: cookies.isRequired,
    setAuthorised: PropTypes.func.isRequired
};

export default withCookies(Nico);