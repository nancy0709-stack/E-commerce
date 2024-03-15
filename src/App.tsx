import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action as authAction } from "./util/authentication/authAction";
import { checkAuthLoader, tokenLoader } from "./util/authentication/tokenAuth";
import { action as logoutAction } from "./util/authentication/logout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/ErrorPage";
import InProgressPage from "./pages/InProgressPage";
import PaymentPage from "./pages/PaymentPage";
import PayConfirmationPage from "./pages/PayConfirmationPage";
import ThankyouPage from "./pages/ThankYouPage";
import AuthenticationPage from "./pages/AuthenticationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    loader: tokenLoader,
    id: "root",
    children: [
      {
        path: "logout",
        action: logoutAction,
        element: <HomePage />,
        errorElement: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/users",
    element: <AuthenticationPage />,
    action: authAction,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/shop",
    element: <InProgressPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/about",
    element: <InProgressPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/store",
    element: <InProgressPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/contact",
    element: <InProgressPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/search",
    element: <InProgressPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/thanks",
    element: <ThankyouPage />,
    errorElement: <NotFoundPage />,
    loader: checkAuthLoader,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
    loader: checkAuthLoader,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/payment-details",
    element: <PayConfirmationPage />,
    loader: checkAuthLoader,
    errorElement: <NotFoundPage />,
  },
]);

const App: React.FC = () => <RouterProvider router={router} />;
export default App;

