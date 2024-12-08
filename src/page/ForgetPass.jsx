import { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MovieContext } from "../provider/Movieprovider";

function ForgetPass() {
  const { passReset } = useContext(MovieContext);
  const emailRef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      emailRef.current.value = location.state.email;
    }
  }, [location]);

  function handleResetPass(e) {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email) {
      alert(`Please provide a valid email address.`);
      return;
    }

    passReset(email)
      .then(() => {
        window.open("https://mail.google.com/", "_blank");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error.message);
        alert("Failed to send password reset email.");
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-100 p-4 sm:p-6 lg:p-10">
      <div className="card w-full max-w-md rounded-lg bg-white shadow-lg sm:max-w-lg">
        <div className="card-header p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-800 sm:text-3xl">
            Reset Your Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your registered email to reset your password.
          </p>
        </div>
        <form
          onSubmit={handleResetPass}
          className="card-body p-6 space-y-4 sm:p-8"
        >
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-blue-900 font-medium">
                Email Address
              </span>
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="example@mail.com"
              className="input input-bordered w-full"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="form-control">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold shadow-md hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="card-footer p-4 text-center">
          <p className="text-md text-gray-700">
            A password reset link will be sent to your email.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPass;