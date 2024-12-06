import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      .then((userCredential) => {
        console.log("User created:", userCredential.user);
        return updateUserProfile({ displayName: name, photoURL: Photo_URL })
          .then(() => {
            console.log("Profile updated on backend.");
            setUser({
              ...userCredential.user,
              displayName: name,
              photoURL: Photo_URL,
            });
          });
      })
      .then(() => {
        console.log("Context updated, navigating...");
        navigate("/", { replace: true });
      })
      .catch((error) => console.error("Error during registration:", error));
  }
  

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        console.log(`from signInWithGoogle : `, user);
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 sm:text-3xl">
            Create Your Account
          </h2>
          <p className="mt-2 text-gray-600">
            Nice to meet you! Enter your details to sign up.
          </p>
        </div>
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Photo URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Photo URL
              </span>
            </label>
            <input
              type="text"
              name="Photo_URL"
              placeholder="Link to your photo"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-blue-900">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Choose a secure password"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Submit */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition hover:bg-blue-600"
            >
              Register Now
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        {/* Divider */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <div className="h-px w-1/3 bg-gray-300"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="h-px w-1/3 bg-gray-300"></div>
        </div>
        {/* Google Sign-In */}
        <div className="form-control mt-4">
          <button
            onClick={handleSignInWithGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2 font-semibold text-blue-600 shadow-md transition hover:bg-gray-100"
          >
            <FaGoogle size={18} />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
