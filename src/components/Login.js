import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData({
      ...loginData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/users/login', loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';
      }
    } catch (error) {
      console.error(error);
      setError('Registration failed.');
    }
  };

  return (
    <section className="account-background">
      <section className="account-login-container">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <p>Email</p>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <p>Password</p>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <section className="account-login-agreement">
            <input
              type="checkbox"
              name="rememberMe"
              checked={loginData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember me</label>
          </section>
          <button className="account-login-button" type="submit">
            Login
          </button>
        </form>
        <section className="account-login-footer">
          <p>
            Don't have an account? <b><a href="/register">Register</a></b>
          </p>
        </section>
      </section>
    </section>
  );
};

export default Login;