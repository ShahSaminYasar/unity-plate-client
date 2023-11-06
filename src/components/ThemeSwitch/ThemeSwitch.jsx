import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";

const ThemeSwitch = ({ className }) => {
  const { setTheme, bgColorAlt } = useSettings();
  return (
    <div className={`hs-dropdown relative inline-flex ${className}`}>
      <button
        id="hs-dropdown-with-icons"
        type="button"
        className={`hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 border font-medium shadow-sm align-middle w-[35px] aspect-square rounded-full ${bgColorAlt}`}
      ></button>

      <div
        className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden bg-white bg-opacity-5 backdrop-blur-lg shadow-md rounded-lg p-2 mt-2"
        aria-labelledby="hs-dropdown-with-icons"
      >
        <div className="py-2 flex flex-col gap-1">
          <button
            className="w-[35px] aspect-square rounded-full bg-pink-700"
            onClick={() => {
              setTheme("purple");
            }}
          ></button>
          <button
            className="w-[35px] aspect-square rounded-full bg-teal-700"
            onClick={() => {
              setTheme("green");
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

ThemeSwitch.propTypes = {
  className: PropTypes.string,
};

export default ThemeSwitch;
