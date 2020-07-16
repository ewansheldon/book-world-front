import React, { useState, useEffect } from "react";
import { getAllCountries, createBook, getBooks } from "../../api/Requests";

const Nico = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [books, setBooks] = useState([]);
  const [country, setCountry] = useState('');

  useEffect(() => {
    getAllCountries().then(setAllCountries);
    getBooks().then(setBooks);
  }, [])

  const saveBook = e => {
    e.preventDefault();
    createBook({title, author, country}).then(res => {
      console.log(res);
    });
  }

  console.log(books);

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
      <table>
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

export default Nico;