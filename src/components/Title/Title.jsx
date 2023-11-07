import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";

const Title = ({ children }) => {
  const { primaryColor, borderColor } = useSettings();
  return (
    <h2
      className={`text-4xl mb-10 font-semibold block w-full border-l-4 ${borderColor} pl-2 pb-1 text-left ${primaryColor}`}
    >
      {children}
    </h2>
  );
};

Title.propTypes = {
  children: PropTypes.string,
};

export default Title;
