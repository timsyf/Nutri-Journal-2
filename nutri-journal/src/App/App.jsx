import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthPage from '../pages/AuthPage/AuthPage';
import NewOrderPage from '../pages/NewOrderPage/NewOrderPage';
import OrderHistoryPage from '../pages/OrderHistoryPage/OrderHistoryPage';
import Navbar from '../components/Navbar/Navbar';
import './App.css';

export default function App() {
  const [user, setUser] = useState({});
  return (
    <main className="App">
      { user ?
        <>
          <Navbar />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
        :
        <AuthPage />
      }
    </main>
  );
}