import { useNavigate } from "react-router-dom";

function SeeAllButton() {
  const navigate = useNavigate();

  function handleSeeAllMovies() {
    navigate("/allmovies");
  }

  return (
    <div className="flex justify-center mt-5 mb-20 px-4">
      <button
        onClick={handleSeeAllMovies}
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold text-lg md:text-xl rounded-2xl 
               shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out 
               hover:scale-105 active:scale-95 
               border-2 border-transparent hover:border-white 
               relative overflow-hidden group"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-500 opacity-30 group-hover:opacity-0 transition-opacity duration-300"></span>

        <span className="relative z-10 flex items-center justify-center">
          See All Movies
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 transition-transform group-hover:translate-x-2"
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
  );
}

export default SeeAllButton;
