import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { MovieContext } from "../provider/Movieprovider";

function Register() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4 py-10">
      <ToastContainer />

      <div className="w-full max-w-md bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
        <div className="p-8 text-center">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-gray-100 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
              Create Your Account
            </h2>
            <p className="text-gray-400 text-sm">
              Enter your details to start your journey
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Photo URL Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaImage className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Photo URL"
                name="Photo_URL"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                required
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Register Now
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 space-x-4">
            <div className="flex-grow h-px bg-gray-600"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-600"></div>
          </div>

          {/* Google Sign-In */}
          <button
            onClick={handleSignInWithGoogle}
            className="w-full py-3 rounded-xl bg-gray-700 border border-gray-600 text-gray-200 flex items-center justify-center hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <FaGoogle className="mr-3 text-yellow-400" />
            Continue with Google
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-pink-400 hover:text-pink-500">
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;