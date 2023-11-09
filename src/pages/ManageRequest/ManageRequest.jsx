import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { Navigate, useLoaderData, useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Container from "../../layout/Container";
import DonorDetailsCard from "../../components/FeaturedFoods/DonorDetailsCard";
import {
  MdOutlineShareLocation,
  MdPeopleOutline,
  MdOutlineCalendarMonth,
} from "react-icons/md";
import useSettings from "../../hooks/useSettings";
import GoBackButton from "../../components/GoBackButton/GoBackButton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Helmet } from "react-helmet";

const ManageRequest = () => {
  const axios = useAxios();
  //   const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  let request_data = useLoaderData();
  request_data = request_data?.data[0];

  const { primaryColor } = useSettings();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getRequestDetails", request_data],
    queryFn: () => {
      return axios.get(`/get-foods?id=${request_data?.id}`);
    },
  });

  // console.log(request_data?.requester_email, user?.email);
  if (request_data?.donor_email !== user?.email)
    return <Navigate to="/my-requests" />;

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error}</h1>;

  const food = data?.data[0];
  // console.log(request_data, food);

  const handleConfirmRequest = (status, id) => {
    if (status === "pending" && request_data?.donor_email === user?.email) {
      Swal.fire({
        title: "Are you sure?",
        text: "Make sure to deliver on time!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, confirm it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const toastConfirmingRequest = toast.loading("Confirming...");
          axios
            .put(`/confirm-request/${id}/${food?._id}`)
            .then(() => {
              toast.success("Confirmed request", {
                id: toastConfirmingRequest,
              });
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
              toast.error(`Error ${error?.message}`, {
                id: toastConfirmingRequest,
              });
            });
        }
      });
    } else {
      toast("You already confirmed it or you are not the right owner.");
    }
  };

  return (
    <Container className="page">
      <Helmet>
        <title>Manage Food Requests | Unity Plate</title>
      </Helmet>
      <div className="w-full max-w-md lg:max-w-full p-5 rounded-lg border-4 border-slate-200 flex flex-col lg:flex-row gap-7">
        <div className="w-full">
          <img
            src={food?.image}
            alt=""
            className="block w-full rounded-md max-w-md mx-auto mb-3"
          />
          <DonorDetailsCard
            className="max-w-md mx-auto"
            email={request_data?.requester_email}
            title="Requested by"
          />
        </div>
        <div className="w-full flex flex-col gap-3 text-base font-medium text-slate-800">
          <h1
            className={`text-3xl ${primaryColor} mb-2 block text-left font-semibold`}
          >
            {food?.name}
          </h1>
          <p>📅 Requested on: {request_data?.request_datetime}</p>
          <p>🧧 Money donated: ${request_data?.donation_amount}.00</p>
          <p>📝 {request_data?.request_note}</p>
          <p className="text-xl mt-3 font-semibold">Details of the food</p>
          <p className="flex gap-2">
            <MdPeopleOutline className="text-2xl" />
            {food?.quantity} people can be served
          </p>
          <p className="flex gap-2">
            <MdOutlineCalendarMonth className="text-2xl" /> Expiry:{" "}
            {food?.expiry_date}
          </p>
          <p className="flex gap-2">
            <MdOutlineShareLocation className="text-2xl" />
            {food?.pickup_location}
          </p>
          <span
            className={`rounded-md block w-fit py-[6px] px-3 text-sm capitalize mt-3 ${
              request_data?.status === "delivered"
                ? "bg-green-200 text-green-600"
                : "bg-red-200 text-red-600"
            }`}
          >
            {request_data?.status}
          </span>

          {food?.status !== "delivered" && (
            <button
              onClick={() =>
                handleConfirmRequest(request_data?.status, request_data?._id)
              }
              type="button"
              className="py-2 px-3 w-fit bg-green-500 rounded-md inline-flex items-center gap-x-2 text-base font-semibold border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none"
            >
              Confirm & Deliver
            </button>
          )}
        </div>
      </div>

      <GoBackButton to={location?.state || "/food-requests"} />
    </Container>
  );
};
export default ManageRequest;
