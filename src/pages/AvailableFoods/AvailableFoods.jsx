import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Title/Title";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading/Loading";
import FeaturedFoodCard from "../../components/FeaturedFoods/FeaturedFoodCard";
import Container from "../../layout/Container";
import FilterGroup from "../../components/FilterGroup/FilterGroup";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AvailableFoods = () => {
  const axios = useAxios();

  const [sortOrder, setSortOrder] = useState("asc");
  const [pageTitle, setPageTitle] = useState("Available Foods");

  const {
    data: foods,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAllFoods", sortOrder],
    queryFn: () => {
      return axios.get(`/get-foods?sortBy=expiry_date&sortOrder=${sortOrder}`);
    },
  });

  if (isLoading) return <Loading />;

  if (isError) return <h1>Error: {error}</h1>;

  return (
    <Container className={"page"}>
      <Helmet>
        <title>Available Foods | Unity Plate</title>
      </Helmet>
      <FilterGroup setSortOrder={setSortOrder} setPageTitle={setPageTitle} />
      <Title>{pageTitle}</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {foods?.data?.map((food) => (
          <FeaturedFoodCard key={food?._id} food={food} />
        ))}
      </div>
    </Container>
  );
};
export default AvailableFoods;
