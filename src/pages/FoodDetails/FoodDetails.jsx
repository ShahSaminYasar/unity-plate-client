import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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

const FoodDetails = () => {
  const axios = useAxios();
  const { id } = useParams();
  const { primaryColor, bgGradient } = useSettings();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getFoodDetails"],
    queryFn: () => {
      return axios.get(`/get-foods?id=${id}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1>Error: {error}</h1>;

  const food = data?.data[0];

  return (
    <Container className={"page"}>
      <Title>Food Details</Title>
      <div className="w-full flex flex-col justify-start items-center gap-10">
        <div className="w-full grid md:grid-cols-2 gap-10 justify-center">
          <img
            src={food?.image}
            alt=""
            className="rounded-lg w-full max-w-sm mx-auto"
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
          <button
            className={`p-3 rounded-lg w-full text-center block bg-gradient-to-br mt-5 ${bgGradient} ${primaryColor} shadow-sm hover:shadow-lg`}
          >
            Request food
          </button>
        </div>
      </div>
    </Container>
  );
};

export default FoodDetails;
