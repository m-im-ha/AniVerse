import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";

function AllMovies() {
  const { allmovies, setAllmovies } = useContext(MovieContext);
  const movies = useLoaderData();
  const [searchQuery, setSearchQuery] = useState("");
  setAllmovies(movies);
  const navigate = useNavigate();

  // Filter movies based on search query
  const filteredMovies = allmovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(`filtered movie : `,filteredMovies);

  function handleSeeDetails(id) {
    navigate(`/movieDetails/${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-center text-3xl font-bold text-blue-800 mb-6">
        All Movies
      </h1>

      {/*Movie Search Input */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Search by movie title..."
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>

      {/* 3-Column Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="bg-white rounded-lg shadow-lg p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"
            >
              {/* Movie Poster */}
              <div>
                <img
                  src={movie.moviePoster}
                  alt={movie.title}
                  className="w-full h-60 object-cover rounded-lg bg-gray-200"
                />
              </div>
              {/* Movie Details */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Genre:</span>{" "}
                  {movie.genre.join(", ")}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Year:</span> {movie.year}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Duration:</span>{" "}
                  {movie.duration} mins
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Rating:</span>{" "}
                  {movie.movieRating}⭐
                </p>
                {/* <p className="text-sm text-gray-600">{movie.summary}</p> */}
                <button
                  onClick={() => handleSeeDetails(movie._id)}
                  className="mt-auto self-start rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition hover:bg-blue-600"
                >
                  See Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No movies found for "{searchQuery}".
          </p>
        )}
      </div>
    </div>
  );
}

export default AllMovies;
