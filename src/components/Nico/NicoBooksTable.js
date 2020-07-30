import React, { useState } from "react";
import * as PropTypes from 'prop-types';

const styles = {
  'books': {
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '90%'
  },
  'books--table': {
    border: '1px solid black'
  },
  'books--table-row': {
    cursor: 'pointer'
  },
  'books--table-row--hovered': {
    cursor: 'pointer',
    backgroundColor: '#c7fffd'
  },
  'books--table-head': {
    width: '20%',
  },
  'books--table-head--country': {
    width: '10%',
  },
  'books--table-head--description': {
    width: '50%',
  }
}

const NicoBooksTable = ({ books, editBook }) => {
  const [hovered, setHovered] = useState();

  const booksList = books.map((book, index) => {
    const abbreviate = text => {
      if (text.length > 85) {
        return text.substring(0, 82) + '...';
      }
      return text;
    }

    const rowStyle = _ => {
      return hovered === index ? styles["books--table-row--hovered"] : styles["books--table-row"]
    }

    return (
      <tr onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered()}
        key={index}
        style={rowStyle()}
        onClick={_ => editBook(book)}>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.country}</td>
        <td>{abbreviate(book.description)}</td>
      </tr>
    )
  });

  return (
    <div style={styles["books"]}>
      <table style={styles["books--table"]}>
        <caption>BOOKS</caption>
        <thead>
          <tr>
            <th style={styles["books--table-head"]}>Title</th>
            <th style={styles["books--table-head"]}>Author</th>
            <th style={styles["books--table-head--country"]}>Country</th>
            <th style={styles["books--table-head--description"]}>Description</th>
          </tr>
        </thead>
        <tbody>
          {booksList}
        </tbody>
      </table>
    </div>
  )
}

const book = PropTypes.shape({
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired
})

NicoBooksTable.propTypes = {
  books: PropTypes.arrayOf(book).isRequired,
  editBook: PropTypes.func.isRequired
};


export default NicoBooksTable;