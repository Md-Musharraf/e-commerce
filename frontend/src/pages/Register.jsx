import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { postUserBackend, postUserInStore } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch the password field so we can compare it with confirmPassword
  const password = watch("password");

  const onSubmit = (data) => {
    data.isAdmin = false;
    data.id = nanoid();
    data.cart = [];
    dispatch(postUserBackend(data, navigate));
    reset();
  };

  return (
    // 1. Page Background: gray-50 for a clean look
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* 2. Card Container: White background with shadow */}
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-600 mt-2">Join us to start shopping today</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-100"
                }
              `}
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-200"
                    : "bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-100"
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

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
                ${
                  errors.confirmPassword
                    ? "border-red-500 focus:ring-red-200"
                    : "bg-gray-50 border-gray-300 focus:border-blue-600 focus:ring-blue-100"
                }
              `}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-sm mt-2"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link to Login */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
          >
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
