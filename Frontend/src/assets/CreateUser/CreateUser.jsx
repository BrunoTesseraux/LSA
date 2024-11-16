import React, { useState, useEffect } from 'react';

const CreateUser = () => {
  // State for form fields and other conditions
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch available roles when component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:7000/roles');
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Rollen');
        }
        const data = await response.json();
        setAvailableRoles(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoles();
  }, []);

  // Handle role selection change (checkboxes)
  const handleRoleChange = (event) => {
    const roleId = event.target.value;
    if (event.target.checked) {
      setSelectedRoles((prev) => [...prev, roleId]);
    } else {
      setSelectedRoles((prev) => prev.filter((id) => id !== roleId));
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Validate password length
    if (password.length < 6) {
      setError('Das Passwort muss mindestens 6 Zeichen lang sein');
      return;
    }
  
    const newUser = {
      username,
      password,  // Just send the plain password here (backend will handle hashing)
      roles: selectedRoles,  // The selected roles
      email,
      dateOfBirth,
      profilePicture,
    };
  
    console.log(newUser);
    

    setLoading(true);
    setError('');
    setSuccessMessage('');
  
    try {
      const response = await fetch('http://localhost:7000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        throw new Error('Fehler beim Erstellen des Benutzers');
      }
  
      const data = await response.json();
      setSuccessMessage('Benutzer erfolgreich erstellt!');
      setUsername('');
      setPassword('');
      setSelectedRoles([]);
      setEmail('');
      setDateOfBirth('');
      setProfilePicture('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-user">
      <h1>Benutzer erstellen</h1>

      {/* Display success or error messages */}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div>
          <label htmlFor="username">Benutzername:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password">Passwort:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email">E-Mail:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Date of Birth input */}
        <div>
          <label htmlFor="dateOfBirth">Geburtsdatum:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>

        {/* Profile Picture input */}
        <div>
          <label htmlFor="profilePicture">Profilbild (URL):</label>
          <input
            type="text"
            id="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>

        {/* Role selection (checkboxes) */}
        <div>
          <label>Rollen:</label>
          <div>
            {availableRoles.map((role) => (
              <div key={role._id}>
                <input
                  type="checkbox"
                  id={role._id}
                  value={role._id}
                  onChange={handleRoleChange}
                  checked={selectedRoles.includes(role._id)}
                />
                <label htmlFor={role._id}>{role.name}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Erstelle Benutzer...' : 'Benutzer erstellen'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;