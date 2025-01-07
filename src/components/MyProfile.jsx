import { useContext } from "react";
import { MovieContext } from "../provider/Movieprovider";
import { useTheme } from "../provider/ThemeProvider";
import { FiMail, FiUser } from "react-icons/fi";

function MyProfile() {
  const { user } = useContext(MovieContext);
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen py-20 px-4 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-purple-950 to-black'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <div className="container mx-auto max-w-2xl">
        <div className={`rounded-2xl overflow-hidden shadow-xl ${
          theme === 'dark'
            ? 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50'
            : 'bg-white/80 backdrop-blur-sm border border-slate-200/50'
        }`}>
          {/* Profile Header */}
          <div className={`relative h-32 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-900 to-slate-900'
              : 'bg-gradient-to-r from-teal-500 to-slate-500'
          }`}>
            {/* Profile Image */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
              <div className={`relative inline-block ${
                theme === 'dark'
                  ? 'ring-4 ring-purple-500'
                  : 'ring-4 ring-teal-500'
              } rounded-full`}>
                <img
                  src={user?.photoURL}
                  alt={user?.displayName || "User"}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 pb-8 px-6">
            <div className="text-center mb-6">
              <h1 className={`text-2xl font-bold font-mont mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                {user?.displayName}
              </h1>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Your Profile
              </p>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              {/* Name */}
              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}>
                <FiUser className={theme === 'dark' ? 'text-purple-400' : 'text-teal-500'} />
                <div>
                  <p className={`text-xs mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Full Name
                  </p>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {user?.displayName || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className={`flex items-center gap-3 p-3 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}>
                <FiMail className={theme === 'dark' ? 'text-purple-400' : 'text-teal-500'} />
                <div>
                  <p className={`text-xs mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Email Address
                  </p>
                  <p className={`font-medium ${
                    theme === 'dark' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;