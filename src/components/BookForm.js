import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ bookToEdit, onFormSubmit }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    discount: '',
    page: '',
    publishDate: '',
    imageLink: '',
  });

  useEffect(() => {
    if (bookToEdit) {
      setBook({
        ...bookToEdit,
        publishDate: new Date(bookToEdit.publishDate).toISOString().split('T')[0], // Format YYYY-MM-DD
      });
    } else {
      setBook({
        title: '',
        author: '',
        price: '',
        discount: '',
        page: '',
        publishDate: '',
        imageLink: '',
      });
    }
  }, [bookToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prevBook => ({ ...prevBook, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      if (book._id) {
        await axios.patch(`http://localhost:5000/api/v1/books/${book._id}`, book, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            publishDate: new Date(book.publishDate).toISOString()
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/v1/books', book, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            publishDate: new Date(book.publishDate).toISOString()
          }
        });
      }
      onFormSubmit();
      setBook({
        title: '',
        author: '',
        price: '',
        discount: '',
        page: '',
        publishDate: '',
        imageLink: '',
      });
    } catch (error) {
      console.error(error);
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={book.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="author"
        placeholder="Author"
        value={book.author}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={book.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="discount"
        placeholder="Discount"
        value={book.discount}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="page"
        placeholder="Pages"
        value={book.page}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="publishDate"
        placeholder="Publish Date"
        value={book.publishDate}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="imageLink"
        placeholder="Image Link"
        value={book.imageLink}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;