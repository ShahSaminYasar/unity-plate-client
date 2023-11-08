import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const UserName = ({ email }) => {
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getUserName", email],
    queryFn: () => {
      return axios.get(`get-user/${email}`);
    },
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error}`;

  const donor = data?.data?.[0];
  return `${donor?.name}`;
};
export default UserName;
