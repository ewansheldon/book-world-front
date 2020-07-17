import React, { useState, useEffect } from "react";
import { getAllCountries, createBook, getBooks } from "../../api/Requests";
import { withCookies } from "react-cookie";
import { getToken, logOut } from "../../services/AuthService.js"
import * as PropTypes from 'prop-types';

const Nico = ({cookies, setAuthorised}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [country, setCountry] = useState('');
  const [books, setBooks] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    getAllCountries().then(setAllCountries);
    getBooks(getToken(cookies)).then(setBooks).catch(_ => {
      logOut(cookies);
      setAuthorised(false);
    });
  }, [])

  const saveBook = e => {
    e.preventDefault();
    createBook({title, author, country}, getToken(cookies)).then(book => {
      setBooks([...books, book])
      setTitle('');
      setAuthor('');
      setCountry('');
    });
  }

  const countryOptions = allCountries.map((country, index) =>
    <option value={country.alpha3Code} key={index}>{country.name}</option>);

  const booksList = books.map((book, index) => {
    return (
      <tr key={index}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.country}</td>
      </tr>
    )
  });

  return (
    <>
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
          <input value="Save Book" type="submit" disabled={!title || !author || !country} />
        </div>
      </form>
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