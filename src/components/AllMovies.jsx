import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { FaSearch } from "react-icons/fa";
import { useTheme } from "../provider/ThemeProvider";

function AllMovies() {
  const { theme } = useTheme();
  const { setAllmovies } = useContext(MovieContext); 
  const [movies, setMovies] = useState([]); 
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  // Fetch movies from the backend
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://animated-movieportal-server.vercel.app/movies"
        );
        if (response.ok) {
          const data = await response.json();
          setMovies(data); 
          setFilteredMovies(data); 
          setAllmovies(data);
        } else {
          console.error("Failed to fetch movies");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, [setAllmovies]);

  // Filter movies based on search query
  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [movies, searchQuery]);

  function handleSeeDetails(id) {
    navigate(`/movieDetails/${id}`);
  }

  return (
    <div className={`min-h-screen py-10 px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-slate-900 to-black'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <div className="container mx-auto">
        <h1 className={`mt-8 text-center text-4xl font-extrabold mb-10 tracking-tight font-mont ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Movie <span className={theme === 'dark' ? 'text-purple-400' : 'text-teal-500'}>Collection</span>
        </h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className={`w-full pl-12 pr-4 py-3 rounded-full font-mont
                focus:outline-none focus:ring-2 transition duration-300 
                shadow-lg hover:shadow-xl ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-2 border-purple-500/30 text-white placeholder-gray-400 focus:ring-purple-500'
                    : 'bg-white border-2 border-teal-500/30 text-gray-700 placeholder-gray-500 focus:ring-teal-500'
                }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch
              className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
              }`}
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie._id}
                className={`group rounded-xl overflow-hidden shadow-lg 
                transition-all duration-300 border ${
                  theme === 'dark'
                    ? 'bg-slate-800 border-slate-700/50 hover:shadow-purple-500/20'
                    : 'bg-white border-gray-200/50 hover:shadow-teal-500/20'
                }`}
              >
                {/* Movie Poster */}
                <div className="relative aspect-[16/12] overflow-hidden">
                  <img
                    src={movie.moviePoster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                    group-hover:scale-110"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 
                  rounded-full flex items-center space-x-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-white text-sm font-semibold">{movie.movieRating}</span>
                  </div>
                </div>

                {/* Movie Info */}
                <div className="p-3">
                  <h2 className={`text-base font-bold truncate font-mont ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {movie.title}
                  </h2>
                  <div className="flex items-center justify-between text-sm font-medium mt-1 mb-2">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {movie.year}
                    </span>
                    <span className={
                      theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                    }>{movie.duration} mins</span>
                  </div>

                  <button
                    onClick={() => handleSeeDetails(movie._id)}
                    className={`w-full py-1.5 rounded-lg font-semibold text-sm 
                    transition-all duration-300 active:scale-95 font-mont
                    flex items-center justify-center group/btn text-white ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                        : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                    }`}
                  >
                    See Details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 ml-2 transform transition-transform duration-300 
                      group-hover/btn:translate-x-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className={`text-xl font-mont ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                No movies found for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllMovies;
