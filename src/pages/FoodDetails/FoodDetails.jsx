import { useQuery } from "@tanstack/react-query";
import { NavLink, useLocation, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import Container from "../../layout/Container";
import Title from "../../components/Title/Title";
import useSettings from "../../hooks/useSettings";
import DonorDetailsCard from "../../components/FeaturedFoods/DonorDetailsCard";
import {
  MdOutlineShareLocation,
  MdPeopleOutline,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const FoodDetails = () => {
  let location = useLocation();
  const axios = useAxios();
  const { id } = useParams();
  const { primaryColor, bgGradient } = useSettings();
  const { user } = useAuth();
  const [requesting, setRequesting] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getFoodDetails", id],
    queryFn: () => {
      return axios.get(`/get-foods?id=${id}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error}</h1>;

  const food = data?.data[0];

  let date = new Date();
  date =
    date.getHours() +
    ":" +
    date.getMinutes() +
    ", " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear();

  const handleMakeRequest = (e) => {
    e.preventDefault();
    setRequesting(true);
    const toastAddingRequest = toast.loading("Adding request...");

    let additional_note = e.target.additional_note.value;
    let donation_amount = Number(e.target.donation_amount.value);

    const food_request = {
      id: food?._id,
      donor_email: food?.donor?.email,
      requester_email: user?.email,
      request_datetime: date && date,
      request_note: additional_note || "",
      donation_amount: donation_amount || 0,
      status: "pending",
    };

    axios
      .post("/add-request", food_request)
      .then((res) => {
        if (res?.data?.acknowledged) {
          toast.success("Request added", { id: toastAddingRequest });
        } else if (res?.data?.alreadyRequested) {
          toast.error("Already requested", { id: toastAddingRequest });
        } else {
          toast("Not sure if added", { id: toastAddingRequest });
        }
        setRequesting(false);
      })
      .catch((error) => {
        toast.error(error?.message, { id: toastAddingRequest });
        setRequesting(false);
      });
  };

  return (
    <Container className={"page"}>
      <Title>Food Details</Title>
      <div className="w-full flex flex-col justify-start items-center gap-10">
        <div className="w-full grid md:grid-cols-2 gap-10 justify-center md:justify-between">
          <img
            src={food?.image}
            alt=""
            className="rounded-lg w-full max-w-sm lg:max-w-lg"
          />

          <div className="w-full max-w-[400px] flex flex-col items-center gap-1 text-lg">
            <DonorDetailsCard email={food?.donor?.email} />
            <div className="rounded-lg w-full p-5 border-4 border-neutral-200 mb-4 mt-2 flex flex-row items-center justify-start gap-8">
              <MdOutlineShareLocation className="text-2xl text-neutral-500" />
              <p className="text-neutral-500">{food?.pickup_location}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 col-span-2">
          <h1 className={`${primaryColor} text-4xl font-semibold mb-1`}>
            {food?.name}
          </h1>
          <p className="flex flex-row gap-2 items-center text-neutral-800">
            <MdPeopleOutline className="text-2xl" /> Servings for{" "}
            {food?.quantity} people
          </p>
          <p className="flex flex-row gap-2 items-center text-neutral-800">
            <MdOutlineCalendarMonth className="text-2xl" /> Expires on{" "}
            {food?.expiry_date}
          </p>
          <p className="flex flex-row gap-2 items-center text-neutral-800">
            {food?.additional_note}
          </p>

          {food?.donor?.email === user?.email ? (
            <NavLink
              to={`/edit-food/${food?._id}`}
              className={`p-3 rounded-lg w-full text-center block bg-gradient-to-bl mt-5 ${bgGradient} ${primaryColor} shadow-sm hover:shadow-lg`}
              data-hs-overlay="#hs-scroll-inside-viewport-modal"
            >
              Edit food
            </NavLink>
          ) : (
            <button
              className={`p-3 rounded-lg w-full text-center block bg-gradient-to-br mt-5 ${bgGradient} ${primaryColor} shadow-sm hover:shadow-lg`}
              data-hs-overlay="#hs-scroll-inside-viewport-modal"
            >
              Request food
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      <div
        id="hs-scroll-inside-viewport-modal"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 overflow-x-hidden overflow-y-auto z-[99]"
      >
        <div className="hs-overlay-open:mt-24 mb-8 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800">Request for the food</h3>
              <button
                type="button"
                className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                data-hs-overlay="#hs-scroll-inside-viewport-modal"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <form className="pt-4 overflow-y-auto" onSubmit={handleMakeRequest}>
              <div className="form flex flex-col gap-3 px-4">
                <div className="grid grid-cols-3 gap-4 items-end">
                  <img
                    src={food?.image}
                    alt=""
                    className="rounded-lg w-full aspect-square object-cover"
                  />
                  <div className="flex flex-col gap-3 col-span-2">
                    <input
                      type="text"
                      placeholder="Food Name"
                      value={food?.name}
                      disabled
                    />
                    <input
                      type="text"
                      placeholder="Food ID"
                      value={`ID: ${food?._id}`}
                      disabled
                    />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Donor Name"
                  value={`Donor's email: ${food?.donor?.email}`}
                  disabled
                />
                <input
                  type="text"
                  placeholder="User Email"
                  value={`Your email: ${user?.email}`}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Pickup Location"
                  value={`Pickup location: ${food?.pickup_location}`}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Food Expiry Date"
                  value={`Food's expiry date: ${food?.expiry_date}`}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Requested on..."
                  value={`Current datetime: ${date && date}`}
                  disabled
                />
                <input
                  name="donation_amount"
                  type="number"
                  placeholder="Donation amount"
                />
                <textarea
                  name="additional_note"
                  rows="1"
                  placeholder="Additional note to the donor"
                ></textarea>
              </div>

              {/* Footer */}
              <div className="flex mt-3 bg-gray-300 justify-end items-center gap-x-2 py-3 px-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                  data-hs-overlay="#hs-scroll-inside-viewport-modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  disabled={requesting}
                >
                  Make request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <GoBackButton to={location?.state} />
    </Container>
  );
};

export default FoodDetails;
