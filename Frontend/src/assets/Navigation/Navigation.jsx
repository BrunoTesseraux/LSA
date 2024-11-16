import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Assuming you have a context for authentication

const Navigation = () => {
  const { user, logout } = useAuth(); // Access the authenticated user and logout function
  const navigate = useNavigate(); // For navigation after logout

  if (!user) return null; // Render nothing if the user is not logged in

  const handleLogout = () => {
    logout(); // Call logout from context to clear the user session
    navigate('/'); // Redirect to the login page after logout
  };

  return (
    <nav>
      <ul>
        <li><Link to="/welcome">Welcome</Link></li>
        <li><Link to="/adminPanel">Admin Lounge</Link></li>
        <li><Link to="/guestlistMaster">Guest List Master</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li> {/* Handle logout here */}
      </ul>
    </nav>
  );
};

export default Navigation;