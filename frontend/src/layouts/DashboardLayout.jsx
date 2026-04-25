import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Users,
  Clock,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const C = {
  primary:      "#1c8079",
  primaryLight: "#2fe0cb",
  bg:           "#f0fafa",
  bgGradStart:  "#e0f5f3",
  text:         "#0d3533",
  textMuted:    "#4a8580",
  border:       "#a8d8d4",
  white:        "#ffffff",
  sidebar:      "#0d3533",
  sidebarText:  "#a8d8d4",
  sidebarActive:"#2fe0cb",
};

const userNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard"         },
  { icon: Clock,           label: "Waitlist",  to: "/queue"             },
  { icon: ShoppingBag,     label: "My Orders", to: "/dashboard/orders"  },
  { icon: User,            label: "Profile",   to: "/dashboard/profile" },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard",       to: "/dashboard"        },
  { icon: Users,           label: "User Management", to: "/dashboard/users"  },
  { icon: User,            label: "Profile",         to: "/dashboard/profile"},
];

const performLogout = (navigate) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("role");
  navigate("/auth/login", { replace: true });
};

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isAdmin    = user?.role === "admin";
  const navItems   = isAdmin ? adminNavItems : userNavItems;

  const displayName   = user?.name  || (isAdmin ? "Admin"             : "User");
  const displayEmail  = user?.email || (isAdmin ? "admin@vebkino.com" : "user@vebkino.com");
  const displayAvatar = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const displayRole   = isAdmin ? "Super Admin" : "Member";

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", backgroundColor: C.bg }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-30 flex flex-col w-64 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ backgroundColor: C.sidebar, minHeight: "100vh" }}
      >
        {/* Brand */}
        <div
          className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: "rgba(168,216,212,0.15)" }}
        >
          <Link to="/" className="text-xl font-bold">
            <span className="text-white">Vebe</span>
            <span style={{ color: C.primaryLight }}>Kino</span>
          </Link>
          <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* User pill */}
        <div
          className="flex items-center gap-3 px-4 py-3 mx-4 my-4 rounded-xl"
          style={{ backgroundColor: "rgba(47,224,203,0.08)" }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
          >
            {displayAvatar}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{displayName}</p>
            <p className="text-xs truncate" style={{ color: C.sidebarText }}>{displayRole}</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 overflow-y-auto">
          <p
            className="px-3 mb-2 text-xs font-semibold tracking-widest uppercase"
            style={{ color: "rgba(168,216,212,0.5)" }}
          >
            {isAdmin ? "Admin" : "Menu"}
          </p>

          {navItems.map(({ icon: Icon, label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/dashboard"}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-200"
              style={({ isActive }) => ({
                backgroundColor: isActive ? "rgba(47,224,203,0.12)" : "transparent",
                color:           isActive ? C.sidebarActive          : C.sidebarText,
                borderLeft:      isActive ? `3px solid ${C.sidebarActive}` : "3px solid transparent",
                textDecoration:  "none",
              })}
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(168,216,212,0.1)" }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            style={{ color: "#f87171" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Topbar */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ backgroundColor: C.white, borderColor: C.border }}
        >
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} style={{ color: C.text }} />
            </button>
            <div>
              {isAdmin ? (
                <h1 className="text-lg font-bold" style={{ color: C.text }}>Dashboard Overview</h1>
              ) : (
                <>
                  <h1 className="text-lg font-bold" style={{ color: C.text }}>
                    Welcome back, {displayName.split(" ")[0]}! 👋
                  </h1>
                  <p className="text-xs" style={{ color: C.textMuted }}>
                    Here's what's happening with your account today.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200"
              style={{ borderColor: C.border, backgroundColor: C.bg }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
              >
                {displayAvatar}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold leading-tight" style={{ color: C.text }}>{displayName}</p>
                <p className="text-xs leading-tight"               style={{ color: C.textMuted }}>{displayRole}</p>
              </div>
              <ChevronDown size={14} style={{ color: C.textMuted }} />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-lg py-1 z-50"
                style={{ backgroundColor: C.white, borderColor: C.border }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: C.border }}>
                  <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{displayName}</p>
                  <p className="text-xs truncate"               style={{ color: C.textMuted }}>{displayEmail}</p>
                </div>

                <Link
                  to="/dashboard/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex w-full text-left px-4 py-2.5 text-sm transition-colors"
                  style={{ color: C.text, textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Profile
                </Link>

                {/* User-only: My Orders shortcut */}
                {!isAdmin && (
                  <Link
                    to="/dashboard/orders"
                    onClick={() => setProfileOpen(false)}
                    className="flex w-full text-left px-4 py-2.5 text-sm transition-colors"
                    style={{ color: C.text, textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    My Orders
                  </Link>
                )}

                {/* Admin-only: User Management shortcut */}
                {isAdmin && (
                  <Link
                    to="/dashboard/users"
                    onClick={() => setProfileOpen(false)}
                    className="flex w-full text-left px-4 py-2.5 text-sm transition-colors"
                    style={{ color: C.text, textDecoration: "none" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    User Management
                  </Link>
                )}

                <div className="border-t mt-1" style={{ borderColor: C.border }} />

                <button
                  onClick={() => { handleLogout(); setProfileOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                  style={{ color: "#f87171" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;