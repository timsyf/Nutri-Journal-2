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
          <li>
            <Link to="/">My Home</Link>
          </li>
          {/* FOOD JOURNAL */}
          <li>
            <li><Link to="/food">Food Journal</Link></li>
            <ul>
              <li><Link to="/food/write">Write</Link></li>
            </ul>
          </li>

          {/* EXERCISE JOURNAL */}
          <li>
            <li><Link to="/exercise">Exercise Journal</Link></li>
            <ul>
              <li><Link to="/exercise/write">Write</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <p>Welcome, {user.element.name}!</p>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </>
  );
}