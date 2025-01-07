import { FaGlobe, FaPiggyBank } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { PiSubtitlesBold } from "react-icons/pi";
import { useTheme } from "../provider/ThemeProvider";

function ServiceHighlights() {
  const { theme } = useTheme();

  return (
    <div className={`py-16 px-6 md:px-16 lg:px-24 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-900'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-extrabold text-center leading-tight font-mont ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}>
          Why Choose Us
        </h2>
        <p className={`text-lg md:text-xl text-center mt-4 font-mont ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Discover the benefits of our platform with these amazing features.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-6 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-purple-800'
                : 'bg-gradient-to-r from-teal-500 to-teal-700'
            }`}>
              <FaGlobe className="h-10 w-10" />
            </div>
            <h3 className={`text-xl font-semibold font-mont transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-white group-hover:text-purple-400' 
                : 'text-gray-800 group-hover:text-teal-600'
            }`}>
              Works Worldwide
            </h3>
            <p className={`transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 group-hover:text-gray-100'
                : 'text-gray-600 group-hover:text-gray-800'
            }`}>
              No other free streaming service delivers more content to and from
              more countries worldwide.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-6 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-purple-800'
                : 'bg-gradient-to-r from-teal-500 to-teal-700'
            }`}>
              <PiSubtitlesBold className="h-10 w-10" />
            </div>
            <h3 className={`text-xl font-semibold font-mont transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-white group-hover:text-purple-400' 
                : 'text-gray-800 group-hover:text-teal-600'
            }`}>
              Thousands of Titles
            </h3>
            <p className={`transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 group-hover:text-gray-100'
                : 'text-gray-600 group-hover:text-gray-800'
            }`}>
              Choose from movies, shows, sports and music documentaries, AMC
              series, Live TV, and more.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-6 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-purple-800'
                : 'bg-gradient-to-r from-teal-500 to-teal-700'
            }`}>
              <FaPiggyBank className="h-10 w-10" />
            </div>
            <h3 className={`text-xl font-semibold font-mont transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-white group-hover:text-purple-400' 
                : 'text-gray-800 group-hover:text-teal-600'
            }`}>
              Always 100% Free
            </h3>
            <p className={`transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 group-hover:text-gray-100'
                : 'text-gray-600 group-hover:text-gray-800'
            }`}>
              Welcome to instant gratification at its best. Watch now without
              any payment or subscription.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className={`p-6 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-purple-600 to-purple-800'
                : 'bg-gradient-to-r from-teal-500 to-teal-700'
            }`}>
              <MdDevices className="h-10 w-10" />
            </div>
            <h3 className={`text-xl font-semibold font-mont transition-colors duration-300 ${
              theme === 'dark' 
                ? 'text-white group-hover:text-purple-400' 
                : 'text-gray-800 group-hover:text-teal-600'
            }`}>
              Device-Friendly
            </h3>
            <p className={`transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-gray-300 group-hover:text-gray-100'
                : 'text-gray-600 group-hover:text-gray-800'
            }`}>
              Stream the good stuff from your favorite devices, including Apple,
              Android, Smart TVs, and more.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceHighlights;