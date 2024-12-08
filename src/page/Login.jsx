import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState } from "react";
import { MovieContext } from "../provider/Movieprovider";

function Login() {
  const { register, handleSubmit } = useForm();
  const { user, loginUser, setUser, signInWithGoogle } =
    useContext(MovieContext);
  const [emailForForgetPass, setEmailForForgetPass] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin(data) {
    const email = data.email;
    loginUser(email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const response = await fetch(
          `https://animated-movieportal-server.vercel.app/users?email=${email}`
        );
        const backendUser = await response.json();
        setUser((prevUser) => ({
          ...prevUser,
          userID: backendUser._id,
        }));

        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error.message);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4 py-10">
      <ToastContainer />

      <div className="w-full max-w-md bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("email", { required: true })}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex -mt-7 items-center">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                {...register("password", { required: true })}
              />
              <div className="text-right mt-2">
                <Link
                  to="/forgetpass"
                  className="text-pink-400 hover:text-pink-500 text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 space-x-4">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleSignInWithGoogle}
            className="w-full py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <FaGoogle className="mr-3 text-yellow-400" />
            Continue with Google
          </button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-pink-400 hover:text-pink-500"
              >
                Register Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
