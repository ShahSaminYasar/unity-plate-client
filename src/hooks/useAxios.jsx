import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "https://unity-plate-vercel-server.vercel.app/api/v1",
  withCredentials: true,
});

const useAxios = () => {
  const { logout } = useAuth();
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        return logout();
      }
    }
  );

  return instance;
};
export default useAxios;
