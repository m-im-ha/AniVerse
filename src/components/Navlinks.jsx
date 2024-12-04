import { Link, NavLink } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";

function Navlinks() {
  const { user, setUser, logOut } = useContext(MovieContext);

  function handleLogout() {
    logOut()
      .then(() => {
        setUser("");
      })
      .catch((error) => console.error(`error during logout.`, error));
  }

  return (
    <div className="flex justify-around bg-pink-200">
      <NavLink to="/">Logo</NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="allmovies">All Movies</NavLink>
      <NavLink to="deals">Deals</NavLink>
      <NavLink to="favoritemovies">My Favorites</NavLink>
      <NavLink to="addmovie">Add Movie</NavLink>
      <NavLink to="register">Register</NavLink>
      {user ? (
        <Link onClick={handleLogout} to="/">
          LogOut
        </Link>
      ) : (
        <NavLink to="login">Login</NavLink>
      )}
      {user ? (
            <NavLink to="/userProfile">
              <img
                className="h-14 w-14 rounded-full border-2 border-blue-500"
                src={user.photoURL}
                title={user.displayName || "User"}
                alt="User Profile"
              />
            </NavLink>
          ) : (
            <NavLink to="/userProfile">
              <FaUserAlt className="h-10 w-10 rounded-full text-blue-800" />
            </NavLink>
          )}
    </div>
  );
}

export default Navlinks;
