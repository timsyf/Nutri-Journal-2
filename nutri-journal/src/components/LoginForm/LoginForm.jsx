import { useState } from 'react';
import * as usersService from '../../utilities/users-service';
import swal from 'sweetalert';

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError('');
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method 
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError('Log In Failed - Try Again');
      swal("Log In Failed - Try Again");
    }
  }

  return (
    <div className="form-container">
      <form className="px-4 py-3" onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleDropdownFormEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleDropdownFormEmail1" name="email" value={credentials.email} placeholder="yourname@example.com" onChange={handleChange} required></input>
          <small id="emailHelpBlock" className="form-text text-muted">
            Please enter your email address.
          </small>
        </div>
        <br></br>
        <div className="form-group">
          <label for="exampleDropdownFormPassword1">Password</label>
          <input type="password" className="form-control" id="exampleDropdownFormPassword1" name="password" value={credentials.password} placeholder="Password" onChange={handleChange} required></input>
          <small id="passwordHelpBlock" className="form-text text-muted">
            Your password must be 4 characters long.
          </small>
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
      <div className="dropdown-divider"></div>
    </div>
  );
}