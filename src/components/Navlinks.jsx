import { Link, NavLink } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { useContext, useState, useEffect } from "react";

function Navlinks() {
  const { user, setUser, logOut } = useContext(MovieContext);
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Apply current theme to the root HTML element
    document.documentElement.setAttribute("data-theme", theme);
    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleToggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  function handleLogout() {
    logOut()
      .then(() => {
        setUser("");
      })
      .catch((error) => console.error(`Error during logout:`, error));
  }

  return (
    <div className="flex justify-around bg-pink-200">
      <NavLink to="/">AniVerse</NavLink>
      <NavLink to="/">Home</NavLink>
      <NavLink to="allmovies">All Movies</NavLink>
      <NavLink to="deals">Deals</NavLink>
      <NavLink to="favoritemovies">My Favorites</NavLink>
      <NavLink to="addmovie">Add Movie</NavLink>
      {user ? (
        <Link onClick={handleLogout} to="/">
          LogOut
        </Link>
      ) : (
        <div className="flex gap-10">
          <NavLink to="register">Register</NavLink>
          <NavLink to="login">Login</NavLink>
        </div>
      )}
      {user && (
        <NavLink to="/userProfile">
          <img
            className="h-14 w-14 rounded-full border-2 border-blue-500"
            src={user.photoURL}
            title={user.displayName || "User"}
            alt="User Profile"
          />
        </NavLink>
      )}
      <div>
        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="dark"
            className="toggle theme-controller"
            onChange={handleToggleTheme}
            checked={theme === "dark"}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Navlinks;
