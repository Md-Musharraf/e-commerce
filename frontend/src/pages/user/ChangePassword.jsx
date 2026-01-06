import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../../redux/userSlice";

const ChangePassword = ({ closeModel }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // Validates as the user types
  });

  const newPassword = watch("newPassword");

  const submitHandler = (data) => {
    dispatch(changePassword(data));
    closeModel();
    reset();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModel();
    }
  };
  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/20 flex items-center justify-center p-4"
    >
      {/* The Card */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col w-full max-w-md p-8 
                   bg-white/90 backdrop-blur-xl 
                   rounded-3xl border border-white/40 
                   shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all"
      >
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">Change Password</h2>
          <p className="text-slate-500 text-sm mt-1">
            Please enter your details to update security.
          </p>
        </div>

        <div className="space-y-5">
          {/* Current Password */}
          <div className="flex flex-col gap-1">
            <input
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                ${
                  errors.password
                    ? "border-red-400 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50 focus:border-indigo-500"
                }`}
              {...register("password", { required: "Current password is required" })}
              type="password"
              placeholder="Current Password"
            />
            {errors.password && (
              <span className="text-xs text-red-500 ml-2">{errors.password.message}</span>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <input
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                ${
                  errors.newPassword
                    ? "border-red-400 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50 focus:border-indigo-500"
                }`}
              {...register("newPassword", {
                required: "New password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" },
              })}
              type="password"
              placeholder="New Password"
            />
            {errors.newPassword && (
              <span className="text-xs text-red-500 ml-2">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <input
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all
                ${
                  errors.confirmNewPassword
                    ? "border-red-400 bg-red-50/50"
                    : "border-slate-200 bg-slate-50/50 focus:border-indigo-500"
                }`}
              {...register("confirmNewPassword", {
                required: "Please confirm your password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm New Password"
            />
            {errors.confirmNewPassword && (
              <span className="text-xs text-red-500 ml-2">{errors.confirmNewPassword.message}</span>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl 
                       hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg"
          >
            Update Password
          </button>

          <button
            type="button"
            onClick={closeModel}
            className="w-full py-2 text-slate-500 text-sm font-medium hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
