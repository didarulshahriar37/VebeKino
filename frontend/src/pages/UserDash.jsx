import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  User,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Package,
  Star,
  ArrowRight,
  Clock,
  CheckCircle,
  Truck,
  Circle,
} from "lucide-react";

const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  bg: "#f0fafa",
  bgGradStart: "#e0f5f3",
  text: "#0d3533",
  textMuted: "#4a8580",
  border: "#a8d8d4",
  white: "#ffffff",
  sidebar: "#0d3533",
  sidebarText: "#a8d8d4",
  sidebarActive: "#2fe0cb",
};

const mockUser = {
  name: "John Doe",
  email: "john@gmail.com",
  avatar: "JD",
};

const mockOrders = [
  { id: "#ORD-2456", date: "May 16, 2025", amount: "$120.00", status: "Delivered" },
  { id: "#ORD-2455", date: "May 10, 2025", amount: "$89.00", status: "Processing" },
  { id: "#ORD-2454", date: "May 05, 2025", amount: "$200.00", status: "Shipped" },
  { id: "#ORD-2453", date: "Apr 30, 2025", amount: "$75.00", status: "Delivered" },
];

const statusConfig = {
  Delivered:  { color: "#1c8079", bg: "rgba(28,128,121,0.1)",  icon: CheckCircle },
  Processing: { color: "#e8a860", bg: "rgba(232,168,96,0.1)",  icon: Clock },
  Shipped:    { color: "#2fe0cb", bg: "rgba(47,224,203,0.12)", icon: Truck },
  Pending:    { color: "#9ca3af", bg: "rgba(156,163,175,0.1)", icon: Circle },
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",        key: "dashboard" },
  { icon: ShoppingBag,     label: "My Orders",        key: "orders" },
  { icon: Heart,           label: "Wishlist",         key: "wishlist" },
  { icon: User,            label: "Profile",          key: "profile" },
  { icon: MapPin,          label: "Addresses",        key: "addresses" },
  { icon: CreditCard,      label: "Payment Methods",  key: "payment" },
  { icon: Bell,            label: "Notifications",    key: "notifications" },
  { icon: Settings,        label: "Settings",         key: "settings" },
];

