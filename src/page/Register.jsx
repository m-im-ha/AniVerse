import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MovieContext } from "../provider/Movieprovider";
import { useTheme } from "../provider/ThemeProvider";

import registerSideImg from "/assets/registerSideImg.jpg";

function Register() {
  const { theme } = useTheme();
  const { createUser, updateUserProfile, signInWithGoogle, user, setUser } =
    useContext(MovieContext);
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const Photo_URL = form.get("Photo_URL");
    const password = form.get("password");

    const passValidation =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!passValidation.test(password)) {
      toast.error(
        `Password must be at least 6 characters with a mix of symbols, uppercase, lowercase letters, and numbers.`,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }

    createUser(email, password)
      .then(async (userCredential) => {
        const createdAt = userCredential?.user?.metadata?.creationTime;
        const favorites = [];
        const newUser = { name, email, createdAt, favorites };
        const response = await fetch(
          `https://animated-movieportal-server.vercel.app/users`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          }
        );
        const data = await response.json();
        return updateUserProfile({
          displayName: name,
          photoURL: Photo_URL,
        }).then(() => {
          setUser({
            ...userCredential.user,
            displayName: name,
            photoURL: Photo_URL,
            userID: data.insertedId,
          });
        });
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch((error) => console.error("Error during registration:", error));
  }

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((result) => {
        setUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className={`mt-6 min-h-screen flex items-center justify-center ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-black via-purple-950 to-black'
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <ToastContainer />

      <div className="container mx-auto px-4 py-8">
        <div className={`flex flex-col lg:flex-row max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl ${
          theme === 'dark'
            ? 'bg-slate-900/50 backdrop-blur-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}>
          {/* Left Side - Form */}
          <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <h2 className={`text-4xl font-extrabold font-mont mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
                Welcome to <span className={
                  theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                }>AniVerse</span>
              </h2>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              } font-mont`}>
                Create your account to start your journey
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name Input */}
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center ${
                  theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                }`}>
                  <FaUser />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl font-mont
                    transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-teal-500/20 text-gray-800 placeholder-gray-500 focus:border-teal-500'
                  }`}
                  required
                />
              </div>

              {/* Email Input */}
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center ${
                  theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                }`}>
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl font-mont
                    transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-teal-500/20 text-gray-800 placeholder-gray-500 focus:border-teal-500'
                  }`}
                  required
                />
              </div>

              {/* Photo URL Input */}
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center ${
                  theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                }`}>
                  <FaImage />
                </div>
                <input
                  type="text"
                  placeholder="Photo URL"
                  name="Photo_URL"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl font-mont
                    transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-teal-500/20 text-gray-800 placeholder-gray-500 focus:border-teal-500'
                  }`}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center ${
                  theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
                }`}>
                  <FaLock />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={`w-full pl-12 pr-4 py-3 rounded-xl font-mont
                    transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-teal-500/20 text-gray-800 placeholder-gray-500 focus:border-teal-500'
                  }`}
                  required
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-mont text-white font-semibold
                transition-all duration-300 transform hover:scale-[1.02] active:scale-98 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                    : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                }`}
              >
                Register Now
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6 space-x-4">
              <div className={`flex-grow h-px ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
              <span className={`text-sm font-mont ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>OR</span>
              <div className={`flex-grow h-px ${
                theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
              }`}></div>
            </div>

            {/* Google Sign-In */}
            <button
              onClick={handleSignInWithGoogle}
              className={`w-full py-3 rounded-xl font-mont flex items-center justify-center
              transition-all duration-300 transform hover:scale-[1.02] active:scale-98 ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaGoogle className={`mr-3 ${
                theme === 'dark' ? 'text-purple-400' : 'text-teal-500'
              }`} />
              Continue with Google
            </button>

            {/* Login Link */}
            <div className="mt-6 text-lg font-medium text-center font-mont">
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Already have an account?{" "}
                <Link to="/login" className={
                  theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-teal-500 hover:text-teal-600'
                }>
                  Login
                </Link>
              </span>
            </div>
          </div>

          {/* Right Side - Image/Illustration */}
          <div className="hidden lg:block w-1/2 relative overflow-hidden">
            <div className={`absolute inset-0 ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-purple-900/90 via-purple-800/90 to-purple-900/90'
                : 'bg-gradient-to-br from-teal-500/90 via-teal-400/90 to-teal-500/90'
            }`}></div>
            <img
              src={registerSideImg}
              alt="Register"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className=" font-mont text-center text-slate-900 p-8">
                <h3 className="text-3xl font-bold font-mont mb-4">Join Our Community</h3>
                <p className="text-lg font-medium">
                  Discover amazing animated movies and connect with fellow enthusiasts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;