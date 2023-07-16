import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useState } from 'react';

export default function AuthPage({setUser}) {
  
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <p>Login or Sign Up to continue</p>
      {showLoginForm ? (
        <>
          <LoginForm setUser={setUser} />
          <p>Don't have an account?</p>
          <button onClick={toggleForm}>Sign Up</button>
        </>
      ) : (
        <>
          <SignUpForm setUser={setUser} />
          <p>Already have an account?</p>
          <button onClick={toggleForm}>Log In</button>
        </>
      )}
    </main>
  );
}