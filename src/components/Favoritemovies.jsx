import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../provider/Movieprovider";
import Swal from "sweetalert2";
import Loading from "../ui/Loading";

function Favoritemovies() {
  const { user, loading, setLoading } = useContext(MovieContext);
  const [favorites, setFavorites] = useState([]);
  // console.log(favorites);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://animated-movieportal-server.vercel.app/favorites/${user.userID}`
        );
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchFavorites();
  }, [user, setLoading]);

  function handleDeleteFavorite(movieId) {
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
          setLoading(true);
          const response = await fetch(
            `https://animated-movieportal-server.vercel.app/favorites/${user.userID}/${movieId}`,
            {
              method: "DELETE",
            }
          );
          const data = await response.json();
          setFavorites((prevFavorites) =>
            prevFavorites.filter((movie) => movie._id !== movieId)
          );

          Swal.fire({
            title: "Deleted!",
            text: "Your movie has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Error deleting movie:", error);
        } finally {
          setLoading(false);
        }
      }
    });
  }

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-base py-10 px-4">
      <h1 className="text-center text-4xl font-extrabold text-blue-900 mb-10 tracking-tight">
        My Favorite Movies
      </h1>
      {/* Movie card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {favorites.map((movie) => (
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
                onClick={() => handleDeleteFavorite(movie._id)}
                className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg font-semibold transition hover:from-red-600 hover:to-red-700 hover:shadow-lg focus:ring-4 focus:ring-red-300 active:scale-95"
              >
                Delete Favorite
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoritemovies;
