import { useQuery } from "@tanstack/react-query";
import Title from "../../components/Title/Title";
import Container from "../../layout/Container";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import FoodRequestsTableRow from "./FoodRequestsTableRow";

const FoodRequests = () => {
  const { user } = useAuth();
  const axios = useAxios();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["othersAddedRequests"],
    queryFn: () => {
      return axios.get(`/get-requests?donor=${user?.email}`);
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return error;

  const foods = data?.data;

  return (
    <Container className={`page`}>
      <Title>Food requests</Title>
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
                      Requester
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
                    >
                      Donation Made
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-sm font-medium text-gray-500 uppercase"
                    >
                      Requested on
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
                    <FoodRequestsTableRow
                      key={food?._id}
                      food_id={food?.id}
                      request_document={food && food}
                    />
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
export default FoodRequests;
