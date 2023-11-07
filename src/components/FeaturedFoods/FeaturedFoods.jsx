import { useQuery } from "@tanstack/react-query";
import Title from "../Title/Title";
import useAxios from "../../hooks/useAxios";
import FeaturedFoodCard from "./FeaturedFoodCard";
import Loading from "../Loading/Loading";
import useSettings from "../../hooks/useSettings";
import { NavLink } from "react-router-dom";
import Container from "../../layout/Container";

const FeaturedFoods = () => {
  const axios = useAxios();
  const { bgGradient, primaryColor } = useSettings();

  const {
    data: foods,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["foodsGet"],
    queryFn: () => {
      return axios.get("/get-foods?sortBy=quantity&sortOrder=desc&limit=6");
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <h1 className="section text-center">Error {error}</h1>;

  return (
    <Container className="section">
      <Title>Featured Foods</Title>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
        {foods?.data?.map((food) => (
          <FeaturedFoodCard key={food?._id} food={food} />
        ))}
      </div>
      <NavLink
        to="/foods"
        className={`my-8 py-3 px-4 rounded-lg bg-gradient-to-r ${bgGradient} block w-fit mx-auto shadow-lg ${primaryColor}`}
      >
        See all foods
      </NavLink>
    </Container>
  );
};
export default FeaturedFoods;
