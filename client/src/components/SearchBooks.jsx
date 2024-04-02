import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from './mutations';

const SearchBooks = () => {
  const [saveBook] = useMutation(SAVE_BOOK);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    // Perform search operation using searchInput
    // Example: Call an API to search for books based on searchInput
    try {
      // Simulating search results
      const results = [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
        { id: 3, title: 'Book 3', author: 'Author 3' },
      ];
      setSearchResults(results);
    } catch (error) {
      console.error('Error while searching:', error);
      // Handle error
    }
  };

  const handleSaveBook = async (book) => {
    try {
      await saveBook({ variables: { bookInput: book } });
      // Handle success
      console.log('Book saved successfully:', book);
    } catch (error) {
      console.error('Error while saving book:', error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search for books..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h3>Search Results:</h3>
        <ul>
          {searchResults.map((book) => (
            <li key={book.id}>
              {book.title} by {book.author}
              <button onClick={() => handleSaveBook(book)}>Save</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBooks;
