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
      <header className={`fixed w-full top-0 left-0 right-0 z-50 font-mont shadow-lg ${
        theme === 'dark' 
          ? 'bg-gradient-to-r from-black via-purple-950 to-black' 
          : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="text-3xl font-extrabold tracking-wide">
              <NavLink
                to="/"
                onClick={() => handleNavigation("/")}
                className="text-white hover:text-gray-200 transition-all"
              >
                Ani<span className={theme === 'dark' ? 'text-purple-400' : 'text-teal-400'}>Verse</span>
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
                  className={`text-white relative group ${
                    theme === 'dark' 
                      ? 'hover:text-purple-300' 
                      : 'hover:text-teal-300'
                  }`}
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span className={`absolute left-0 bottom-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-purple-400' 
                      : 'bg-teal-400'
                  }`}></span>
                </NavLink>
              ))}
              {user ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLogout}
                    className={`btn btn-sm btn-outline ${
                      theme === 'dark'
                        ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black'
                        : 'border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900'
                    }`}
                  >
                    LogOut
                  </button>
                  <NavLink>
                    <img
                      className={`h-10 w-10 rounded-full border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-purple-400 hover:border-white'
                          : 'border-teal-400 hover:border-white'
                      }`}
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
                    className={`btn btn-sm ${
                      theme === 'dark'
                        ? 'bg-purple-500 hover:bg-purple-600'
                        : 'bg-teal-500 hover:bg-teal-600'
                    } text-white font-medium tracking-wide`}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={`btn btn-sm ${
                      theme === 'dark'
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-slate-600 hover:bg-slate-700'
                    } text-white font-medium tracking-wide`}
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
                  <span className="text-sm text-white font-medium">
                    {theme === "dark" ? "Dark" : "Light"}
                  </span>
                </label>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className={`lg:hidden text-3xl focus:outline-none ${
                theme === 'dark' 
                  ? 'text-purple-400' 
                  : 'text-teal-400'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Navigation with same theme-based styling */}
          {isMenuOpen && (
            <nav className="lg:hidden flex flex-col items-start gap-6 pb-6 border-t border-gray-700">
              {/* Mobile navigation items with same styling as desktop */}
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
                  className={`text-white relative group ${
                    theme === 'dark' 
                      ? 'hover:text-purple-300' 
                      : 'hover:text-teal-300'
                  }`}
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span className={`absolute left-0 bottom-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-purple-400' 
                      : 'bg-teal-400'
                  }`}></span>
                </NavLink>
              ))}
              {/* Rest of mobile menu with same styling */}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default Navlinks;
