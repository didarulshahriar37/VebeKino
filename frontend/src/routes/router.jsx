import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import LandingPage from "../pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: LandingPage
        }
    ]
  },
]);