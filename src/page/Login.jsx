import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { MovieContext } from "../provider/Movieprovider";
import { useTheme } from "../provider/ThemeProvider";

import loginSideImg from "/assets/loginSideImg.jpg";

function Login() {
  const { theme } = useTheme();
  const { register, handleSubmit } = useForm();
  const { user, loginUser, setUser, signInWithGoogle,setLoading } =
    useContext(MovieContext);
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin(data) {
    setLoading(true); 
    const email = data.email;
  
    loginUser(email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        // Fetch user data from the backend
        const response = await fetch(
          `https://animated-movieportal-server.vercel.app/users?email=${email}`
        );
        const backendUser = await response.json();
  
        setUser({
          ...user,
          userID: backendUser._id,
        });
  
        setLoading(false);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error.message);

        setLoading(false);
        toast.error(`Invalid email or password.`, {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          theme: "light",
        });
      });
  }
  

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((result) => {
        navigate(location?.state ? location.state : "/");
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
        <div className={`flex flex-col lg:flex-row-reverse max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl ${
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
                Log in to continue your journey
              </p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
                  className={`w-full pl-12 pr-4 py-3 rounded-xl font-mont
                    transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-teal-500/20 text-gray-800 placeholder-gray-500 focus:border-teal-500'
                  }`}
                  {...register("email", { required: true })}
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
                  className={`w-full pl-12 pr-4 py-3 rounded-xl font-mont
                    transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-teal-500/20 text-gray-800 placeholder-gray-500 focus:border-teal-500'
                  }`}
                  {...register("password", { required: true })}
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  to="/forgetpass"
                  className={`text-sm font-mont ${
                    theme === 'dark'
                      ? 'text-purple-400 hover:text-purple-300'
                      : 'text-teal-500 hover:text-teal-600'
                  }`}
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-mont text-white font-semibold
                transition-all duration-300 transform hover:scale-[1.02] active:scale-98 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900'
                    : 'bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800'
                }`}
              >
                Login
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

            {/* Register Link */}
            <div className="mt-6 text-lg font-medium text-center font-mont">
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Don't have an account?{" "}
                <Link to="/register" className={
                  theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-teal-500 hover:text-teal-600'
                }>
                  Register Now
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
              src={loginSideImg}
              alt="Login"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center font-mont text-slate-900 p-8">
                <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
                <p className="text-lg font-semibold">
                  Continue your journey through the world of animation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
