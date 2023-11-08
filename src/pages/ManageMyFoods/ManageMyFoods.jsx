import { useQuery, useQueryClient } from "@tanstack/react-query";
import Title from "../../components/Title/Title";
import Container from "../../layout/Container";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { NavLink, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageMyFoods = () => {
  let location = useLocation();
  const { user } = useAuth();
  const axios = useAxios();

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userAddedFoods"],
    queryFn: () => {
      return axios.get(`/get-foods?email=${user?.email}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return error;

  const foods = data?.data;
  // console.log(foods);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const toastDeletingFoodItem = toast.loading("Deleting...");
        axios
          .delete(`/delete-food/${id}`)
          .then(() => {
            toast.success("Deleted", { id: toastDeletingFoodItem });
            queryClient.invalidateQueries({ queryKey: ["userAddedFoods"] });
          })
          .catch((error) => {
            console.error(error);
            toast.error(`Error ${error?.message}`, {
              id: toastDeletingFoodItem,
            });
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <Container className={`page`}>
      <Title>Manage foods</Title>
      <div className="w-full flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              {/* Data Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
                    >
                      Expiry
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-sm font-medium text-gray-500 uppercase"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {foods?.map((food) => (
                    <tr
                      key={food?._id}
                      className="odd:bg-white even:bg-gray-100"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">
                        <img
                          src={food?.image}
                          className={`w-[100px] aspect-square rounded-md object-cover`}
                          alt=""
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                        {food?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
                        {food?.expiry_date}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-base ${
                          food?.status === "available"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {food?.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-end text-base font-medium">
                        <div className="flex flex-row gap-2 justify-end">
                          <NavLink
                            to={`/food/${food?._id}`}
                            state={location?.pathname || "/foods"}
                            className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            View
                          </NavLink>
                          <NavLink
                            to={`/edit-food/${food?._id}`}
                            className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-orange-600 hover:text-orange-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Edit
                          </NavLink>
                          <button
                            onClick={() => handleDelete(`${food?._id}`)}
                            type="button"
                            className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
export default ManageMyFoods;
