import PropTypes from "prop-types";

const UserDropdown = ({ className }) => {
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
          className="w-8 h-auto rounded-full"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Maria"
        />
        <span className="text-gray-600 font-medium truncate max-w-[7.5rem] dark:text-gray-400">
          Maria
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
        aria-labelledby="hs-dropdown-custom-trigger"
      >
        <a
          className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 "
          href="#"
        >
          Newsletter
        </a>
      </div>
    </div>
  );
};

UserDropdown.propTypes = {
  className: PropTypes.string,
};

export default UserDropdown;
