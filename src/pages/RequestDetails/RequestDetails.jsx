import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { useLoaderData } from "react-router-dom";
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

const RequestDetails = () => {
  const axios = useAxios();
  let request_data = useLoaderData();
  request_data = request_data?.data[0];

  const { primaryColor } = useSettings();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getRequestDetails", request_data],
    queryFn: () => {
      return axios.get(`/get-foods?id=${request_data?.id}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error}</h1>;

  const food = data?.data[0];
  console.log(request_data, food);

  return (
    <Container className="page">
      <div className="w-full max-w-md lg:max-w-full p-5 rounded-lg border-4 border-slate-200 flex flex-col lg:flex-row gap-7">
        <div className="w-full">
          <img
            src={food?.image}
            alt=""
            className="block w-full rounded-md max-w-md mx-auto mb-3"
          />
          <DonorDetailsCard
            className="max-w-md mx-auto"
            email={request_data?.donor_email}
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
              food?.status === "delivered"
                ? "bg-green-200 text-green-600"
                : "bg-red-200 text-red-600"
            }`}
          >
            {request_data?.status}
          </span>
        </div>
      </div>

      <GoBackButton to="/my-requests" />
    </Container>
  );
};
export default RequestDetails;
