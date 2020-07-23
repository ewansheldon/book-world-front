import React from 'react';
import { render, act } from '@testing-library/react';
import NewBook from './NewBook.js';
import {
  toBeDisabled
} from '@testing-library/jest-dom/matchers'

expect.extend({toBeDisabled});

const countries = [{
    alpha3Code: 'GBR',
    name: 'United Kingdom'
}, {
    alpha3Code: 'RUS',
    name: 'Russia'
}];

const fetchResponse = data => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
    ok: true
  });
}

beforeEach(() => {
    global.fetch = jest.fn();
    global.fetch.mockReturnValueOnce(fetchResponse(countries));
});

const renderNewBookForm = _ => {
    const props = {
        cookies: {
            get: () => { },
            getAll: () => { },
            remove: () => { },
            removeChangeListener: () => { },
            addChangeListener: () => { }
        },
        addBookToList: () => { }
    };

    return render(<NewBook {...props} />)
}

describe('new book form', () => {
    it('renders card form', async () => {
        await act(async () => {
            const { getByText } = renderNewBookForm();
            getByText('Title:');
            getByText('Author:');
            getByText('Country:');
        })
    });

    it('disables submit button until form complete', async () => {
        await act(async () => {
            const { getByText } = renderNewBookForm();
            expect(getByText('Save Book')).toBeDisabled()
        });
    });
});