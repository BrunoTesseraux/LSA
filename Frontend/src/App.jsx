import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './assets/context/AuthContext';
import Login from './assets/login/login';
import Welcome from './assets/Welcome/Welcome';
import AdminPanel from './assets/AdminPanel/AdminPanel';
import Navigation from './assets/Navigation/Navigation';
import GuestlistMaster from './assets/Guestlist/GuestlistMaster';

function App() {
  const [visitor, setVisitor] = useState(null);

  return (
    <AuthProvider>
      <Router>
      {visitor ? <Navigation /> : null}
        <Routes>
          <Route path="/" element={<Login visitor={visitor} setVisitor={setVisitor} />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/adminPanel" element={<AdminPanel />} />
          <Route path="/guestlistMaster" element={<GuestlistMaster />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;