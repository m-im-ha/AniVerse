import { FaGlobe, FaPiggyBank } from "react-icons/fa";
import { MdDevices } from "react-icons/md";
import { PiSubtitlesBold } from "react-icons/pi";

function ServiceHighlights() {
  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-100 py-16 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 leading-tight">
          Why Choose Us
        </h2>
        <p className="text-lg md:text-xl text-gray-600 text-center mt-4">
          Discover the benefits of our platform with these amazing features.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
          {/* Feature 1 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              <FaGlobe className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
              Works Worldwide
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              No other free streaming service delivers more content to and from
              more countries worldwide.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              <PiSubtitlesBold className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              Thousands of Titles
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              Choose from movies, shows, sports and music documentaries, AMC
              series, Live TV, and more.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              <FaPiggyBank className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
              Always 100% Free
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              Welcome to instant gratification at its best. Watch now without
              any payment or subscription.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center text-center space-y-4 group">
            <div className="p-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110">
              <MdDevices className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-yellow-600 transition-colors duration-300">
              Device-Friendly
            </h3>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
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
