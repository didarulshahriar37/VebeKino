import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Tag,
  BarChart2,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle,
  Clock,
  Truck,
  Circle,
  Image,
  Ticket,
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

const mockAdmin = { name: "Admin", role: "Super Admin", avatar: "SA" };

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard",          key: "dashboard" },
  { icon: Users,           label: "User Management",    key: "users" },
  { icon: Package,         label: "Product Management", key: "products" },
  { icon: ShoppingCart,    label: "Order Management",   key: "orders" },
  { icon: Tag,             label: "Category Management",key: "categories" },
  { icon: Ticket,          label: "Coupon Management",  key: "coupons" },
  { icon: Image,           label: "Banner Management",  key: "banners" },
  { icon: BarChart2,       label: "Reports & Analytics",key: "reports" },
  { icon: Settings,        label: "Settings",           key: "settings" },
];

const statCards = [
  { label: "Total Users",    value: "1,245", change: "+12.5%", up: true,  icon: Users,        color: C.primary },
  { label: "Total Orders",   value: "2,589", change: "+18.9%", up: true,  icon: ShoppingCart, color: "#2fe0cb" },
  { label: "Total Products", value: "320",   change: "+8.7%",  up: true,  icon: Package,      color: "#e8a860" },
  { label: "Total Revenue",  value: "$45,231",change: "+22.1%",up: true,  icon: BarChart2,    color: "#e05a78" },
];

const recentOrders = [
  { id: "#ORD-2456", customer: "John Doe",      amount: "$120.00", status: "Delivered" },
  { id: "#ORD-2455", customer: "Sarah Smith",   amount: "$89.00",  status: "Processing" },
  { id: "#ORD-2454", customer: "Michael Lee",   amount: "$200.00", status: "Shipped" },
  { id: "#ORD-2453", customer: "Emily Johnson", amount: "$75.00",  status: "Pending" },
  { id: "#ORD-2452", customer: "David Brown",   amount: "$150.00", status: "Delivered" },
];

const topProducts = [
  { name: "Minimalist Desk Lamp",  sales: 523 },
  { name: "Wireless Headphones",   sales: 487 },
  { name: "Smart Watch",           sales: 389 },
  { name: "Portable Speaker",      sales: 320 },
  { name: "Mechanical Keyboard",   sales: 289 },
];

const recentUsers = [
  { name: "John Doe",    email: "john@gmail.com",    date: "May 16, 2025", avatar: "JD" },
  { name: "Sarah Smith", email: "sarah@gmail.com",   date: "May 15, 2025", avatar: "SS" },
  { name: "Michael Lee", email: "michael@gmail.com", date: "May 15, 2025", avatar: "ML" },
];

const statusConfig = {
  Delivered:  { color: "#1c8079", bg: "rgba(28,128,121,0.1)",  icon: CheckCircle },
  Processing: { color: "#e8a860", bg: "rgba(232,168,96,0.1)",  icon: Clock },
  Shipped:    { color: "#2fe0cb", bg: "rgba(47,224,203,0.12)", icon: Truck },
  Pending:    { color: "#9ca3af", bg: "rgba(156,163,175,0.1)", icon: Circle },
};

