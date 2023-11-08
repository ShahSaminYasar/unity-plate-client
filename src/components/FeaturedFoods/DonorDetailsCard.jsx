import PropTypes from "prop-types";
import useDonor from "../../hooks/useDonor";
import useSettings from "../../hooks/useSettings";

const DonorDetailsCard = ({ email, className, title = "Donated by" }) => {
  const donor = useDonor(email);
  const { primaryColor } = useSettings();

  if (donor?.isLoading) {
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
    <div
      className={`rounded-lg w-full p-5 border-4 border-neutral-200 mb-1 flex flex-row items-center justify-start gap-6 ${
        className && className
      }`}
    >
      <img
        src={
          donor?.dp ||
          "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
        }
        alt=""
        className="w-[80px] aspect-square object-cover rounded-lg"
      />
      <div>
        <span className="block text-neutral-500 w-full mb-1 text-sm">
          {title}
        </span>
        <h4 className="text-lg">{donor?.name}</h4>
        <p className="block w-full text-sm break-words">{donor?.email}</p>
      </div>
    </div>
  );
};

DonorDetailsCard.propTypes = {
  email: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
};

export default DonorDetailsCard;
