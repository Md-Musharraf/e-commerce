import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <div className="flex items-center justify-center gap-10 text-lg p-2 ">
      <NavLink to="/">Home</NavLink>
      <>
        {user ? (
          <>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            {/* Admin-only */}
            {user.isAdmin && <NavLink to="/admin.create">Create Product</NavLink>}
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </>
    </div>
  );
};

export default Nav;
