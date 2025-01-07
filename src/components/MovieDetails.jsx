import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import Swal from "sweetalert2";
import { FaTrash, FaStar, FaEdit, FaHeart } from "react-icons/fa";
import SeeAllButton from "./SeeAllButton";
import { useTheme } from "../provider/ThemeProvider";

function MovieDetails() {
  const { theme } = useTheme();
  const { user, allmovies, setAllmovies } = useContext(MovieContext);
  // console.log(`user : `, user);
  const movie = useLoaderData();
  // console.log(movie);
  const navigate = useNavigate();

  async function handleDeleteMovie(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://animated-movieportal-server.vercel.app/movies/${id}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          setAllmovies(allmovies.filter((movie) => movie._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your movie has been deleted.",
            icon: "success",
          });
          navigate("/allmovies");
        } catch (error) {
          console.error("Error deleting movie:", error);
        }
      }
    });
  }

  const handleAddToFavorites = async () => {
    try {
      //   console.log("User ID:", user?._id);
      // console.log("Movie ID:", movie._id);
      const response = await fetch(
        `https://animated-movieportal-server.vercel.app/favorites/${user.userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ movieId: movie._id }),
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "Movie added to your favorites!!",
          icon: "success",
          confirmButtonColor: "Ok",
        });
        navigate("/allmovies");
        // console.log("Added to favorites!");
      } else {
        // console.log("Failed to add to favorites.");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      // console.log("An error occurred.");
    }
  };

  function handleUpdateMovie() {
    navigate("/updatemovie", { state: { movie } });
  }

  return (
    <div
      className={`min-h-screen py-16 px-4 ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-slate-900 to-black"
          : "bg-gradient-to-br from-slate-100 via-white to-slate-100"
      }`}
    >
      <div className="container mx-auto">
        <div
          className={`max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-xl
          ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-sm border border-slate-700/50"
              : "bg-white/80 backdrop-blur-sm border border-slate-200/50"
          }`}
        >
          <div className="grid md:grid-cols-[2fr_3fr] gap-8 p-8">
            {/* Left Side - Poster */}
            <div className="relative group">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-[18/20] relative">
                  <img
                    src={movie.moviePoster}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 
        group-hover:scale-105"
                  />
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 
        transition-opacity duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-t from-purple-900/80 to-transparent"
            : "bg-gradient-to-t from-teal-900/80 to-transparent"
        }`}
                  />
                </div>
              </div>

              {/* Rating Badge */}
              <div
                className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 
    rounded-full flex items-center space-x-2"
              >
                <span className="text-yellow-400">★</span>
                <span className="text-white font-semibold">
                  {movie.movieRating}/5
                </span>
              </div>
            </div>

            {/* Right Side - Details */}
            <div className="flex flex-col space-y-6">
              <div>
                <h1
                  className={`text-4xl font-extrabold font-mont mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {movie.title}
                </h1>

                {/* Genre Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((genre, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        theme === "dark"
                          ? "bg-purple-500/20 text-purple-300"
                          : "bg-teal-500/20 text-teal-700"
                      }`}
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                {/* Movie Info */}
                <div
                  className={`space-y-3 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  } font-mont`}
                >
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Duration:</span>
                    {movie.duration} minutes
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-semibold">Release Year:</span>
                    {movie.year}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                } font-mont leading-relaxed`}
              >
                <h3
                  className={`text-lg font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  Summary
                </h3>
                <p>{movie.summary}</p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-auto">
                <button
                  onClick={() => handleDeleteMovie(movie._id)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  bg-red-500 hover:bg-red-600 text-white font-semibold font-mont
                  transition-all duration-300 hover:scale-[1.02] active:scale-98"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  onClick={handleAddToFavorites}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  text-white font-semibold font-mont transition-all duration-300 
                  hover:scale-[1.02] active:scale-98 ${
                    theme === "dark"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  <FaHeart /> Favorite
                </button>
                <button
                  onClick={handleUpdateMovie}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl
                  text-white font-semibold font-mont transition-all duration-300 
                  hover:scale-[1.02] active:scale-98 ${
                    theme === "dark"
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-teal-600 hover:bg-teal-700"
                  }`}
                >
                  <FaEdit /> Update
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* See All Button */}
        <div className="mt-8">
          <SeeAllButton />
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
