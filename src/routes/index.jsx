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

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrimaryLayout />,
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
        path: "my-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequests />
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
    ],
  },
]);

export default routes;
