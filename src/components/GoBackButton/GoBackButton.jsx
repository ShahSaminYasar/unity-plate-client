import { NavLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";

const GoBackButton = ({ to }) => {
  const { primaryColor, bgGradient } = useSettings();

  return (
    <NavLink
      className={`block w-fit ml-auto my-7 py-3 px-5 rounded-md bg-gradient-to-l ${primaryColor} text-base ${bgGradient}`}
      to={to}
    >
      ← Go back
    </NavLink>
  );
};

GoBackButton.propTypes = {
  to: PropTypes.string,
};

export default GoBackButton;
