import React, { useState, useEffect } from 'react';

const AddGuestForm = ({ onAddGuest, selectedGuest, onEditGuest, ribbons }) => {
  const [name, setName] = useState('');
  const [ribbonQuantities, setRibbonQuantities] = useState({}); // Track quantities for each ribbon

  // Set form state when a guest is selected for editing
  useEffect(() => {
    if (selectedGuest) {
      setName(selectedGuest.name);
      // Pre-fill ribbon quantities if the guest already has assigned ribbons
      const quantities = {};
      selectedGuest.ribbons.forEach(ribbon => {
        quantities[ribbon.ribbon._id] = ribbon.quantityAssigned;
      });
      setRibbonQuantities(quantities);
    }
  }, [selectedGuest]);

  // Handle ribbon quantity change
  const handleRibbonQuantityChange = (ribbonId, quantity) => {
    const parsedQuantity = parseInt(quantity, 10);
    setRibbonQuantities(prevState => ({
      ...prevState,
      [ribbonId]: parsedQuantity,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the guest data
    const guestData = {
      name,
      ribbons: Object.keys(ribbonQuantities).map(ribbonId => {
        const quantity = parseInt(ribbonQuantities[ribbonId], 10); // Ensure quantity is a number
        return {
          ribbonId,  // Use ribbonId as the string, not the whole object
          quantityAssigned: quantity,
        };
      }),
    };

    if (selectedGuest) {
      // If editing an existing guest, call onEditGuest
      onEditGuest(selectedGuest._id, guestData);
    } else {
      // If adding a new guest, call onAddGuest
      onAddGuest(guestData);
    }

    // Reset the form after submission
    setName('');
    setRibbonQuantities({});
  };

  return (
    <form onSubmit={handleSubmit} className="add-guest-form">
      <h3>{selectedGuest ? 'Edit Guest' : 'Add New Guest'}</h3>
      
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Ribbons:</label>
        {ribbons.map((ribbon) => (
          <div key={ribbon._id} className="ribbon-input">
            <label htmlFor={`ribbon-${ribbon._id}`}>
              {ribbon.color} ({ribbon.accessTo})
            </label>
            <input
              type="number"
              id={`ribbon-${ribbon._id}`}
              value={ribbonQuantities[ribbon._id] || 0} // Default to 0 if not set
              min="0"
              onChange={(e) => handleRibbonQuantityChange(ribbon._id, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button type="submit">{selectedGuest ? 'Update Guest' : 'Add Guest'}</button>
    </form>
  );
};

export default AddGuestForm;