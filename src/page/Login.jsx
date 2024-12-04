import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
  } = useForm();

  function handleLogin(data) {
    // e.preventDefault();
    // console.log(123);
    console.log(data);
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg p-6 sm:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 sm:text-3xl">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600">
            Nice to see you again! Enter your details to log in.
          </p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="mt-6 space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900 font-medium">
                Email
              </span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="input input-bordered w-full"
              {...register("email")}  
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900 font-medium">
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="input input-bordered w-full"
              {...register("password")}
            />
            <label className="label">
              <Link className="text-blue-500 hover:underline label-text-alt">
                Forgot password?
              </Link>
            </label>
          </div>
          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 py-2 text-white font-semibold hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        {/* Divider */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <div className="h-px w-1/3 bg-gray-300"></div>
          <p className="text-sm text-gray-500">OR</p>
          <div className="h-px w-1/3 bg-gray-300"></div>
        </div>
        {/* Google Login */}
        <div className="form-control mt-4">
          <button className="flex items-center justify-center gap-2 w-full rounded-lg bg-white border border-gray-300 py-2 text-blue-600 font-semibold shadow-md hover:bg-gray-100 transition">
            <FaGoogle size={18} />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
