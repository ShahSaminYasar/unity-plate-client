import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import PrimaryLayout from "../layout/PrimaryLayout";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import PrivateRoute from "./PrivateRoute";
import AddFood from "../pages/AddFood/AddFood";
import ManageMyFoods from "../pages/ManageMyFoods/ManageMyFoods";
import MyFoodRequests from "../pages/MyFoodRequests/MyFoodRequests";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import Account from "../pages/Account/Account";
import EditFood from "../pages/EditFood/EditFood";
import EditFoodRoute from "./EditFoodRoute";
import FoodRequests from "../pages/FoodRequests/FoodRequests";
import RequestDetails from "../pages/RequestDetails/RequestDetails";
import axios from "axios";
import ManageRequest from "../pages/ManageRequest/ManageRequest";
import Error from "../pages/Error/Error";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrimaryLayout />,
    // errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "foods",
        element: <AvailableFoods />,
      },
      {
        path: "food/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-food/:food_id",
        element: (
          <PrivateRoute>
            <EditFoodRoute>
              <EditFood />
            </EditFoodRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "food-requests",
        element: (
          <PrivateRoute>
            <FoodRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-request/:request_id",
        loader: ({ params }) =>
          axios.get(
            `https://unity-plate-vercel-server.vercel.app/api/v1/get-requests?id=${params.request_id}`
          ),
        element: (
          <PrivateRoute>
            <ManageRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "request/:request_id",
        loader: ({ params }) =>
          axios.get(
            `https://unity-plate-vercel-server.vercel.app/api/v1/get-requests?id=${params.request_id}`
          ),
        element: (
          <PrivateRoute>
            <RequestDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "account",
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
