import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);

  const loadBooks = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/books');
    const newBooks = response.data.data.books;
    setBooks(prevBooks => {
      const updatedBooks = [...prevBooks];
      newBooks.forEach(book => {
        if (!updatedBooks.some(b => b._id === book._id)) {
          updatedBooks.push(book);
        }
      });
      return updatedBooks;
    });
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleDelete = (id) => {
    setBooks(books.filter(book => book._id !== id));
  };

  const handleFormSubmit = () => {
    setBooks([]);
    loadBooks();
  };

  const handleCardClick = (book) => {
    setBookToEdit(book);
  };

  return (
    <div className="App">
      <div className="books-section">
        {books.map(book => (
          <BookCard
            key={book._id}
            book={book}
            onDelete={handleDelete}
            onClick={() => handleCardClick(book)}
          />
        ))}
      </div>
      <div className="form-section">
        <BookForm bookToEdit={bookToEdit} onFormSubmit={handleFormSubmit} />
      </div>
    </div>
  );
}

export default App;