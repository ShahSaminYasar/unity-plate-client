import PropTypes from "prop-types";
import useDonor from "../../hooks/useDonor";
import useSettings from "../../hooks/useSettings";

const UserDetailsSet = ({ email, className }) => {
  const user = useDonor(email);
  const { primaryColor } = useSettings();

  if (user?.isLoading) {
    return (
      <div className="rounded-lg w-full p-5 border-4 border-neutral-200 my-8 flex flex-row items-center justify-between gap-8">
        <div
          className={`animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent ${primaryColor} rounded-full`}
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex gap-2 items-center ${className}`}>
      <img
        src={user?.dp}
        alt=""
        className="w-[40px] aspect-square rounded-full object-cover"
      />
      <div>
        <p className="text-base">{user?.name}</p>
        <p className="text-xs">{user?.email}</p>
      </div>
    </div>
  );
};

UserDetailsSet.propTypes = {
  email: PropTypes.string,
  className: PropTypes.string,
};

export default UserDetailsSet;
