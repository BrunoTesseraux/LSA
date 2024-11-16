import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import CreateUser from "../CreateUser/CreateUser";
import ShowAllUsers from "../ShowAllUsers/ShowAllUsers";

const AdminPanel = () => {
  const navigate = useNavigate(); 
  const handleBackClick = () => {
    navigate('/welcome'); 
  };

  return (
    <div className="admin-panel">
      <button onClick={handleBackClick} className="back-button">Back</button>
      <CreateUser />
      <ShowAllUsers />
    </div>
  );
};

export default AdminPanel;