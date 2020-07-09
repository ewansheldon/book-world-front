import React from 'react';
import * as PropTypes from 'prop-types';

const BookInfo = ({book}) => {
    if (book) {
        return (
            <div className="book-info">
                <div className="book-info--header">
                    <div className="book-info--header--title">
                        <h2>{book.title}</h2>
                        <h3>by {book.author}</h3>
                    </div>
                    <img
                        src={book.thumbnail}/>
                </div>
                <p>{book.description}</p>
            </div>
        )
    }

    return null;
}

const book = PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    description: PropTypes.string,
    thumbnail: PropTypes.string
});

BookInfo.propTypes = {
    book: book
};

export default BookInfo;
