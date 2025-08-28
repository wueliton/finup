import Home from "flows/home";
import Dashboard from "flows/home/dashboard";
import Wallet from "flows/home/wallet";
import Login from "flows/login";
import LoginUsername from "flows/login/username";
import useAuthMiddleware from "middlware/auth.middleware";
import { createBrowserRouter, redirect } from "react-router";

const router = createBrowserRouter(
  [
    {
      path: "app",
      loader: useAuthMiddleware,
      element: <Home />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "wallet",
          element: <Wallet />,
        },
      ],
    },
    {
      path: "login",
      Component: Login,
      children: [
        {
          index: true,
          Component: LoginUsername,
        },
      ],
    },
    {
      path: "/",
      loader: () => {
        throw redirect("app");
      },
    },
  ],
  {
    basename: "/finup",
  },
);

export { router };