// Simple sparkline-style bar chart (pure SVG, no lib needed)
const MiniChart = () => {
  const points = [18, 28, 22, 35, 30, 42, 38, 50, 44, 60, 52, 65];
  const max = Math.max(...points);
  const w = 560; const h = 120; const pad = 10;
  const xs = points.map((_, i) => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys = points.map((p) => h - pad - (p / max) * (h - pad * 2));
  const pathD = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaD = pathD + ` L${xs[xs.length - 1]},${h - pad} L${xs[0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 100 }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} fill="none" stroke="#1c8079" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="3" fill="#1c8079" />
      ))}
    </svg>
  );
};

// Donut chart for order status
const DonutChart = () => {
  const segments = [
    { label: "Delivered",  value: 63, color: "#1c8079" },
    { label: "Processing", value: 20, color: "#e8a860" },
    { label: "Shipped",    value: 12, color: "#2fe0cb" },
    { label: "Pending",    value: 5,  color: "#d1d5db" },
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);
  let cumulative = 0;
  const r = 40; const cx = 60; const cy = 60;
  const arcs = segments.map((seg) => {
    const startAngle = (cumulative / total) * 360 - 90;
    cumulative += seg.value;
    const endAngle = (cumulative / total) * 360 - 90;
    const start = polarToCart(cx, cy, r, startAngle);
    const end = polarToCart(cx, cy, r, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return { ...seg, d: `M${cx},${cy} L${start.x},${start.y} A${r},${r} 0 ${largeArc} 1 ${end.x},${end.y} Z` };
  });
  function polarToCart(cx, cy, r, angle) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 120 120" style={{ width: 100, height: 100, flexShrink: 0 }}>
        {arcs.map((arc) => <path key={arc.label} d={arc.d} fill={arc.color} />)}
        <circle cx={cx} cy={cy} r={24} fill="white" />
      </svg>
      <div className="space-y-1.5">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2 text-xs" style={{ color: C.textMuted }}>
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            {s.label} ({s.value}%)
          </div>
        ))}
      </div>
    </div>
  );
};

export default function AdminDashboardPage() {
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
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={() => setSidebarOpen(false)} />
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

          {/* Admin pill */}
          <div className="flex items-center gap-3 px-6 py-4 mx-4 my-4 rounded-xl" style={{ backgroundColor: "rgba(47,224,203,0.08)" }}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
            >
              {mockAdmin.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">{mockAdmin.name}</p>
              <p className="text-xs" style={{ color: C.sidebarText }}>{mockAdmin.role}</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 overflow-y-auto">
            <p className="px-3 mb-2 text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(168,216,212,0.5)" }}>
              Admin
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
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium"
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
            <h1 className="text-lg font-bold" style={{ color: C.text }}>Dashboard Overview</h1>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border"
              style={{ borderColor: C.border, backgroundColor: C.bg }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
              >
                {mockAdmin.avatar}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold" style={{ color: C.text }}>{mockAdmin.name}</p>
                <p className="text-xs" style={{ color: C.textMuted }}>{mockAdmin.role}</p>
              </div>
              <ChevronDown size={14} style={{ color: C.textMuted }} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border shadow-lg py-1 z-50"
                style={{ backgroundColor: C.white, borderColor: C.border }}>
                {[
                  { label: "Profile",  action: () => setActiveNav("settings") },
                  { label: "Settings", action: () => setActiveNav("settings") },
                  { label: "Logout",   action: () => navigate("/") },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={() => { action(); setProfileOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm"
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${card.color}18` }}>
                      <Icon size={16} style={{ color: card.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-1" style={{ color: C.text }}>{card.value}</p>
                  <p className="text-xs flex items-center gap-1"
                    style={{ color: card.up ? C.primary : "#f87171" }}>
                    {card.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {card.change} from last month
                  </p>
                </div>
              );
            })}
          </div>

          {/* Row 2: Sales chart + Recent orders */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Sales Chart */}
            <div className="lg:col-span-2 rounded-2xl border p-6"
              style={{ backgroundColor: C.white, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: C.text }}>Sales Overview</h2>
                <span className="text-xs px-3 py-1 rounded-full font-medium"
                  style={{ backgroundColor: C.bgGradStart, color: C.primary }}>
                  This Week
                </span>
              </div>
              <MiniChart />
              <div className="flex justify-between mt-2">
                {["May 10","May 11","May 12","May 13","May 14","May 15","May 16"].map(d => (
                  <span key={d} className="text-xs" style={{ color: C.textMuted }}>{d.split(" ")[1]}</span>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: C.text }}>Recent Orders</h2>
                <button className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {recentOrders.map((order) => {
                  const cfg = statusConfig[order.status];
                  return (
                    <div key={order.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold" style={{ color: C.text }}>{order.id}</p>
                        <p className="text-xs" style={{ color: C.textMuted }}>{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold" style={{ color: C.text }}>{order.amount}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Row 3: Top Products + Donut + Recent Users */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Top Products */}
            <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: C.text }}>Top Products</h2>
                <button className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}>
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: C.text }}>{p.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: C.bgGradStart }}>
                          <div className="h-full rounded-full" style={{
                            width: `${(p.sales / topProducts[0].sales) * 100}%`,
                            background: `linear-gradient(90deg, ${C.primaryLight}, ${C.primary})`
                          }} />
                        </div>
                        <span className="text-xs font-medium flex-shrink-0" style={{ color: C.textMuted }}>
                          {p.sales}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Orders by Status Donut */}
            <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
              <h2 className="text-base font-bold mb-5" style={{ color: C.text }}>Orders by Status</h2>
              <DonutChart />
            </div>

            {/* Recent Users */}
            <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold" style={{ color: C.text }}>Recent Users</h2>
                <button className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
                  View All <ArrowRight size={12} />
                </button>
              </div>
              <div className="space-y-4">
                {recentUsers.map((u) => (
                  <div key={u.email} className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
                    >
                      {u.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{u.name}</p>
                      <p className="text-xs truncate" style={{ color: C.textMuted }}>{u.email}</p>
                    </div>
                    <p className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{u.date.split(",")[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}