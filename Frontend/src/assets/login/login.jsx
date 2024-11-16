import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = ({ visitor, setVisitor }) => {  // Correctly destructure the props
  const { login, error } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      setVisitor(true);  // Update visitor state to true
      navigate('/welcome');  // Navigate to /welcome after login
    } catch (err) {
      // Error is already handled in AuthContext, so we don't need extra handling here
    }
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h1>Lumen App</h1>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}  {/* Display error message if any */}
    </form>
  );
};

export default Login;