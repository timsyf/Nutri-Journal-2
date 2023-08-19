import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Import the following components
import { getUser } from "../../src/utilities/users-service";
import AuthPage from "../../src/pages/AuthPage/AuthPage";
import NavBar from "../../src/components/Navbar/Navbar";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import HomePage from "../../src/pages/HomePage/HomePage";
import FoodJournalPage from "../pages/FoodJournalPage/FoodJournalPage";
import MealJournalPage from "../pages/MealJournalPage/MealJournalPage";
import FoodDetailPage from "../pages/FoodDetailPage/FoodDetailPage";
import WeightLogPage from "../pages/WeightLogPage/WeightLogPage";
import DefaultPage from "../pages/DefaultPage/DefaultPage";

import "./App.css";

export default function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const [user, setUser] = useState(getUser());
  const [showLoginSignUpForm, setShowLoginSignUpForm] = useState(true);
  const [showDefaultForm, setShowDefaultForm] = useState(true);
  const [userConfigured, setUserConfigured] = useState(true);

  const showLoginSignUp = () => {
    setShowLoginSignUpForm(true);
    setShowDefaultForm(false);
  };
  const showDefault = () => {
    setShowLoginSignUpForm(false);
    setShowDefaultForm(true);
  };

  return (
    <main className="App">
      {user ? (
        <>
          <>
            <NavBar element={user} setUser={setUser} />
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/food" element={<FoodJournalPage />} />
              <Route path="/meal" element={<MealJournalPage user={user} />} />
              <Route
                path="/weight/log"
                element={<WeightLogPage user={user} />}
              />
              <Route path="/food/detail/:id" element={<FoodDetailPage />} />
              {user.isAdmin ? (
                <Route path="/admin" element={<AdminPanel />} />
              ) : (
                <></>
              )}
            </Routes>
          </>
        </>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light">
            <button
              className="custom-toggler navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExample09"
              aria-controls="navbarsExample09"
              aria-expanded={!isNavCollapsed ? true : false}
              aria-label="Toggle navigation"
              onClick={handleNavCollapse}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`${
                isNavCollapsed ? "collapse" : ""
              } navbar-collapse text-center`}
              id="navbarsExample09"
            >
              <nav className="navbar-nav">
                <Link to="/">
                  <a onClick={showLoginSignUp} className="nav-link">
                    Home
                  </a>
                </Link>
                <Link to="/">
                  <a onClick={showDefault} className="nav-link">
                    Login
                  </a>
                </Link>
              </nav>
            </div>
          </nav>

          {showLoginSignUpForm ? (
            <>
              <DefaultPage />
            </>
          ) : (
            <>
              <div className="container">
                <AuthPage setUser={setUser} user={user} />
              </div>
            </>
          )}
        </>
      )}
    </main>
  );
}
