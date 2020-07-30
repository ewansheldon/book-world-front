import React, { useState, useEffect } from "react";
import * as PropTypes from 'prop-types';
import { withCookies } from "react-cookie";
import { getAllCountries } from "../../api/Requests";

const NewBook = ({ book, cookies }) => {
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
    // createBook({title, author, country}, getToken(cookies)).then(book => {
    //   addBookToList(book);
    // });
  };

  const countryOptions = allCountries.map((country, index) =>
    <option value={country.alpha3Code} key={index}>{country.name}</option>);

  return (
    <form onSubmit={saveBook}>
      <div>
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input id="author" type="text" value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <select id="country" value={country} onChange={e => setCountry(e.target.value)}>
          <option value=''></option>
          {countryOptions}
        </select>
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" type="text" rows="4" cols="50" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="thumbnail">Thumbnail:</label>
        <input id="thumbnail" type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} />
      </div>
      <div>
        <input value="Save Book" type="submit" disabled={!title || !author || !country} />
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

NewBook.propTypes = {
  book: book.isRequired
}

export default withCookies(NewBook);