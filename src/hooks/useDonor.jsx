import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useDonor = (email) => {
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getDonorDetails", email],
    queryFn: () => {
      return axios.get(`get-user/${email}`);
    },
  });

    if (isLoading) return { isLoading: true };
  if (isError) return { error: error };

  const donor = data?.data?.[0];
  return donor;
};
export default useDonor;
