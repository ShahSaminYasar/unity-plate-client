import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleBtn = ({ className, title }) => {
  const navigate = useNavigate();
  let location = useLocation();
  location = location?.state || "/";
  const { borderColor, primaryColor } = useSettings();
  const { googleLogin } = useAuth();

  const handleGoogleSignIn = async () => {
    const toastLoggingIn = toast.loading("Logging in...");
    try {
      googleLogin()
        .then((res) => {
          toast.success(`Logged in as ${res?.user?.displayName}`, {
            id: toastLoggingIn,
          });
          navigate(location);
        })
        .catch((error) => toast.error(error?.message, { id: toastLoggingIn }));
    } catch (error) {
      console.error(error);
      toast.error(error?.message, { id: toastLoggingIn });
    }
  };

  return (
    <button
      className={`p-3 rounded-md border-2 outline-none font-medium text-lg ${borderColor} ${primaryColor} ${className} flex flex-row justify-center items-center gap-2`}
      onClick={handleGoogleSignIn}
    >
      <FcGoogle className="text-2xl" /> {title ? title : "Sign in with Google"}
    </button>
  );
};

GoogleBtn.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default GoogleBtn;
