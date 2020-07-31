import React, { useState, useEffect } from "react";
import * as PropTypes from 'prop-types';
import { withCookies } from "react-cookie";
import { getAllCountries, updateBook } from "../../api/Requests";
import { getToken } from "../../services/AuthService";

const styles = {
  input: {
    margin: 5
  },
  textarea: {
    borderWidth: 0.5,
    resize: 'none',
    fontSize: 11,
    fontFamily: 'arial'
  },
  delete: {
    backgroundColor: '#fc7876',
    borderColor: '#fc7876',
    color: '#fcfcfc'
  },
  actions: {
    paddingTop: 10,
    display: 'inline-flex'
  },
  thumbnail: {
    div: {
      display: 'inline-flex'
    },
    arrow: {
      margin: 8
    },
    input: {
      maxHeight: 13.5
    },
    helper: {
      fontSize: 11,
      fontStyle: 'italic',
      color: 'grey'
    },
    linkDiv: {
      maxWidth: 150
    },
    image: {
      maxWidth: 140
    }
  }
}

const EditBook = ({ book, cookies, replaceBook }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [country, setCountry] = useState(book.country);
  const [description, setDescription] = useState(book.description);
  const [thumbnail, setThumbnail] = useState(book.thumbnail);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(_ => {
    getAllCountries().then(setAllCountries);
  }, []);

  const saveBook = e => {
    e.preventDefault();
    updateBook({ ...book, title, author, country, description, thumbnail }, getToken(cookies)).then(replaceBook);
  };

  const deleteBook = _ => {
    console.log('delet this')
  }

  const countryOptions = allCountries.map((country, index) =>
    <option value={country.alpha3Code} key={index}>{country.name}</option>);

  const bookUnchanged = _ => {
    return title === book.title && author === book.author && country === book.country && description === book.description && thumbnail === book.thumbnail;
  }

  const bookInvalid = _ => {
    return !title || !author || !country || !description || !thumbnail;
  }

  const updateDisabled = _ => {
    return (bookInvalid() || bookUnchanged())
  }

  return (
    <>
      <div>
        <input style={styles.input} id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <input style={styles.input} id="author" type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <select style={styles.input} id="country" value={country} onChange={e => setCountry(e.target.value)}>
          <option value=''></option>
          {countryOptions}
        </select>
      </div>
      <div>
        <textarea style={{ ...styles.input, ...styles.textarea }} id="description" type="text" rows="4" cols="60" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div style={styles.thumbnail.div}>
        <div style={styles.thumbnail.linkDiv}>
          <input style={{ ...styles.input, ...styles.thumbnail.input }} id="thumbnail" type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
          <p style={{ ...styles.input, ...styles.thumbnail.helper }}>paste a direct link to a photo, and you should see a preview of it on the right (otherwise you've done something wrong)</p>
        </div>
        <p style={styles.thumbnail.arrow}>➜</p><img style={styles.thumbnail.image} src={thumbnail}></img>
      </div>
      <div style={styles.actions}>
        <form onSubmit={saveBook}>
          <input style={styles.input} value="Update Book" type="submit" disabled={updateDisabled()} />
        </form>
        <button style={{ ...styles.input, ...styles.delete }} onClick={deleteBook}>Delete Book</button>
      </div>
    </>
  )
}

const cookies = PropTypes.shape({
  get: PropTypes.func.isRequired,
});

const book = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
});

EditBook.propTypes = {
  book: book.isRequired,
  cookies: cookies.isRequired,
  replaceBook: PropTypes.func.isRequired
}

export default withCookies(EditBook);