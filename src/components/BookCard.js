import React from 'react';
import axios from 'axios';

const BookCard = ({ book, onDelete, onClick }) => {
  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this book?')) {
      await axios.delete(`http://localhost:5000/api/v1/books/${book._id}`);
      onDelete(book._id);
    }
  };

  return (
    <div className="book-card" onClick={onClick}>
      <img src={book.imageLink} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Price: ${book.price}</p>
      <p>Discount: {book.discount}%</p>
      <p>Pages: {book.page}</p>
      <p>Published: {new Date(book.publishDate).toLocaleDateString()}</p>
      <button className="delete-button" onClick={handleDelete}>X</button>
    </div>
  );
};

export default BookCard;