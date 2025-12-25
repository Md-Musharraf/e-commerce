import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const logoutHandler = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        User not logged in
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          <p className="text-sm text-gray-500">Manage your account</p>
        </div>

        {/* User Info */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium text-gray-800">{user.fullName || "N/A"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Role</span>
            <span className="font-medium text-gray-800">{user.isAdmin ? "Admin" : "User"}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="text-green-600 font-medium">Active</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Edit Profile
          </button>

          <button className="w-full py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
            Change Password
          </button>

          <button
            onClick={logoutHandler}
            className="w-full py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
