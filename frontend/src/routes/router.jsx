import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import LandingPage from "../pages/LandingPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
// import DashboardHomePage from "../pages/DashboardHomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import UserDashboardPage from "../pages/UserDash";
import AdminDashboardPage from "../pages/AdminDash";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "all-products",
        Component: ProductsPage,
      },
      {
        path: "product-details/:id",
        Component: ProductDetailsPage,
      },
      {
        path: "about-us",
        Component: AboutPage,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
//   {
//     path: "/dashboard",
//     Component: DashboardLayout,
//     children: [
//       {
//         index: true,
//         Component: DashboardHomePage,
//       },
//     ],
//   },
  // User dashboard — standalone (has its own sidebar/layout built-in)
  {
    path: "/user/dashboard",
    Component: UserDashboardPage,
  },
  // Admin dashboard — standalone (has its own sidebar/layout built-in)
  {
    path: "/admin/dashboard",
    Component: AdminDashboardPage,
  },
]);