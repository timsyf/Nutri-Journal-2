import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import the following components
import AuthPage from '../../src/pages/AuthPage/AuthPage';
import NewOrderPage from '../../src/pages/NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../../src/pages/OrderHistoryPage/OrderHistoryPage';
import NavBar from '../../src/components/Navbar/Navbar';
import { getUser } from '../../src/utilities/users-service';

import './App.css';

export default function App() {

  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
        <>
          <NavBar element = {user} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser = {setUser} />
      }
    </main>
  );

}