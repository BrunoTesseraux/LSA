import React, { useState } from 'react';

const UserAssignmentForm = ({ guests, users, onAssign }) => {
  const [selectedGuest, setSelectedGuest] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedGuest || !selectedUser) {
      setError('Both guest and user must be selected.');
      return;
    }
    onAssign(selectedUser, selectedGuest);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Guest:
        <select value={selectedGuest} onChange={(e) => setSelectedGuest(e.target.value)}>
          <option value="">--Select a Guest--</option>
          {guests.map((guest) => (
            <option key={guest._id} value={guest._id}>
              {guest.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select User:
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">--Select a User--</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Assign User to Guest</button>
    </form>
  );
};

export default UserAssignmentForm;