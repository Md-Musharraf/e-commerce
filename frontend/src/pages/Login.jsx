import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { useDispatch } from "react-redux";
import { verifyUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(verifyUser(data, navigate));
  };

  const forgetPassword = () => {
    navigate("/forget-password");
  };

  return (
    // 1. Global Page Background
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* 2. Login Card Container */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-sm text-gray-600 mt-2">Please sign in to your account</p>
        </div>

        {/* Form Start */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200" // Error State
                    : "bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-100" // Normal State
                }
              `}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {/* Optional: Forgot Password Link */}
              <a
                onClick={forgetPassword}
                href="#"
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-200"
                    : "bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-100"
                }
              `}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm"
          >
            Sign In
          </button>
        </form>

        {/* Footer / Register Link */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account? {/* React Router Link to switch to the Register page */}
          <Link
            to="/register"
            className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
