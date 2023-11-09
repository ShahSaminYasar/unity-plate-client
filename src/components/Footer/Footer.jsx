import { NavLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import Container from "../../layout/Container";
import LogoIcon from "../../assets/icon2.png";

const Footer = () => {
  const { bgGradient, borderColor } = useSettings();

  return (
    <footer
      className={`w-full py-10 px-4 sm:px-6 lg:px-8 mx-auto text-slate-900 bg-gradient-to-l ${bgGradient} border-t-2 ${borderColor} font-medium`}
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {/* Col 1 */}
          <div className="flex items-center">
            <NavLink
              className={`flex-1 xl:flex-none text-2xl font-semibold flex flex-col justify-center items-center gap-1`}
              to="/"
            >
              <img src={LogoIcon} className="h-[85px] w-auto" alt="" />
              Unity Plate
            </NavLink>
          </div>

          <div>
            <h4 className="font-semibold uppercase text-base">
              Office Address
            </h4>

            <div className="mt-3 grid space-y-3 text-sm">
              You can find us on the 6th floor of the Commercial Building,
              Nayasarak, Sylhet.
            </div>
          </div>

          <div>
            <h4 className="font-semibold uppercase text-base">Links</h4>

            <div className="mt-3 grid space-y-3 text-sm">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/foods">All Products</NavLink>
              <NavLink to="/account">Account</NavLink>
            </div>
          </div>

          <div>
            <h4 className="font-semibold uppercase text-base">Socials</h4>

            <div className="mt-3 grid space-y-3 text-sm">
              <NavLink>Facebook</NavLink>
              <NavLink>Instagram</NavLink>
              <NavLink>YouTube</NavLink>
            </div>
          </div>
        </div>

        <div className="pt-5 mt-5 border-t border-gray-200 dark:border-gray-700">
          <div className="sm:flex sm:justify-between sm:items-center">
            <div className="flex items-center gap-x-3">
              &copy; 2023 | Unity Plate
            </div>

            <div className="flex justify-between items-center">
              <div className="mt-3 sm:hidden">
                <a
                  className="flex-none text-xl font-semibold dark:text-white"
                  href="#"
                  aria-label="Brand"
                >
                  Brand
                </a>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  © 2022 Preline.
                </p>
              </div>

              <div className="space-x-4">Thanks for visiting.</div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
