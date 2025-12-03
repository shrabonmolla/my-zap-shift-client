import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Components/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import AddParcel from "../Pages/Addparcel/AddParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcel from "../Pages/DashboardPages/MyParcel";
import Payments from "../Pages/DashboardPages/PymentsPage/Payments";
import PaySuccess from "../Pages/DashboardPages/PymentsPage/PaySuccess";
import PayCancel from "../Pages/DashboardPages/PymentsPage/PayCancel";
import PaymentHistory from "../Pages/DashboardPages/PaymentHistory/PaymentHistory";
import BeARider from "../Pages/Be A Rider/BeARider";
import ManageRiders from "../Pages/DashboardPages/Riders/ManageRiders";
import ManageUsers from "../Pages/DashboardPages/Users/ManageUsers";

export const router = createBrowserRouter([
  // mainlayout
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "add-parcel",
        element: <AddParcel />,
        loader: () => fetch("./map.json"),
      },
      {
        path: "be-a-rider",
        element: <BeARider />,
        loader: () => fetch("./map.json"),
      },
    ],
  },
  // authlayout
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "my-parcel",
        element: <MyParcel />,
      },
      {
        path: "payments/:paymentId",
        element: <Payments />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/payments/${params.paymentId}`),
      },
      {
        path: "payment-success",
        element: <PaySuccess />,
      },
      {
        path: "payment-cancel",
        element: <PayCancel />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "manage-riders",
        element: <ManageRiders />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);
