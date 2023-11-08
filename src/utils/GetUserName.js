import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const GetUserName = (email) => {
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getDonorName", email],
    queryFn: () => {
      return axios.get(`get-user/${email}`);
    },
  });

  if (isLoading) return { isLoading: true };
  if (isError) return { error: error };

  const donor = data?.data?.[0];
  return donor?.name;
};

export default GetUserName;
