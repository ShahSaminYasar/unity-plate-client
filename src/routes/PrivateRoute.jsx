import PropTypes from "prop-types";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { userLoading, user } = useAuth();
  const location = useLocation();

  if (userLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={location?.pathname} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
