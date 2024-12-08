import { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";
import Swal from "sweetalert2";
import { FaTrash, FaStar, FaEdit, FaHeart } from 'react-icons/fa';
import SeeAllButton from "./SeeAllButton";

function MovieDetails() {
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
    <div className="group relative mx-auto max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-900 dark:to-gray-700 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
    
    <div className="relative grid md:grid-cols-[1fr_2fr] gap-6 p-6">
      {/* Movie Poster with Hover Effect */}
      <div className="relative rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 group-hover:scale-105">
        <img
          src={movie.moviePoster}
          alt={`${movie.title} Poster`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col justify-between space-y-4">
        {/* Title with Subtle Animation */}
        <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight 
          transform transition-transform duration-300 group-hover:-translate-y-1">
          {movie.title}
        </h2>

        {/* Genres with Hover Effect */}
        <div className="flex flex-wrap gap-2">
          {movie.genre.map((genre, index) => (
            <span
              key={index}
              className="inline-block bg-blue-500 text-white text-xs font-semibold py-1 px-3 rounded-full 
                transition-all duration-300 hover:bg-blue-600 hover:scale-105"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p className="flex items-center">
            <span className="font-semibold mr-2">Duration:</span>
            {movie.duration} mins
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-2">Year:</span>
            {movie.year}
          </p>
        </div>

        {/* Movie Summary */}
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {movie.summary}
        </p>

        {/* Rating */}
        <div className="flex items-center">
          <span className="font-semibold mr-2 text-gray-800 dark:text-gray-200">Rating:</span>
          <div className="flex">
            {[...Array(movie.movieRating)].map((_, i) => (
              <FaStar key={`filled-${i}`} className="text-yellow-500 mr-1" />
            ))}
            {[...Array(5 - movie.movieRating)].map((_, i) => (
              <FaStar key={`empty-${i}`} className="text-gray-300 mr-1" />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleDeleteMovie(movie._id)}
            className="w-full flex items-center justify-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg 
              hover:bg-red-600 transition-all duration-300 group/delete"
          >
            <FaTrash className="mr-2 group-hover/delete:animate-wiggle" />
            Delete Movie
          </button>
          <button
            onClick={handleAddToFavorites}
            className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg 
              hover:bg-blue-600 transition-all duration-300 group/favorite"
          >
            <FaHeart className="mr-2 group-hover/favorite:scale-110 group-hover/favorite:text-pink-300" />
            Add to Favorite
          </button>
          <button
            onClick={handleUpdateMovie}
            className="w-full flex items-center justify-center bg-green-500 text-white font-semibold py-2 px-4 rounded-lg 
              hover:bg-green-600 transition-all duration-300 group/update"
          >
            <FaEdit className="mr-2 group-hover/update:rotate-6" />
            Update Movie
          </button>
        </div>
      </div>
    </div>
    <SeeAllButton/>
  </div>
  
  );
}

export default MovieDetails;
