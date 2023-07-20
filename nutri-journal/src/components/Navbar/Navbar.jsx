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
            <Link to="/">Nutri Journal</Link>
          </li>
          {/* FOOD JOURNAL */}
            <li><Link to="/food">Food</Link></li>
            <li><Link to="/food/write">Food Write</Link></li>

          {/* EXERCISE JOURNAL */}
            <li><Link to="/exercise">Exercise</Link></li>
            <li><Link to="/exercise/write">Exercise Write</Link></li>
        </ul>
      </nav>
      <Link to="" onClick={handleLogOut}>Log Out</Link>
    </>
  );
}