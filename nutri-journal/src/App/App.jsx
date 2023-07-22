import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the following components
import { getUser } from '../../src/utilities/users-service';
import AuthPage from '../../src/pages/AuthPage/AuthPage';
import NavBar from '../../src/components/Navbar/Navbar';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import HomePage from '../../src/pages/HomePage/HomePage';
import FoodJournalPage from '../pages/FoodJournalPage/FoodJournalPage';
import MealJournalPage from '../pages/MealJournalPage/MealJournalPage';

import './App.css';

export default function App() {

  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
          <NavBar element = {user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage user={user} />} />
            <Route path="/food" element={<FoodJournalPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/meal" element={<MealJournalPage user={user} />} />
          </Routes>
        </>
        :
        <>
          <AuthPage setUser = {setUser} user={user} />
        </>
      }
    </main>
  );

}