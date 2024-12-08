import { NavLink, useLocation } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Loading from "../ui/Loading";

function Navlinks() {
  const { user, setUser, logOut, loading, setLoading } = useContext(MovieContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Dynamically update the page title based on the route
  useEffect(() => {
    const updateTitle = () => {
      const newTitle = `${location.pathname.slice(1)} | AniVerse`;
      document.title = location.pathname === "/" ? "AniVerse" : newTitle;
    };

    updateTitle();
  }, [location.pathname]);

  useEffect(() => {
    setLoading(false);
  }, [location.pathname, setLoading]);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setUser(null);
      setIsMenuOpen(false);
    } catch (error) {
      console.error(`Error during logout:`, error);
    }
  };

  const handleNavigation = (targetPath) => {
    if (location.pathname === targetPath) {
      setLoading(false);
    } else {
      setLoading(true); 
    }
    setIsMenuOpen(false);
  };

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

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                { to: "/", label: "Home" },
                { to: "/allmovies", label: "All Movies" },
                { to: "/deals", label: "Deals" },
                { to: "/favoritemovies", label: "Favorite Movies" },
                { to: "/addmovie", label: "Add Movie" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-white relative group hover:text-yellow-400"
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              ))}
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    LogOut
                  </button>
                  <NavLink>
                    <img
                      className="h-10 w-10 rounded-full border-2 border-yellow-400 hover:border-white"
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
                  </NavLink>
                </div>
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

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-3xl text-yellow-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden flex flex-col items-start gap-6 pb-6 border-t border-gray-700">
              {[
                { to: "/", label: "Home" },
                { to: "/allmovies", label: "All Movies" },
                { to: "/deals", label: "Deals" },
                { to: "/favoritemovies", label: "Favorite Movies" },
                { to: "/addmovie", label: "Add Movie" },
              ].map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="text-white relative group hover:text-yellow-400"
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span className="absolute left-0 bottom-0 w-0 h-[3px] bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
                </NavLink>
              ))}
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  >
                    LogOut
                  </button>
                  <NavLink>
                    <img
                      className="h-8 w-8 rounded-full border-2 border-yellow-400 hover:border-white"
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
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
