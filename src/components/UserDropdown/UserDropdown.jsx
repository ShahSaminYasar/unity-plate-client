import PropTypes from "prop-types";
import useAuth from "../../hooks/useAuth";
import { NavLink } from "react-router-dom";

const UserDropdown = ({ className }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      className={`hs-dropdown relative inline-flex ${className && className}`}
    >
      <button
        id="hs-dropdown-custom-trigger"
        type="button"
        className="hs-dropdown-toggle py-1 pl-1 pr-3 inline-flex justify-center items-center gap-2 rounded-full border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 transition-all text-sm"
      >
        <img
          className="w-8 aspect-square rounded-full object-cover"
          src={user?.photoURL}
          alt="Maria"
        />
        <span className="text-gray-600 font-medium truncate max-w-[50px]">
          {user?.displayName}
        </span>
        <svg
          className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 mt-2"
        aria-labelledby="hs-dropdown-with-header"
      >
        <div className="py-3 px-5 -m-2 bg-gray-100 rounded-t-lg">
          {/* <p className="text-sm text-gray-500">Signed in as</p> */}
          <p className="text-sm font-medium text-gray-800">
            {user?.displayName}
          </p>
          <p className="text-xs font-medium text-gray-600">{user?.email}</p>
        </div>
        <div className="mt-2 py-2 pl-3 flex flex-col gap-2 items-start">
          <NavLink to="/account">📁 Account</NavLink>
          <button onClick={handleLogout}>🔑 Logout</button>
        </div>
      </div>
    </div>
  );
};

UserDropdown.propTypes = {
  className: PropTypes.string,
};

export default UserDropdown;
