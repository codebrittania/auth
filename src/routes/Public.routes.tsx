import type { NonIndexRouteObject } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

export const PublicRoutes: NonIndexRouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <ErrorBoundary />,
  },
  // {
  //   path: "/outsourcing",
  //   element: <OutsourcingServicesPage />,
  //   errorElement: <ErrorBoundary />,
  // },
];
