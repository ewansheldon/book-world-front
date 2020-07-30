import React, { useState, useEffect } from "react";
import * as PropTypes from 'prop-types';
import { withCookies } from "react-cookie";
import { getAllCountries } from "../../api/Requests";

const styles = {
  input: {
    margin: 5
  },
  textarea: {
    margin: 5,
    borderWidth: 0.5,
    resize: 'none',
    fontSize: 11,
    fontFamily: 'arial'
  }
}

const EditBook = ({ book, cookies }) => {
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
    console.log(title, author, country);
  };

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
    <form onSubmit={saveBook}>
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
        <textarea style={styles.textarea} id="description" type="text" rows="4" cols="60" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <input style={styles.input} id="thumbnail" type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
      </div>
      <div>
        <input style={styles.input} value="Save Book" type="submit" disabled={updateDisabled()} />
      </div>
    </form>
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
  book: book.isRequired
}

export default withCookies(EditBook);