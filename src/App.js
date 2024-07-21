import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function BookApp() {
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);

  const loadBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await axios.get('http://localhost:5000/api/v1/books', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
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
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
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

function App() {
  const token = localStorage.getItem('token');
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={token ? <BookApp /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;