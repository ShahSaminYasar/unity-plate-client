import PropTypes from "prop-types";
import { Navigate, useParams } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading/Loading";
import { auth } from "../config/firebase.config";

const EditFoodRoute = ({ children }) => {
  const axios = useAxios();
  //   const { user } = useAuth();
  const current_user_email = auth?.currentUser?.email;
  const { food_id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["editFoodId"],
    queryFn: () => {
      return axios.get(`/get-foods?id=${food_id}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return error;

  const food = data?.data[0];

  if (food?.donor?.email !== current_user_email) return <Navigate to="/" />;

  if (food?.status === "available") return children;

  return <Navigate to="/" />;
};

EditFoodRoute.propTypes = {
  children: PropTypes.node,
};

export default EditFoodRoute;
