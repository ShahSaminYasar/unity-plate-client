import { NavLink } from "react-router-dom";
import Container from "../../layout/Container";
import navlinks, { privateNavlinks } from "../../utils/navlinks";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Header = () => {
  const {
    theme,
    bgColor,
    primaryColor,
    borderColor,
    primaryColorAlt,
    bgColorAlt,
    bgGradient,
  } = useSettings();
  const { user } = useAuth();
  return (
    <header
      className={`bg-gradient-to-r ${bgGradient} ${primaryColor} border-b-2 ${borderColor} fixed top-0 left-0 w-full shadow-md `}
    >
      <Container
        className={`flex flex-wrap lg:justify-start lg:flex-nowrap z-50 w-full font-medium ${
          user ? "text-base" : "text-lg"
        } py-4`}
      >
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 lg:flex lg:items-center lg:justify-between gap-6"
          aria-label="Global"
        >
          <div className="flex items-center gap-4">
            {/* Logo Starts */}
            <NavLink
              className={`flex-1 lg:flex-none text-3xl font-semibold`}
              to="/"
            >
              Unity Plate
            </NavLink>
            {/* Logo Ends */}

            {/* Theme Switch Dropdown Starts */}
            <ThemeSwitch className="inline-flex lg:hidden" />
            {/* Theme Switch Dropdown Ends */}

            {/* User Options Dropdown Starts */}
            {user && <UserDropdown className="lg:hidden inline-flex" />}
            {/* User Options Dropdown Ends */}

            {/* Mobile Menu Button Starts */}
            <div className="lg:hidden">
              <button
                type="button"
                className={`hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white  shadow-sm align-middle hover:bg-gray-50 focus:outline-none transition-all text-sm`}
                data-hs-collapse="#navbar-with-collapse"
                aria-controls="navbar-with-collapse"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden w-4 h-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden w-4 h-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
            {/* Mobile Menu Button Ends */}
          </div>

          {/* Navbar Starts */}
          <div
            id="navbar-with-collapse"
            // className="hidden basis-full grow lg:block"
            // id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow lg:block"
          >
            <div className="flex flex-col gap-5 mt-5 lg:flex-row lg:items-center lg:justify-end lg:mt-0 lg:pl-5">
              {navlinks?.map((navlink, index) => (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-indigo-800" : undefined
                  }
                  key={index}
                  to={navlink?.path}
                >
                  {navlink?.name}
                </NavLink>
              ))}
              {user ? (
                privateNavlinks?.map((navlink, index) => (
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "text-orange-500" : undefined
                    }
                    key={index}
                    to={navlink?.path}
                  >
                    {navlink?.name}
                  </NavLink>
                ))
              ) : (
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-orange-500" : undefined
                    } ${primaryColorAlt} ${bgColorAlt} py-2 px-3 rounded-md block w-fit`
                  }
                  to={`/login`}
                >
                  Login/Register
                </NavLink>
              )}

              {/* Theme Switch Dropdown Starts */}
              <ThemeSwitch className="lg:inline-flex hidden" />
              {/* Theme Switch Dropdown Ends */}

              {/* User Options Dropdown Starts */}
              {user && <UserDropdown className="hidden lg:inline-flex" />}
              {/* User Options Dropdown Ends */}
            </div>
          </div>
          {/* Navbar Ends */}
        </nav>
      </Container>
    </header>
  );
};
export default Header;
