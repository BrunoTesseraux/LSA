import React, { useEffect, useState } from 'react';
import Guestlist from './Guestlist';
import RibbonsAvailable from './RibbonsAvailable';
import axios from 'axios';
import AddGuestForm from './GuestForm'; 
import UserAssignmentForm from './UserAssignForm';

const GuestlistMaster = () => {
  const [guests, setGuests] = useState([]);
  const [selectedRibbon, setSelectedRibbon] = useState(null);
  const [ribbons, setRibbons] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null); // Added to track selected guest for editing
  const [users, setUsers] = useState([]);


  useEffect(() => {
    // Fetch available ribbons from the backend
    axios.get('http://localhost:7000/ribbons/inventory')
      .then(response => {
        setRibbons(response.data); // Set the ribbons state to the response data
      })
      .catch(error => console.error("Error fetching ribbons:", error));

    // Fetch guest list data from the backend
    axios.get('http://localhost:7000/guestlists')
      .then(response => setGuests(response.data))
      .catch(error => console.error("Error fetching guests:", error));

      axios.get('http://localhost:7000/users')
      .then(response => {
        const allUsers = response.data;

        // Assuming the 'roles' array is populated with role IDs
        // Fetch the 'concierge' role from the roles list
        const conciergeUsers = allUsers.filter(user => 
          user.roles.some(role => role.name === 'concierge')
        );

        setUsers(conciergeUsers);
      })
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleAddGuest = (newGuest) => {
    // Post the new guest to the backend
    console.log(newGuest);
    
    axios.post('http://localhost:7000/guestlists', newGuest)
      .then(response => setGuests([...guests, response.data]))
      .catch(error => console.error("Error adding guest:", error));
  };

  const handleDeleteGuest = (guestId) => {
    // Delete the guest from the backend
    axios.delete(`http://localhost:7000/guestlists/${guestId}`)
      .then(() => setGuests(guests.filter(guest => guest.id !== guestId)))
      .catch(error => console.error("Error deleting guest:", error));
  };

  const handleUpdateGuest = (guestId, updatedData) => {
    // Update the guest details in the backend
    axios.put(`http://localhost:7000/guestlists/${guestId}`, updatedData)
      .then(response => {
        const updatedGuests = guests.map(guest =>
          guest.id === guestId ? response.data : guest
        );
        setGuests(updatedGuests);
      })
      .catch(error => console.error("Error updating guest:", error));
  };

  const handleAssignRibbon = (ribbonId) => {
    setSelectedRibbon(ribbonId);
    // Call the API to assign ribbon to a group (not implemented in this example)
    axios.post(`http://localhost:7000/guestgroups/1/ribbons`, { ribbonId })
      .catch(error => console.error("Error assigning ribbon:", error));
  };

  const handleSelectGuest = (guest) => {
    setSelectedGuest(guest); // Set the guest for editing
  };

  const handleAssignUserToGuest = (userId, guestId) => {
    axios.put(`http://localhost:7000/users/${userId}`, { guestGroupId: guestId })
      .then(response => {
        console.log("User assigned:", response.data);
      })
      .catch(error => console.error("Error assigning user to guest:", error));
  };


  return (
    <div className="guestlist-master">
      <RibbonsAvailable onAssignRibbon={handleAssignRibbon} ribbons={ribbons} />
      <Guestlist
        guests={guests}
        onDeleteGuest={handleDeleteGuest}
        onUpdateGuest={handleUpdateGuest}
        onSelectGuest={handleSelectGuest} // Added to select a guest for editing
      />
<UserAssignmentForm 
  guests={guests} 
  users={users} 
  onAssign={handleAssignUserToGuest} 
/>
      <AddGuestForm
  onAddGuest={handleAddGuest}  // Ensure this is properly passed down
  selectedGuest={selectedGuest}
  onEditGuest={handleUpdateGuest}
  ribbons={ribbons}
/>
    </div>
  );
};

export default GuestlistMaster;