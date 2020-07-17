import React, { useState } from "react";
import * as PropTypes from 'prop-types';

const styles = {
    'books--table': {
        border: '1px solid black'
    },
    'books--table--tr': {
        cursor: 'pointer'
    },
    'books--table--tr--hovered': {
        cursor: 'pointer',
        backgroundColor: 'pink'
    }
}

const NicoBooksTable = ({books}) => {
    const [hovered, setHovered] = useState();

    const booksList = books.map((book, index) => {
      const abbreviate = text => {
        if (text.length > 100) {
          return text.substring(0, 97) + '...';
        }
  
        return text;
      }
  
      return (
        <tr onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered()}
            onClick={console.log} key={index}
            style={hovered === index ? styles["books--table--tr--hovered"] : styles["books--table--tr"]}>
          <td>{book.title}</td>
          <td>{book.author}</td>
          <td>{book.country}</td>
          <td>{abbreviate(book.description)}</td>
        </tr>
      )
    });

    return (
        <table style={styles["books--table"]}>
          <caption>BOOKS</caption>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Country</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {booksList}
          </tbody>
        </table>
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
    books: PropTypes.arrayOf(book).isRequired
};


export default NicoBooksTable;