const statCards = [
  { label: "Total Orders",    value: "12",  sub: "View all orders",    icon: ShoppingBag, color: C.primary },
  { label: "Wishlist Items",  value: "8",   sub: "View your wishlist", icon: Heart,       color: "#e05a78" },
  { label: "Saved Addresses", value: "3",   sub: "Manage addresses",   icon: MapPin,      color: C.primaryLight },
  { label: "Reward Points",   value: "250", sub: "View rewards",       icon: Star,        color: "#e8a860" },
];

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", backgroundColor: C.bg }}
    >
      {/* ── Sidebar ── */}
      <>
        {/* Overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed md:static inset-y-0 left-0 z-30 flex flex-col w-64 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
          style={{ backgroundColor: C.sidebar, minHeight: "100vh" }}
        >
          {/* Brand */}
          <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: "rgba(168,216,212,0.15)" }}>
            <Link to="/" className="text-xl font-bold">
              <span className="text-white">Vebe</span>
              <span style={{ color: C.primaryLight }}>Kino</span>
            </Link>
            <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* User pill */}
          <div className="flex items-center gap-3 px-6 py-4 mx-4 my-4 rounded-xl" style={{ backgroundColor: "rgba(47,224,203,0.08)" }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
            >
              {mockUser.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{mockUser.name}</p>
              <p className="text-xs truncate" style={{ color: C.sidebarText }}>{mockUser.email}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 overflow-y-auto">
            <p className="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(168,216,212,0.5)" }}>
              Menu
            </p>
            {navItems.map(({ icon: Icon, label, key }) => {
              const isActive = activeNav === key;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveNav(key); setSidebarOpen(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? "rgba(47,224,203,0.12)" : "transparent",
                    color: isActive ? C.sidebarActive : C.sidebarText,
                    borderLeft: isActive ? `3px solid ${C.sidebarActive}` : "3px solid transparent",
                  }}
                >
                  <Icon size={17} />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(168,216,212,0.1)" }}>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ color: "#f87171" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(248,113,113,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </aside>
      </>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
          style={{ backgroundColor: C.white, borderColor: C.border }}
        >
          <div className="flex items-center gap-3">
            <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} style={{ color: C.text }} />
            </button>
            <div>
              <h1 className="text-lg font-bold" style={{ color: C.text }}>
                Welcome back, {mockUser.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-xs" style={{ color: C.textMuted }}>Here's what's happening with your account today.</p>
            </div>
          </div>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200"
              style={{ borderColor: C.border, backgroundColor: C.bg }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
              >
                {mockUser.avatar}
              </div>
              <span className="hidden sm:block text-sm font-medium" style={{ color: C.text }}>{mockUser.name}</span>
              <ChevronDown size={14} style={{ color: C.textMuted }} />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl border shadow-lg py-1 z-50"
                style={{ backgroundColor: C.white, borderColor: C.border }}
              >
                {[
                  { label: "Profile", action: () => setActiveNav("profile") },
                  { label: "Settings", action: () => setActiveNav("settings") },
                  { label: "Logout", action: () => navigate("/") },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={() => { action(); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                    style={{ color: label === "Logout" ? "#f87171" : C.text }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.bg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="p-5 rounded-2xl border transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: C.white, borderColor: C.border }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.primary;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(28,128,121,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs font-medium" style={{ color: C.textMuted }}>{card.label}</p>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}18` }}
                    >
                      <Icon size={16} style={{ color: card.color }} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1" style={{ color: C.text }}>{card.value}</p>
                  <p className="text-xs" style={{ color: C.primary }}>{card.sub}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div
              className="lg:col-span-2 rounded-2xl border p-6"
              style={{ backgroundColor: C.white, borderColor: C.border }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-bold" style={{ color: C.text }}>Recent Orders</h2>
                <button className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {mockOrders.map((order) => {
                  const cfg = statusConfig[order.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 rounded-xl transition-colors"
                      style={{ backgroundColor: C.bg }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = C.bgGradStart}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = C.bg}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
                          <StatusIcon size={15} style={{ color: cfg.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: C.text }}>{order.id}</p>
                          <p className="text-xs" style={{ color: C.textMuted }}>{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm font-bold" style={{ color: C.text }}>{order.amount}</p>
                        <span
                          className="text-xs font-semibold px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Account Overview */}
            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: C.white, borderColor: C.border }}
            >
              <h2 className="text-base font-bold mb-5" style={{ color: C.text }}>Account Overview</h2>
              <div className="space-y-2">
                {[
                  { label: "Profile Information", desc: "Update your personal details", icon: User },
                  { label: "Payment Methods", desc: "Manage cards & billing", icon: CreditCard },
                  { label: "Notifications", desc: "Email & SMS alerts", icon: Bell },
                ].map(({ label, desc, icon: Icon }) => (
                  <button
                    key={label}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-200"
                    style={{ backgroundColor: C.bg }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = C.bgGradStart;
                      e.currentTarget.style.borderLeft = `3px solid ${C.primary}`;
                      e.currentTarget.style.paddingLeft = "10px";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = C.bg;
                      e.currentTarget.style.borderLeft = "none";
                      e.currentTarget.style.paddingLeft = "12px";
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "rgba(28,128,121,0.1)" }}>
                      <Icon size={15} style={{ color: C.primary }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold" style={{ color: C.text }}>{label}</p>
                      <p className="text-xs truncate" style={{ color: C.textMuted }}>{desc}</p>
                    </div>
                    <ArrowRight size={14} className="ml-auto flex-shrink-0" style={{ color: C.textMuted }} />
                  </button>
                ))}
              </div>

              {/* Promo card */}
              <div
                className="mt-5 p-5 rounded-2xl relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${C.primaryLight}33, ${C.primary}22)`, border: `1px solid ${C.border}` }}
              >
                <Package size={36} className="mb-3" style={{ color: C.primary }} />
                <p className="text-sm font-bold mb-1" style={{ color: C.text }}>Big deals just for you!</p>
                <p className="text-xs mb-3" style={{ color: C.textMuted }}>Explore exclusive offers and discounts.</p>
                <Link
                  to="/all-products"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white"
                  style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
                >
                  Shop Now <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}