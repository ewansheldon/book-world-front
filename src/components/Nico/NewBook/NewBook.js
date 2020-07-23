import React, { useState, useEffect } from "react";
import * as PropTypes from 'prop-types';
import { getAllCountries, createBook } from "../../../api/Requests";
import { getToken } from "../../../services/AuthService.js"
import { withCookies } from "react-cookie";

const NewBook = ({addBookToList, cookies}) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [country, setCountry] = useState('');
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        getAllCountries().then(setAllCountries);
    }, []);

    const saveBook = e => {
      e.preventDefault();
      createBook({title, author, country}, getToken(cookies)).then(book => {
        addBookToList(book)
        setTitle('');
        setAuthor('');
        setCountry('');
      });
    }

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
            <input value="Save Book" type="submit" disabled={!title || !author || !country} />
          </div>
        </form>
    )
}

const cookies = PropTypes.shape({
    get: PropTypes.func.isRequired,
});

NewBook.propTypes = {
    cookies: cookies.isRequired,
    addBookToList: PropTypes.func.isRequired
}

export default withCookies(NewBook);