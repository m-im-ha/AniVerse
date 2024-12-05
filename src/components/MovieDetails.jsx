import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";

function MovieDetails() {
  const { allmovies, setAllmovies } = useContext(MovieContext);
  const movie = useLoaderData();
  console.log(movie);
  const navigate = useNavigate();

  async function handleDeleteMovie(id) {
    const response = await fetch(`http://localhost:5000/movies/${id}`, {
      method: "DELETE",
    });
    const data = response.json();
    setAllmovies(allmovies.filter((movie)=>movie._id !== id));
    navigate("/allmovies");
  }

  return (
    <div className="flex mx-auto max-w-2xl rounded-lg shadow-lg overflow-hidden bg-white">
      {/* Movie Poster */}
      <img
        src={movie.moviePoster}
        alt={`${movie.title} Poster`}
        className="w-1/3 h-auto object-cover"
      />

      {/* Card Content */}
      <div className="flex-1 p-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>

        {/* Genres */}
        <div className="mt-2 flex flex-wrap gap-2">
          {movie.genre.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold py-1 px-3 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Additional Info */}
        <p className="mt-3 text-gray-600">
          <strong>Duration:</strong> {movie.duration} mins
        </p>
        <p className="text-gray-600">
          <strong>Year:</strong> {movie.year}
        </p>

        {/* Movie Summary */}
        <p className="mt-3 text-gray-700">{movie.summary}</p>

        {/* Rating */}
        <p className="mt-3">
          <strong>Rating:</strong>{" "}
          <span className="text-yellow-500">
            {"⭐".repeat(movie.movieRating)}
          </span>
          {Array(5 - movie.movieRating)
            .fill("☆")
            .join("")}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-col gap-4">
          <button
            onClick={() => handleDeleteMovie(movie._id)}
            className="w-1/2 bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Delete Movie
          </button>
          <button className="w-1/2 bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">
            Add to Favorite
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
