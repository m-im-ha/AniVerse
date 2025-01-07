import { useNavigate } from "react-router-dom";
import { useTheme } from "../provider/ThemeProvider";

function SeeAllButton() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  function handleSeeAllMovies() {
    navigate("/allmovies");
  }

  return (
    <div className={`flex items-center justify-center min-h-screen px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-purple-950 to-black'
        : 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800'
    }`}>
      <div className={`text-center max-w-4xl p-8 rounded-3xl shadow-2xl backdrop-blur-xl ${
        theme === 'dark'
          ? 'bg-purple-950/30'
          : 'bg-slate-800/30'
      }`}>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-wide leading-tight font-mont">
          Streaming{" "}
          <span className={`drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)] ${
            theme === 'dark' 
              ? 'text-purple-400' 
              : 'text-teal-400'
          }`}>
            Is Believing
          </span>
          <span className={`inline-block ml-2 ${
            theme === 'dark' 
              ? 'text-purple-400' 
              : 'text-teal-400'
          } transform group-hover:translate-x-2 
          transition-transform duration-300`}>
            &gt;
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-white/80 font-medium leading-relaxed font-mont">
          Experience a world of limitless entertainment at your fingertips.
        </p>

        <button
          onClick={handleSeeAllMovies}
          className={`mt-10 relative inline-flex items-center px-12 py-4 
          text-white font-bold text-lg rounded-full shadow-lg font-mont
          hover:shadow-2xl transition-all duration-300 ease-in-out 
          hover:scale-105 active:scale-95 focus:outline-none ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
              : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
          }`}
        >
          <span className={`absolute inset-0 w-full h-full rounded-full blur-xl opacity-30 
          group-hover:opacity-50 transition-opacity duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600'
              : 'bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500'
          }`}></span>

          {/* Button Text and Icon */}
          <span className="relative z-10 flex items-center space-x-2">
            <span>See All Movies</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2 transform transition-transform duration-300 
              group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default SeeAllButton;