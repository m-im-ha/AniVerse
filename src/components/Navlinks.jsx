import { NavLink, useLocation } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Loading from "../ui/Loading";

function Navlinks() {
  const { user, setUser, logOut, loading, setLoading } =
    useContext(MovieContext);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [location.pathname, setLoading]);

  function handleToggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  function handleLogout() {
    logOut()
      .then(() => {
        setUser(null);
        setIsMenuOpen(false);
      })
      .catch((error) => console.error(`Error during logout:`, error));
  }

  function handleNavigation(targetPath) {
    if (location.pathname === targetPath) {
      return;
    }
    setLoading(true);
  }

  return (
    <>
      {loading && <Loading />}
      <header className="bg-gradient-to-r from-indigo-900 via-purple-800 to-black shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-3xl font-extrabold text-yellow-400 tracking-wide">
              <NavLink
                to="/"
                onClick={() => handleNavigation("/")}
                className="hover:text-yellow-300 transition-all"
              >
                Ani<span className="text-white">Verse</span>
              </NavLink>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <NavLink
                to="/"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => handleNavigation("/")}
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/allmovies"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => handleNavigation("/allmovies")}
              >
                All Movies
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/deals"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => handleNavigation("/deals")}
              >
                Deals
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/favoritemovies"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => handleNavigation("/favoritemovies")}
              >
                Favorite Movies
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/addmovie"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => handleNavigation("/addmovie")}
              >
                Add Movie
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    LogOut
                  </button>
                  <NavLink to="/userProfile">
                    <img
                      className="h-10 w-10 rounded-full border-2 border-yellow-400 hover:border-white"
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
                  </NavLink>
                </>
              ) : (
                <div className="flex gap-4">
                  <NavLink
                    to="/register"
                    className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-sm bg-purple-500 text-white hover:bg-purple-600"
                  >
                    Login
                  </NavLink>
                </div>
              )}
              <div className="ml-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={handleToggleTheme}
                    checked={theme === "dark"}
                  />
                  <span className="text-sm text-white">
                    {theme === "dark" ? "Dark" : "Light"}
                  </span>
                </label>
              </div>
            </nav>

            <button
              className="lg:hidden text-3xl text-yellow-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="lg:hidden flex flex-col items-start gap-6 pb-6 border-t border-gray-700">
              <NavLink
                to="/"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => {
                  handleNavigation("/");
                  setIsMenuOpen(false);
                }}
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/allmovies"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => {
                  handleNavigation("/allmovies");
                  setIsMenuOpen(false);
                }}
              >
                All Movies
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/deals"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => {
                  handleNavigation("/deals");
                  setIsMenuOpen(false);
                }}
              >
                Deals
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/favoritemovies"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => {
                  handleNavigation("/favoritemovies");
                  setIsMenuOpen(false);
                }}
              >
                Favorite Movies
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              <NavLink
                to="/addmovie"
                className="text-white relative group hover:text-yellow-400"
                onClick={() => {
                  handleNavigation("/addmovie");
                  setIsMenuOpen(false);
                }}
              >
                Add Movie
                <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
              </NavLink>
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    LogOut
                  </button>
                  <NavLink
                    to="/userProfile"
                    className="flex items-center gap-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img
                      className="h-8 w-8 rounded-full border-2 border-yellow-400 hover:border-white"
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
                    <span className="text-sm text-white">
                      {user.displayName || "Profile"}
                    </span>
                  </NavLink>
                </div>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <NavLink
                    to="/register"
                    className="btn btn-sm bg-yellow-400 text-black hover:bg-yellow-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className="btn btn-sm bg-purple-500 text-white hover:bg-purple-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default Navlinks;
