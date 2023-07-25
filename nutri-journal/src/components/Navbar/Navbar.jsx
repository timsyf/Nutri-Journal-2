// Don't forget the import
import { Link } from 'react-router-dom';
import * as userService from "../../utilities/users-service";

export default function NavBar(user, setUser) {

  // Add the following function
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Nutri Journal</Link></li>
          <li><Link to="/meal">Meal</Link></li>
          <li><Link to="/food">Food</Link></li>
          <li><Link to="/weight/log">Weight Log</Link></li>
          <li><Link to="/user/setup">User Detail</Link></li>
          {user.element.isAdmin ? 
          <li><Link to="/admin">Admin</Link></li>
          :
          <></>
          }
        </ul>
      </nav>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </>
  );
}