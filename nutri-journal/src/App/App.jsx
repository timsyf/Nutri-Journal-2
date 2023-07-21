import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the following components
import AuthPage from '../../src/pages/AuthPage/AuthPage';
import HomePage from '../../src/pages/HomePage/HomePage';
import NavBar from '../../src/components/Navbar/Navbar';
import { getUser } from '../../src/utilities/users-service';

import FoodJournalPage from '../pages/FoodJournalPage/FoodJournalPage';
import ExerciseJournalPage from '../pages/ExerciseJournalPage/ExerciseJournalPage';
import ExerciseJournalWritePage from '../pages/ExerciseJournalPage/ExerciseJournalWritePage';
import FoodJournalWritePage from '../pages/FoodJournalPage/FoodJournalAdminPanel';

import './App.css';

export default function App() {

  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
          <NavBar element = {user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/food" element={<FoodJournalPage />} />
            <Route path="/food/write" element={<FoodJournalWritePage />} />

            <Route path="/exercise" element={<ExerciseJournalPage />} />
            <Route path="/exercise/write" element={<ExerciseJournalWritePage />} />
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