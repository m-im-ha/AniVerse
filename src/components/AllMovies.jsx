import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import { FaSearch } from "react-icons/fa";

function AllMovies() {
  const { allmovies, setAllmovies } = useContext(MovieContext);
  const movies = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  if (allmovies.length === 0) {
    setAllmovies(movies);
  }

  // Filter movies based on search query
  const filteredMovies = allmovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleSeeDetails(id) {
    navigate(`/movieDetails/${id}`);
  }

  return (
    <div className="min-h-screen bg-base py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-extrabold text-blue-900 mb-10 tracking-tight">
          Movie Collection
        </h1>

        {/* Search Input with Icon */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-blue-200 
                focus:outline-none focus:ring-2 focus:ring-blue-400 
                text-gray-700 transition duration-300 
                shadow-lg hover:shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 
              text-gray-400"
            />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
              key={movie._id}
              className="group relative overflow-hidden rounded-lg shadow-md 
              transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 
              bg-white border border-gray-200"
            >
              {/* Movie Poster */}
              <div className="relative pt-[120%] overflow-hidden">
                <img
                  src={movie.moviePoster}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover 
                  transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                flex items-end p-4"
                >
                  <div className="text-white">
                    <h3 className="text-lg font-semibold">{movie.title}</h3>
                    <p className="text-sm text-white/80">
                      {movie.genre.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800 truncate">
                    {movie.title}
                  </h2>
                  <div className="flex items-center bg-yellow-300 text-gray-900 px-2 py-1 rounded-md text-sm font-medium">
                    <span className="text-yellow-700 text-xl mr-1">★</span>
                    {movie.movieRating}
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>{movie.year}</span>
                  <span>{movie.duration} mins</span>
                </div>

                <button
                  onClick={() => handleSeeDetails(movie._id)}
                  className="w-full mt-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white py-3 rounded-lg 
                  font-semibold text-lg transition-all duration-300 
                  hover:from-purple-600 hover:to-purple-800 hover:shadow-xl hover:shadow-purple-400/50 
                  active:scale-95 focus:outline-none focus:ring-4 focus:ring-purple-500/50 flex items-center justify-center"
                >
                  See Details
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 ml-2"
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
              <p className="text-gray-500 text-xl">
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
