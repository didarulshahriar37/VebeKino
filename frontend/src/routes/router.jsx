import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import LandingPage from "../pages/LandingPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AuthLayout from "../layouts/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ProfilePage from "../pages/ProfilePage";
import OrdersPage from "../pages/OrdersPage";
import UserManagementPage from "../pages/UserManagementPage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true,                 Component: LandingPage          },
      { path: "all-products",        Component: ProductsPage         },
      { path: "product-details/:id", Component: ProductDetailsPage   },
      { path: "about-us",            Component: AboutPage            },
      { path: "contact",             Component: ContactPage          },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "login",    Component: LoginPage    },
      { path: "register", Component: RegisterPage },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      // index → /dashboard (admin or user home, decided in DashboardPage)
      { index: true,            Component: DashboardPage        },

      // Shared
      { path: "profile",        Component: ProfilePage          },

      // User routes
      { path: "orders",         Component: OrdersPage           },

      // Admin routes
      { path: "users",          Component: UserManagementPage   },

      // Add more routes here as you build them, e.g.:
      // { path: "products",      Component: ProductManagementPage },
      // { path: "categories",    Component: CategoryManagementPage },
      // { path: "settings",      Component: SettingsPage           },
    ],
  },
]);