import useSettings from "../../hooks/useSettings";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import {
  MdOutlineShareLocation,
  MdPeopleOutline,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import UserDetailsSet from "../UserDetailComponents/UserDetailsSet";

const FeaturedFoodCard = ({ food }) => {
  let location = useLocation();
  const { borderColor, bgGradient, primaryColor } = useSettings();
  return (
    // <div
    //   className={`w-full max-w-[355px] block mx-auto rounded-xl border-4 ${borderColor} overflow-hidden`}
    // >
    //   <img src={food?.image} alt="" className="aspect-[16/10] object-cover" />
    //   <div className="p-5 flex flex-col gap-5">
    //     <div className="flex flex-col items-start gap-2 h-full text-base font-medium text-neutral-900">
    //       <h3 className="text-2xl">{food?.name}</h3>
    //       <p>Quantity: {food?.quantity}</p>
    //       <p>Pickup Location: {food?.pickup_location}</p>
    //       <p>Expiry date: {food?.expiry_date}</p>
    //       <p>{food?.additional_note}</p>
    //       <p>Donor: {food?.donor?.email}</p>
    //     </div>
    //     <NavLink
    //       to={`/food/${food?._id}`}
    //       state={location?.pathname || "/foods"}
    //       className={`bg-gradient-to-l ${bgGradient} p-3 block w-full text-center ${primaryColor} rounded-lg mt-auto`}
    //     >
    //       View Details
    //     </NavLink>
    //   </div>
    // </div>

    <div
      className={`w-full max-w-[355px] mx-auto flex flex-col gap-3 rounded-lg overflow-hidden bg-gradient-to-br ${bgGradient} shadow-sm`}
    >
      <div className={`w-full aspect-[16/10]`}>
        <img
          src={food?.image}
          alt=""
          className="w-full h-auto aspect-[16/10] object-cover"
        />
      </div>
      <div className="px-3 pb-3 flex flex-col gap-2 items-start">
        <h3 className={`text-2xl font-semibold ${primaryColor}`}>
          {food?.name}
        </h3>
        <p className="flex gap-2 items-center">
          <MdPeopleOutline className="text-xl" />
          Serving: {food?.quantity}
        </p>
        <p className="flex gap-2 items-center">
          <MdOutlineShareLocation className="text-xl" />
          {food?.pickup_location}
        </p>
        <p className="flex gap-2 items-center">
          <MdOutlineCalendarMonth className="text-xl" />
          Expiry: {food?.expiry_date}
        </p>
        <p>{food?.additional_note}</p>
      </div>
      <UserDetailsSet email={food?.donor?.email} className={`mt-auto px-3`} />
      <NavLink
        to={`/food/${food?._id}`}
        state={location?.state || "/foods"}
        className={`m-3 bg-white p-3 block border-2 ${borderColor} text-center ${primaryColor} rounded-lg`}
      >
        View Details
      </NavLink>
    </div>
  );
};

FeaturedFoodCard.propTypes = {
  food: PropTypes.object,
};

export default FeaturedFoodCard;
