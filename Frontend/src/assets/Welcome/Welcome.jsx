import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ShowAllUsers from '../ShowAllUsers/ShowAllUsers';

const WelcomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Check if user has the 'admin' role

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <div className="heutige-aufgaben">
        <h2>Heutige Aufgaben</h2>
        <ul>
          <li>Bühnenaufbau und Verkabelung – Ansprechpartner: Max Mustermann</li>
          <li>Technik-Check (Licht und Sound) – Ansprechpartner: Lisa Meier</li>
          <li>Aufbau der Essens- und Getränkestände – Ansprechpartner: Karl Schmidt</li>
          <li>Sicherheitskontrollen und Absperrungen – Ansprechpartner: Julia Weber</li>
          <li>Toiletten und Sanitäranlagen überprüfen – Ansprechpartner: Peter Fischer</li>
        </ul>
      </div>
      
      {/* Beispiel-Inhalte für Aufgaben, für die noch Leute gebraucht werden */}
      <div className="aufgaben-fuer-die-wir-noch-leute-brauchen">
        <h2>Wir brauchen noch leute für den lager umzug</h2>
        <button>ich bin dabei</button>
      </div>
    </div>
  );
};

export default WelcomePage;