import '@testing-library/jest-dom';
import React from 'react';
import {act, render, waitFor, fireEvent} from '@testing-library/react';
import {
  toBeDisabled
} from '@testing-library/jest-dom/matchers'
import Nico from './Nico.js';

expect.extend({toBeDisabled})

const countries = [{
  alpha3Code: 'GBR',
  name: 'United Kingdom'
}, {
  alpha3Code: 'RUS',
  name: 'Russia'
}]

const books = [{
    title: 'Vile Bodies',
    author: 'Evelyn Waugh',
    country: 'GBR',
    description: 'description of Vile Bodies',
    thumbnail: 'vile-bodies-thumbnail.jpg'
}, {
    title: 'Master and Margarita',
    author: 'Mikhail Bulgakov',
    country: 'RUS',
    description: 'description of Master and Margarita',
    thumbnail: 'master-margarita-thumbnail.jpg'
}];

const fetchResponse = data => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    ok: true
  });
}

beforeEach(() => {
  global.fetch = jest.fn();
  global.fetch.mockReturnValueOnce(fetchResponse(countries))
    .mockReturnValue(fetchResponse(books));
});


const renderNico = _ => {
  const props = {
    cookies: {
      get: () => {},
      getAll: () => {},
      remove: () => {},
      removeChangeListener: () => {},
      addChangeListener: () => {}
    },
    setAuthorised: () => {}
  };

  return render(<Nico {...props} />);
}

describe('new book form', () => {
  it('renders card form', async () => {
    await act(async () => {
      const { getByText } = renderNico();
      getByText('Title:');
      getByText('Author:');
      getByText('Country:');
    })
  });

  it('disables submit button until form complete', async () => {
    await act(async () => {
      const { getByText } = renderNico();
      expect(getByText('Save Book')).toBeDisabled()
    });
  });
});

describe('books list', () => {
  it('shows the books data', async () => {
    await act(async () => {
      const { getByText } = renderNico();
      await waitFor(() => {
        getByText(books[0].title);
        getByText(books[0].author);
        getByText(books[0].country);

        getByText(books[1].title);
        getByText(books[1].author);
        getByText(books[1].country);
      });
    });
  });
});