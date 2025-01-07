import { useNavigate } from "react-router-dom";
import { useTheme } from "../provider/ThemeProvider";

function Featured({ featuresMovieData }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  function handleSeeDetails(id) {
    navigate(`/movieDetails/${id}`);
  }

  return (
    <div className={`py-10 px-4 ${
      theme === 'dark' 
        ? 'bg-slate-900' 
        : 'bg-gray-100'
    }`}>
      <div className="container mx-auto">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-8 font-mont">
          Featured{" "}
          <span className={
            theme === 'dark' 
              ? 'text-purple-400' 
              : 'text-teal-500'
          }>Movies</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuresMovieData.map((movie) => (
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
                  flex items-center justify-center group/btn ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white'
                      : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white'
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Featured;