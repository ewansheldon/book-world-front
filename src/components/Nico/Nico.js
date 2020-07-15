import React, { useState, useEffect } from "react";
import { getAllCountries, createBook } from "../../api/Requests";

const Nico = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    getAllCountries().then(setCountries);
  }, [])

  const saveBook = e => {
    e.preventDefault();
    createBook({title, author, country}).then(res => {
      console.log(res);
    });
  }

  const countryOptions = countries.map((country, index) =>
    <option value={country.alpha3Code} key={index}>{country.name}</option>)

  return (
    <>
      <form onSubmit={saveBook}>
        <div>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input id="author" type="text" value={author} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div>
          <select value={country} onChange={e => setCountry(e.target.value)}>
            <option value=''></option>
            {countryOptions}
          </select>
        </div>
        <div>
          <input type="submit" disabled={!country} />
        </div>
      </form>
    </>
  )
}

export default Nico;