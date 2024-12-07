import { NavLink } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navlinks() {
  const { user, setUser, logOut } = useContext(MovieContext);
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        setIsMenuOpen(false); // Close menu on logout
      })
      .catch((error) => console.error(`Error during logout:`, error));
  }

  return (
    <header className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">
            <NavLink to="/">AniVerse</NavLink>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavLink to="/" className="hover:text-primary-focus text-base-content">
              Home
            </NavLink>
            <NavLink to="/allmovies" className="hover:text-primary-focus text-base-content">
              All Movies
            </NavLink>
            <NavLink to="/favoritemovies" className="hover:text-primary-focus text-base-content">
              My Favorites
            </NavLink>
            <NavLink to="/addmovie" className="hover:text-primary-focus text-base-content">
              Add Movie
            </NavLink>
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline text-error"
                >
                  LogOut
                </button>
                <NavLink to="/userProfile">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-primary"
                    src={user.photoURL}
                    title={user.displayName || "User"}
                    alt="User Profile"
                  />
                </NavLink>
              </>
            ) : (
              <div className="flex gap-4">
                <NavLink to="/register" className="btn btn-sm btn-primary">
                  Register
                </NavLink>
                <NavLink to="/login" className="btn btn-sm btn-secondary">
                  Login
                </NavLink>
              </div>
            )}
            {/* Theme Toggle */}
            <div className="ml-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={handleToggleTheme}
                  checked={theme === "dark"}
                />
                <span className="text-sm text-base-content">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </label>
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-2xl text-base-content focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile and Tablet Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden flex flex-col items-start gap-4 pb-4 border-t border-base-300">
            <NavLink
              to="/"
              className="hover:text-primary text-base-content"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/allmovies"
              className="hover:text-primary text-base-content"
              onClick={() => setIsMenuOpen(false)}
            >
              All Movies
            </NavLink>
            <NavLink
              to="/favoritemovies"
              className="hover:text-primary text-base-content"
              onClick={() => setIsMenuOpen(false)}
            >
              My Favorites
            </NavLink>
            <NavLink
              to="/addmovie"
              className="hover:text-primary text-base-content"
              onClick={() => setIsMenuOpen(false)}
            >
              Add Movie
            </NavLink>
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline text-error"
                >
                  LogOut
                </button>
                <NavLink
                  to="/userProfile"
                  className="flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    className="h-8 w-8 rounded-full border-2 border-primary"
                    src={user.photoURL}
                    title={user.displayName || "User"}
                    alt="User Profile"
                  />
                  <span className="text-sm text-base-content">
                    {user.displayName || "Profile"}
                  </span>
                </NavLink>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                <NavLink
                  to="/register"
                  className="btn btn-sm btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="btn btn-sm btn-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </div>
            )}
            {/* Theme Toggle */}
            <div className="w-full mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  onChange={handleToggleTheme}
                  checked={theme === "dark"}
                />
                <span className="text-sm text-base-content">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
              </label>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navlinks;
