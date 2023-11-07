import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const FeaturedFoodCard = ({ food }) => {
  const { borderColor, bgGradient, primaryColor } = useSettings();
  return (
    <div
      className={`w-full rounded-xl border-4 ${borderColor} overflow-hidden`}
    >
      <img src={food?.image} alt="" className="aspect-[16/10] object-cover" />
      <div className="p-5 flex flex-col gap-5">
        <div className="flex flex-col items-start gap-2 h-full text-base font-medium text-neutral-900">
          <h3 className="text-2xl">{food?.name}</h3>
          <p>Quantity: {food?.quantity}</p>
          <p>Pickup Location: {food?.pickup_location}</p>
          <p>Expiry date: {food?.expiry_date}</p>
          <p>{food?.additional_note}</p>
          <p>Donor: {food?.donor?.email}</p>
        </div>
        <NavLink
          to={`/food/${food?._id}`}
          className={`bg-gradient-to-l ${bgGradient} p-3 block w-full text-center ${primaryColor} rounded-lg`}
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

FeaturedFoodCard.propTypes = {
  food: PropTypes.object,
};

export default FeaturedFoodCard;
