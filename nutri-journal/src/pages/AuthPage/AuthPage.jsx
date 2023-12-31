import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';

export default function AuthPage({setUser}) {
  
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <main>
      {showLoginForm ? (
        <>
          <LoginForm setUser={setUser} />
          <a onClick={toggleForm} className="dropdown-item">New around here? Sign up now</a>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} />
          <a onClick={toggleForm} className="dropdown-item">Already have an account? Login now</a>
        </>
      )}
    </main>
  );
}