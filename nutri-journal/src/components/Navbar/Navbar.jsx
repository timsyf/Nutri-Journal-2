import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import * as userService from "../../utilities/users-service";

export default function NavBar(user, setUser) {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light rounded">
    <Link to="/"><a class="navbar-brand text-info font-weight-bolder">
        <img src={Logo} alt="Logo" width="150" className="vertical-align-middle" />
      </a></Link>
      <button class="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse text-center`} id="navbarsExample09">
        <nav className="navbar-nav">
          <Link to="/"><a className="nav-link text-info">Home</a></Link>
          <Link to="/meal"><a className="nav-link text-info">Meal</a></Link>
          <Link to="/food"><a className="nav-link text-info">Food</a></Link>
          <Link to="/weight/log"><a className="nav-link text-info">Weight Log</a></Link>
          {user.element.isAdmin ? <Link to="/admin"><a className="nav-link text-info">Admin</a></Link> : <></>}
          <Link to="" onClick={handleLogOut}><a className="nav-link text-info" >Log Out</a></Link>
        </nav>
      </div>
    </nav>
    </>
  );
}