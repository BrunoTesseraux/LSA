import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Guestlist = ({ onDeleteGuest, onUpdateGuest, onSelectGuest, guests }) => {
  const handleDeleteGuest = (id) => {
    // Call the onDeleteGuest function from parent to delete the guest
    onDeleteGuest(id);
  };

  const handleUpdateGuest = (id) => {
    // Call the onUpdateGuest function from parent to update the guest
    onUpdateGuest(id);
  };

  return (
    <div className="guestlist">
      <h3>Guest List</h3>
      <ul>
      {guests.map(guest => (
        <div key={guest._id} className="guest">
          <h4>{guest.name}</h4>
          <ul>
            {guest.ribbons.map((ribbon, index) => (
              <li key={index}>
                {ribbon.quantityAssigned} x {ribbon.ribbon.color} Ribbon ({ribbon.ribbon.accessTo})
              </li>
            ))}
          </ul>
            <button onClick={() => onSelectGuest(guest)}>Edit</button>
            <button onClick={() => onDeleteGuest(guest._id)}>Delete</button>
        </div>
      ))}
      </ul>
    </div>
  );
};

export default Guestlist;