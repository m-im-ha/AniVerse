
import { useNavigate } from "react-router-dom";
import corpsebride from "/assets/corpsebride.jpg";
import dragon from "/assets/dragon.webp";
import spiderman from "/assets/spiderman.webp";

function MediaShowcase() {
    const navigate = useNavigate();

    function handleAdd(){
        navigate("/addmovie");
    }

  return (
    <div className="relative bg-gradient-to-br from-purple-700 via-gray-900 to-black py-16 px-6 md:px-16 lg:px-24 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-blob"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8 self-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            You bring your <span className="text-purple-300 italic">media</span>
            , we'll do the <span className="text-purple-300 italic">magic</span>.
          </h1>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed tracking-wide">
            Transform your personal media into a cinematic experience.
            Seamlessly organize, beautify, and stream your movies, shows, music,
            and photos across all devices with elegance.
          </p>
          <div className="flex justify-center lg:justify-start items-center space-x-8">
            <button
            onClick={handleAdd}
              className="px-10 py-4 md:py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 text-white font-bold text-lg md:text-xl 
                rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform transition-all duration-400 
                hover:scale-110 
                flex items-center group outline-none focus:ring-4 focus:ring-purple-400/50"
            >
              <span>Add Now</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-7 md:w-7 ml-3 md:ml-4 transition-transform group-hover:translate-x-2"
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
            </button>

            <div className="hidden md:block text-white/70 hover:text-white transition-all duration-300 group">
              <span className="cursor-pointer text-lg flex items-center group-hover:pl-2">
                Watch Demo
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 opacity-0 group-hover:opacity-100 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center lg:justify-end items-center h-[450px] md:h-[500px] lg:h-[600px] w-full perspective-1000">
          <div className="relative w-full h-full">
            {/* First Image (Corpse Bride) */}
            <div
              className="absolute top-12 left-0 md:left-8 transition-all duration-500 
              hover:z-40 hover:scale-110 hover:rotate-3 
              shadow-2xl hover:shadow-purple-500/50 
              transform hover:-translate-x-6 hover:translate-y-3"
            >
              <img
                src={corpsebride}
                alt="Corpse Bride"
                className="w-40 md:w-56 lg:w-64 xl:w-72 h-auto object-cover rounded-2xl border-4 border-white/10"
              />
            </div>

            {/* Second Image (Dragon) */}
            <div
              className="absolute top-[-10px] left-20 md:left-40 transition-all duration-500 
              hover:z-50 hover:scale-125 hover:-rotate-3 
              shadow-2xl hover:shadow-purple-500/50 
              transform hover:translate-x-6 hover:-translate-y-3"
            >
              <img
                src={dragon}
                alt="Dragon"
                className="w-56 md:w-72 lg:w-80 xl:w-96 h-auto object-cover rounded-2xl border-4 border-white/10"
              />
            </div>

            {/* Third Image (Spider-Man) */}
            <div
              className="absolute top-80 left-16 md:top-72 md:left-0 transition-all duration-500 
              hover:z-30 hover:scale-110 hover:rotate-2 
              shadow-2xl hover:shadow-purple-500/50 
              transform hover:-translate-x-3 hover:translate-y-3"
            >
              <img
                src={spiderman}
                alt="Spider-Man"
                className="w-40 md:w-56 lg:w-64 xl:w-72 h-auto object-cover rounded-2xl border-4 border-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaShowcase;
