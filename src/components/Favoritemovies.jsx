import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../provider/Movieprovider";
import Swal from "sweetalert2";
import Loading from "../ui/Loading";
import { useTheme } from "../provider/ThemeProvider";

function Favoritemovies() {
  const { theme } = useTheme();
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
    <div className={`mt-8 min-h-screen py-10 px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-slate-900 to-black'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <div className="container mx-auto">
        <h1 className={`text-center text-4xl font-extrabold mb-10 tracking-tight font-mont ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          My Favorite <span className={theme === 'dark' ? 'text-purple-400' : 'text-teal-500'}>Movies</span>
        </h1>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className={`text-6xl mb-4 ${theme === 'dark' ? 'text-purple-400' : 'text-teal-500'}`}>
              ★
            </div>
            <p className={`text-xl font-mont ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              No favorite movies added yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {favorites.map((movie) => (
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
                  <div className="flex items-center justify-between text-xs mt-1 mb-2">
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      {movie.year}
                    </span>
                    <span className={
                      theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                    }>{movie.duration} mins</span>
                  </div>

                  <button
                    onClick={() => handleDeleteFavorite(movie._id)}
                    className="w-full py-1.5 rounded-lg font-semibold text-sm 
                    transition-all duration-300 active:scale-95 font-mont
                    flex items-center justify-center text-white
                    bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favoritemovies;
