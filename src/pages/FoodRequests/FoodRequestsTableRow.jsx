import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import { NavLink } from "react-router-dom";
import useSettings from "../../hooks/useSettings";
import UserName from "../../components/UserDetailComponents/UserName";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const FoodRequestsTableRow = ({ food_id, request_document }) => {
  //   console.log(food_id);
  const { primaryColor } = useSettings();
  const axios = useAxios();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getRequestFoodDetails", food_id],
    queryFn: () => {
      return axios.get(`/get-foods?id=${food_id}`);
    },
  });

  if (isLoading)
    return (
      <tr className="odd:bg-white even:bg-gray-100">
        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">
          <div
            className={`animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent ${primaryColor} rounded-full`}
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </td>
      </tr>
    );
  if (isError) return <h1>Error: {error}</h1>;

  const food = data?.data[0];
  //   console.log(request_document, food);

  const handleCancelRequest = (status, id) => {
    if (status === "pending") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const toastCancellingRequest = toast.loading("Deleting...");
          axios
            .delete(`/cancel-request/${id}`)
            .then(() => {
              toast.success("Cancelled request", {
                id: toastCancellingRequest,
              });
              queryClient.invalidateQueries({ id: ["othersAddedRequests"] });
            })
            .catch((error) => {
              console.error(error);
              toast.error(`Error ${error?.message}`, {
                id: toastCancellingRequest,
              });
            });
        }
      });
    } else {
      toast("You already cancelled it. Please refresh the page.");
    }
  };

  return (
    <tr className="odd:bg-white even:bg-gray-100">
      <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">
        <img
          src={food?.image}
          className={`w-[100px] aspect-square rounded-md object-cover`}
          alt=""
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
        {/* {food?.donor?.email} */}
        <UserName email={request_document?.requester_email} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
        ${request_document?.donation_amount}.00
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">
        {request_document?.request_datetime}
      </td>
      <td
        className={`px-6 py-4 whitespace-nowrap text-base ${
          request_document?.status === "delivered"
            ? "text-green-400"
            : "text-slate-400"
        }`}
      >
        {request_document?.status}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-end text-base font-medium">
        <div className="flex flex-row gap-2 justify-end">
          <NavLink
            to={`/request/${request_document?._id}`}
            className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          >
            View
          </NavLink>
          {request_document?.status !== "delivered" && (
            <button
              onClick={() =>
                handleCancelRequest(
                  request_document?.status,
                  request_document?._id
                )
              }
              type="button"
              className="inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none"
            >
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

FoodRequestsTableRow.propTypes = {
  food_id: PropTypes.string,
  request_document: PropTypes.object,
};

export default FoodRequestsTableRow;
