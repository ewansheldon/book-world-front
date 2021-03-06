import React, { useState, useEffect } from "react";
import { withCookies } from "react-cookie";
import * as PropTypes from 'prop-types';
import NicoNewBook from "./NewBook/NewBook";
import NicoBooksTable from "./NicoBooksTable";
import EditBook from "./EditBook";
import { getBooks } from "../../api/Requests";
import { logOut, getToken } from "../../services/AuthService";
import Modal from "./Modal";

const styles = {
  addBookButton: {
    margin: 15,
    marginLeft: '5%',
    backgroundColor: '#a9fcc2',
    borderColor: '#c5fcc4',
    color: '#9f7da5'
  }
}

const Nico = ({cookies, setAuthorised}) => {
  const [books, setBooks] = useState([]);
  const [content, setContent] = useState();

  const addBookToList = book => {
    setBooks([...books, book]);
    setContent();
  }

  const replaceBook = book => {
    const updatedBooks = books.map(b => b.id === book.id ? book : b);

    setBooks(updatedBooks);
    setContent();
  }

  const keyDownEvent = ({keyCode}) => {
    if (keyCode === 27) {
      setContent();
    }
  }
  
  const addEscapeListener = _ => {
    addEventListener('keydown', keyDownEvent);
  }
  
  useEffect(() => {
    getBooks(getToken(cookies)).then(setBooks).catch(_ => {
      logOut(cookies);
      setAuthorised(false);
    });
    addEscapeListener();
  }, [])

  const renderNewBookForm = _ => {
    setContent(<NicoNewBook addBookToList={addBookToList} />);
  }

  const renderEditBookForm = book => {
    setContent(<EditBook book={book} replaceBook={replaceBook} />);
  }

  return (
    <>
      <button style={styles.addBookButton} onClick={renderNewBookForm}>Add new book</button>
      <NicoBooksTable books={books} editBook={renderEditBookForm} />
      {content && <Modal close={_ => setContent()} content={content} />}
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