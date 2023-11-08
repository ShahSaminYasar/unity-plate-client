import { NavLink } from "react-router-dom";
import Container from "../../layout/Container";
import navlinks from "../../utils/navlinks";
import useSettings from "../../hooks/useSettings";
import useAuth from "../../hooks/useAuth";
import UserDropdown from "../UserDropdown/UserDropdown";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";

const Header = () => {
  const { primaryColor, borderColor, primaryColorAlt, bgColorAlt, bgGradient } =
    useSettings();
  const { user } = useAuth();
  return (
    <header
      className={`bg-gradient-to-r ${bgGradient} ${primaryColor} border-b-2 ${borderColor} fixed top-0 left-0 w-full shadow-md z-[9999]`}
    >
      <Container
        className={`flex flex-wrap xl:justify-start xl:flex-nowrap z-50 w-full font-medium text-lg py-4`}
      >
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 xl:flex xl:items-center xl:justify-between gap-6"
          aria-label="Global"
        >
          <div className="flex items-center gap-4">
            {/* Logo Starts */}
            <NavLink
              className={`flex-1 xl:flex-none text-3xl font-semibold`}
              to="/"
            >
              Unity Plate
            </NavLink>
            {/* Logo Ends */}

            {/* Theme Switch Dropdown Starts */}
            <ThemeSwitch className="inline-flex xl:hidden" />
            {/* Theme Switch Dropdown Ends */}

            {/* User Options Dropdown Starts */}
            {user ? (
              <UserDropdown className="xl:hidden inline-flex" />
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `${
                    isActive ? "text-orange-500" : undefined
                  } ${primaryColorAlt} ${bgColorAlt} py-2 px-3 rounded-md block xl:hidden w-fit`
                }
                to={`/login`}
              >
                Login
              </NavLink>
            )}
            {/* User Options Dropdown Ends */}

            {/* Mobile Menu Button Starts */}
            <div className="xl:hidden">
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
            // className="hidden basis-full grow xl:block"
            // id="navbar-collapse-with-animation"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow xl:block"
          >
            <div className="flex flex-col gap-5 mt-5 xl:flex-row xl:items-center xl:justify-end xl:mt-0 xl:pl-5">
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
              {!user ? (
                <NavLink
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-orange-500" : undefined
                    } ${primaryColorAlt} ${bgColorAlt} py-2 hidden xl:block px-3 rounded-md w-fit`
                  }
                  to={`/login`}
                >
                  Login
                </NavLink>
              ) : (
                <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none]">
                  <button
                    id="hs-mega-menu-basic-dr"
                    type="button"
                    className="flex items-center w-full"
                  >
                    Manage
                    <svg
                      className="ml-2 w-2.5 h-2.5 text-gray-600"
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
                      ></path>
                    </svg>
                  </button>

                  <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 before:absolute top-full sm:border before:-top-5 before:left-0 before:w-full before:h-5 hidden">
                    <div className="flex flex-col items-start gap-2">
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-indigo-800" : undefined
                        }
                        to={`/manage-foods`}
                      >
                        My foods
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-indigo-800" : undefined
                        }
                        to={`/my-requests`}
                      >
                        My requests
                      </NavLink>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-indigo-800" : undefined
                        }
                        to={`/food-requests`}
                      >
                        Food requests
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}

              {/* Theme Switch Dropdown Starts */}
              <ThemeSwitch className="xl:inline-flex hidden" />
              {/* Theme Switch Dropdown Ends */}

              {/* User Options Dropdown Starts */}
              {user && <UserDropdown className="hidden xl:inline-flex" />}
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
