import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.passwordConfirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/register', registerData);
      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
      setError('Registration failed.');
    }
  };

  return (
    <section className="account-background">
      <section className="account-register-container">
        <h1>Register</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={registerData.name}
            onChange={handleChange}
            required
          />
          <p>Email</p>
          <input
            type="email"
            name="email"
            placeholder="example@mail.com"
            value={registerData.email}
            onChange={handleChange}
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={registerData.password}
            onChange={handleChange}
            required
          />
          <p>Confirm Password</p>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm your password"
            value={registerData.passwordConfirm}
            onChange={handleChange}
            required
          />
          <button className="account-register-button" type="submit">
            Register
          </button>
        </form>
        <section className="account-register-footer">
          <p>
            Already have an account? <b><a href="/login">Login</a></b>
          </p>
        </section>
      </section>
    </section>
  );
};

export default Register;