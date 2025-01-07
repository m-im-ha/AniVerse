import { NavLink, useLocation } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { useContext, useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FiUser, FiLogOut } from "react-icons/fi";
import Loading from "../ui/Loading";
import { useTheme } from "../provider/ThemeProvider";

function Navlinks() {
  const { user, setUser, logOut, loading, setLoading } =
    useContext(MovieContext);
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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

  const mainNavLinks = [
    { to: "/", label: "Home" },
    { to: "/allmovies", label: "All Movies" },
    { to: "/deals", label: "Deals" },
  ];

  return (
    <>
      {loading && <Loading />}
      <header
        className={`fixed w-full top-0 left-0 right-0 z-50 font-mont shadow-lg ${
          theme === "dark"
            ? "bg-gradient-to-r from-black via-purple-950 to-black"
            : "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="text-3xl font-extrabold tracking-wide">
              <NavLink
                to="/"
                onClick={() => handleNavigation("/")}
                className="text-white hover:text-gray-200 transition-all"
              >
                Ani
                <span
                  className={
                    theme === "dark" ? "text-purple-400" : "text-teal-400"
                  }
                >
                  Verse
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {mainNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`text-white relative group ${
                    theme === "dark"
                      ? "hover:text-purple-300"
                      : "hover:text-teal-300"
                  }`}
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                      theme === "dark" ? "bg-purple-400" : "bg-teal-400"
                    }`}
                  ></span>
                </NavLink>
              ))}

              {/* Dashboard Dropdown */}
              {user && (
                <div className="relative group">
                  <button
                    className={`text-white relative group flex items-center gap-1 ${
                      theme === "dark"
                        ? "hover:text-purple-300"
                        : "hover:text-teal-300"
                    }`}
                  >
                    Dashboard
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 transition-transform group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span
                      className={`absolute left-0 bottom-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                        theme === "dark" ? "bg-purple-400" : "bg-teal-400"
                      }`}
                    ></span>
                  </button>

                  {/* Dashboard Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-slate-800 border border-slate-700"
                        : "bg-white border border-slate-200"
                    } shadow-xl`}
                  >
                    <div className="py-2">
                      <NavLink
                        to="/addmovie"
                        className={`block px-4 py-2 text-sm ${
                          theme === "dark"
                            ? "text-gray-200 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-slate-100"
                        }`}
                        onClick={() => handleNavigation("/addmovie")}
                      >
                        Add Movie
                      </NavLink>
                      <NavLink
                        to="/favoritemovies"
                        className={`block px-4 py-2 text-sm ${
                          theme === "dark"
                            ? "text-gray-200 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-slate-100"
                        }`}
                        onClick={() => handleNavigation("/favoritemovies")}
                      >
                        Favorite Movies
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}

              {/* User Profile and Authentication */}
              {user ? (
                <div className="relative group">
                  <div className="cursor-pointer">
                    <img
                      className={`h-10 w-10 rounded-full border-2 transition-all ${
                        theme === "dark"
                          ? "border-purple-400 group-hover:border-white"
                          : "border-teal-400 group-hover:border-white"
                      }`}
                      src={user.photoURL}
                      title={user.displayName || "User"}
                      alt="User Profile"
                    />
                  </div>

                  {/* Profile Dropdown Menu */}
                  <div
                    className={`absolute right-0 top-full mt-2 w-48 rounded-xl opacity-0 invisible 
                    group-hover:opacity-100 group-hover:visible transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-slate-800 border border-slate-700"
                        : "bg-white border border-slate-200"
                    } shadow-xl`}
                  >
                    <div className="py-2">
                      <NavLink
                        to="/myprofile"
                        className={`flex items-center gap-2 px-4 py-2 text-sm ${
                          theme === "dark"
                            ? "text-gray-200 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-slate-100"
                        }`}
                        onClick={() => handleNavigation("/myprofile")}
                      >
                        <FiUser className="h-4 w-4" />
                        My Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                          theme === "dark"
                            ? "text-gray-200 hover:bg-slate-700"
                            : "text-gray-700 hover:bg-slate-100"
                        }`}
                      >
                        <FiLogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <NavLink
                    to="/register"
                    className={`btn btn-sm ${
                      theme === "dark"
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-teal-500 hover:bg-teal-600"
                    } text-white font-medium tracking-wide`}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={`btn btn-sm ${
                      theme === "dark"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-slate-600 hover:bg-slate-700"
                    } text-white font-medium tracking-wide`}
                  >
                    Login
                  </NavLink>
                </div>
              )}

              {/* Theme Toggle */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={toggleTheme}
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
                theme === "dark" ? "text-purple-400" : "text-teal-400"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden flex flex-col items-start gap-6 pb-6 border-t border-gray-700">
              {mainNavLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`text-white relative group ${
                    theme === "dark"
                      ? "hover:text-purple-300"
                      : "hover:text-teal-300"
                  }`}
                  onClick={() => handleNavigation(link.to)}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 bottom-0 w-0 h-[2px] group-hover:w-full transition-all duration-300 ${
                      theme === "dark" ? "bg-purple-400" : "bg-teal-400"
                    }`}
                  ></span>
                </NavLink>
              ))}

              {/* Dashboard Section for Mobile */}
              {user && (
                <>
                  <div
                    className={`w-full border-t ${
                      theme === "dark" ? "border-slate-700" : "border-slate-200"
                    } my-2`}
                  ></div>
                  <span
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Dashboard
                  </span>
                  <NavLink
                    to="/addmovie"
                    className={`text-white relative group pl-4 ${
                      theme === "dark"
                        ? "hover:text-purple-300"
                        : "hover:text-teal-300"
                    }`}
                    onClick={() => handleNavigation("/addmovie")}
                  >
                    Add Movie
                  </NavLink>
                  <NavLink
                    to="/favoritemovies"
                    className={`text-white relative group pl-4 ${
                      theme === "dark"
                        ? "hover:text-purple-300"
                        : "hover:text-teal-300"
                    }`}
                    onClick={() => handleNavigation("/favoritemovies")}
                  >
                    Favorite Movies
                  </NavLink>

                  {/* Profile Section */}
                  <div
                    className={`w-full border-t ${
                      theme === "dark" ? "border-slate-700" : "border-slate-200"
                    } my-2`}
                  ></div>
                  <NavLink
                    to="/myprofile"
                    className={`flex items-center gap-2 text-white ${
                      theme === "dark"
                        ? "hover:text-purple-300"
                        : "hover:text-teal-300"
                    }`}
                    onClick={() => {
                      handleNavigation("/myprofile");
                      setIsMenuOpen(false);
                    }}
                  >
                    <img
                      className={`h-8 w-8 rounded-full border-2 ${
                        theme === "dark"
                          ? "border-purple-400"
                          : "border-teal-400"
                      }`}
                      src={user.photoURL}
                      alt="User Profile"
                    />
                    <span>My Profile</span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className={`flex items-center gap-2 text-white ${
                      theme === "dark"
                        ? "hover:text-purple-300"
                        : "hover:text-teal-300"
                    }`}
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}

              {/* User Authentication for Mobile */}
              {!user && (
                <div className="flex flex-col gap-2 w-full">
                  <NavLink
                    to="/register"
                    className={`btn btn-sm ${
                      theme === "dark"
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "bg-teal-500 hover:bg-teal-600"
                    } text-white font-medium tracking-wide`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={`btn btn-sm ${
                      theme === "dark"
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-slate-600 hover:bg-slate-700"
                    } text-white font-medium tracking-wide`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </NavLink>
                </div>
              )}

              {/* Theme Toggle for Mobile */}
              <div className="w-full pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                  />
                  <span className="text-sm text-white font-medium">
                    {theme === "dark" ? "Dark" : "Light"}
                  </span>
                </label>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

export default Navlinks;
