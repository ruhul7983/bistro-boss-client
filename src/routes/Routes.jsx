import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/PaymentHistory/PaymentHistory";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import UserHome from "../pages/UserHome/UserHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/menu",
        element: <Menu></Menu>
      },
      {
        path: "/order/:category",
        element: <Order></Order>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: "payment",
        element: <Payment></Payment>
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "user-home",
        element: <UserHome></UserHome>
      },
      // Admin
      {
        path: "all-users",
        element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
      },
      {
        path: "add-items",
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: "manage-items",
        element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
      },
      {
        path: "admin-home",
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: "update-item/:id",
        element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
        loader: ({params})=>fetch(`https://bistro-boss-server-nine-rho.vercel.app/menus/${params.id}`)
      },
    ]
  },
]);