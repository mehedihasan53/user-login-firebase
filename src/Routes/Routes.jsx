import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../components/Header/Home";
import Register from "../components/Register/Register";
import Login from "../components/Register/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
]);
