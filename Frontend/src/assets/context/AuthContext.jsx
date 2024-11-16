import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // To store error messages from login
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if there's a token in localStorage and set the user state accordingly
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Send token to the backend for verification
      axios.post('http://localhost:7000/verify-token', { token: storedToken })
        .then(response => {
          if (response.data.valid) {
            setUser({ token: storedToken, ...response.data.user });
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('token'); // Remove invalid token from localStorage
            setUser(null); // Set user to null if token is invalid
            setIsAuthenticated(false);
          }
        })
        .catch(error => {
          console.error('Error verifying token:', error);
          localStorage.removeItem('token');
          setUser(null);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Login function to authenticate and store token
  const login = async (credentials) => {
    setError(null); // Clear previous errors on new login attempt
    try {
      const response = await axios.post('http://localhost:7000/auth/login', credentials, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('token', data.token); // Store token in localStorage
        setUser(data.user); // Store user data in state
        setIsAuthenticated(true);
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError(error.message); // Set error message to be shown in UI
      console.error('Login error:', error);
    }
  };

  // Logout function to clear user and token
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};