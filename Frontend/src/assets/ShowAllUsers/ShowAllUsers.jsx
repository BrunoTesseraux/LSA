import React, { useState, useEffect } from "react";

const ShowAllUsers = () => {
  // State to hold the users, loading state, and errors
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all users from the API
    fetch('http://localhost:7000/users')  // Replace with your actual server endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Benutzerdaten");
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);  // Store the user data in the state
        console.log(data);
        
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch(error => {
        setError(error.message);  // Set error message
        setLoading(false);  // Stop loading even if an error occurred
      });
  }, []);  // Empty dependency array ensures the fetch is only triggered once on mount

  if (loading) {
    return <div>Loading...</div>;  // Loading indicator
  }

  if (error) {
    return <div>Error: {error}</div>;  // Display error if there's an issue
  }

  return (
    <div className="show-all-users">
      <h1>Alle User</h1>
      {users.length === 0 ? (
        <p>Keine Benutzer gefunden.</p>  // Show a message if no users are found
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Geburtsdatum: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
              <p>
                Rollen: {user.roles && user.roles.length > 0
                  ? user.roles.map(role => role.name).join(', ')  // Safely check for roles
                  : "Keine Rollen zugewiesen"}
              </p>
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={`${user.username}'s Profilbild`} 
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              ) : (
                <p>Kein Profilbild verfügbar</p>
              )}              {/* Add any additional user data you want to display here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowAllUsers;