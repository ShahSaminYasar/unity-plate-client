import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";

const Title = ({ children }) => {
  const { primaryColor } = useSettings();
  return (
    <h2
      className={`text-4xl mb-10 font-semibold block text-left ${primaryColor}`}
    >
      {children}
    </h2>
  );
};

Title.propTypes = {
  children: PropTypes.string,
};

export default Title;
