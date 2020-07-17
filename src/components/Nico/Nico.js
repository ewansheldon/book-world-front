import React, { useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import * as PropTypes from 'prop-types';
import NicoNewBook from "./NicoNewBook";
import NicoBooksTable from "./NicoBooksTable";
import { getBooks } from "../../api/Requests";
import { logOut, getToken } from "../../services/AuthService";

const Nico = ({cookies, setAuthorised}) => {
  const [books, setBooks] = useState([]);

  const addBookToList = book => {
    setBooks([...books, book]);
  }
  
  useEffect(() => {
    getBooks(getToken(cookies)).then(setBooks).catch(_ => {
      logOut(cookies);
      setAuthorised(false);
    });
  }, [])

  return (
    <>
      <NicoNewBook addBookToList={addBookToList} />
      <hr/>
      <NicoBooksTable books={books} />
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