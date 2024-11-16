const RibbonsAvailable = ({ onAssignRibbon,ribbons }) => {

  return (
    <div className="ribbons-available">
      <h3>Available Ribbons</h3>
      <ul>
        {ribbons && ribbons.length > 0 ? (
          ribbons.map((ribbon) => (
            <li key={ribbon._id}>
              {ribbon.color} - {ribbon.accessTo} - Insgesamt {ribbon.initialQuantity} - noch verfügbar {ribbon.leftoverQuantity}
            </li>
          ))
        ) : (
          <p>No ribbons available</p>
        )}
      </ul>
    </div>
  );
};

export default RibbonsAvailable;