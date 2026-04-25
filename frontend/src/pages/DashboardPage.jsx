/**
 * DashboardPage.jsx
 *
 * Single dashboard page that renders either the Admin view or the User view
 * depending on the "role" key stored in localStorage.
 *
 * localStorage.getItem("role") === "admin"  →  AdminDashboardContent
 * anything else                             →  UserDashboardContent
 *
 * The sidebar and topbar live in DashboardLayout.jsx; this file only
 * contains the scrollable page body rendered inside <Outlet />.
 */

import { Link } from "react-router";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  CheckCircle,
  Clock,
  Truck,
  Circle,
  ShoppingBag,
  Heart,
  MapPin,
  Star,
  User,
  CreditCard,
  Bell,
} from "lucide-react";

// ── Shared colours ─────────────────────────────────────────────────────────────
const C = {
  primary:      "#1c8079",
  primaryLight: "#2fe0cb",
  bg:           "#f0fafa",
  bgGradStart:  "#e0f5f3",
  text:         "#0d3533",
  textMuted:    "#4a8580",
  border:       "#a8d8d4",
  white:        "#ffffff",
};

// ── Status config (shared) ─────────────────────────────────────────────────────
const statusConfig = {
  Delivered:  { color: "#1c8079", bg: "rgba(28,128,121,0.1)",  icon: CheckCircle },
  Processing: { color: "#e8a860", bg: "rgba(232,168,96,0.1)",  icon: Clock       },
  Shipped:    { color: "#2fe0cb", bg: "rgba(47,224,203,0.12)", icon: Truck       },
  Pending:    { color: "#9ca3af", bg: "rgba(156,163,175,0.1)", icon: Circle      },
};

// ── Shared stat card ───────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon: Icon, color, change, up }) => (
  <div
    className="p-5 rounded-2xl border transition-all duration-300 cursor-pointer"
    style={{ backgroundColor: C.white, borderColor: C.border }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = C.primary;
      e.currentTarget.style.transform   = "translateY(-2px)";
      e.currentTarget.style.boxShadow   = "0 8px 24px rgba(28,128,121,0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = C.border;
      e.currentTarget.style.transform   = "translateY(0)";
      e.currentTarget.style.boxShadow   = "none";
    }}
  >
    <div className="flex items-start justify-between mb-3">
      <p className="text-xs font-medium" style={{ color: C.textMuted }}>{label}</p>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}18` }}>
        <Icon size={16} style={{ color }} />
      </div>
    </div>
    <p className="text-2xl font-bold mb-1" style={{ color: C.text }}>{value}</p>
    {sub ? (
      <p className="text-xs" style={{ color: C.primary }}>{sub}</p>
    ) : (
      <p className="text-xs flex items-center gap-1" style={{ color: up ? C.primary : "#f87171" }}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {change} from last month
      </p>
    )}
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN CONTENT
// ══════════════════════════════════════════════════════════════════════════════

const adminStatCards = [
  { label: "Total Users",    value: "1,245",  change: "+12.5%", up: true, icon: Users,        color: C.primary      },
  { label: "Total Orders",   value: "2,589",  change: "+18.9%", up: true, icon: ShoppingCart, color: C.primaryLight },
  { label: "Total Products", value: "320",    change: "+8.7%",  up: true, icon: Package,      color: "#e8a860"      },
  { label: "Total Revenue",  value: "$45,231",change: "+22.1%", up: true, icon: BarChart2,    color: "#e05a78"      },
];

const adminRecentOrders = [
  { id: "#ORD-2456", customer: "John Doe",      amount: "$120.00", status: "Delivered"  },
  { id: "#ORD-2455", customer: "Sarah Smith",   amount: "$89.00",  status: "Processing" },
  { id: "#ORD-2454", customer: "Michael Lee",   amount: "$200.00", status: "Shipped"    },
  { id: "#ORD-2453", customer: "Emily Johnson", amount: "$75.00",  status: "Pending"    },
  { id: "#ORD-2452", customer: "David Brown",   amount: "$150.00", status: "Delivered"  },
];

const topProducts = [
  { name: "Minimalist Desk Lamp", sales: 523 },
  { name: "Wireless Headphones",  sales: 487 },
  { name: "Smart Watch",          sales: 389 },
  { name: "Portable Speaker",     sales: 320 },
  { name: "Mechanical Keyboard",  sales: 289 },
];

const recentUsers = [
  { name: "John Doe",    email: "john@gmail.com",    date: "May 16", avatar: "JD" },
  { name: "Sarah Smith", email: "sarah@gmail.com",   date: "May 15", avatar: "SS" },
  { name: "Michael Lee", email: "michael@gmail.com", date: "May 15", avatar: "ML" },
];

// Pure-SVG line chart — no external lib
const MiniChart = () => {
  const points = [18, 28, 22, 35, 30, 42, 38, 50, 44, 60, 52, 65];
  const max    = Math.max(...points);
  const w = 560; const h = 120; const pad = 10;
  const xs    = points.map((_, i)  => pad + (i / (points.length - 1)) * (w - pad * 2));
  const ys    = points.map((p)     => h - pad - (p / max) * (h - pad * 2));
  const pathD = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaD = `${pathD} L${xs[xs.length - 1]},${h - pad} L${xs[0]},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height: 100 }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2fe0cb" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0"    />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#chartGrad)" />
      <path d={pathD} fill="none" stroke="#1c8079" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => <circle key={i} cx={x} cy={ys[i]} r="3" fill="#1c8079" />)}
    </svg>
  );
};

// Pure-SVG donut chart
const DonutChart = () => {
  const segments = [
    { label: "Delivered",  value: 63, color: "#1c8079" },
    { label: "Processing", value: 20, color: "#e8a860" },
    { label: "Shipped",    value: 12, color: "#2fe0cb" },
    { label: "Pending",    value:  5, color: "#d1d5db" },
  ];
  const total = segments.reduce((s, x) => s + x.value, 0);
  let cumulative = 0;
  const r = 40; const cx = 60; const cy = 60;
  function polarToCart(cx, cy, r, angle) {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  const arcs = segments.map((seg) => {
    const startAngle = (cumulative / total) * 360 - 90;
    cumulative += seg.value;
    const endAngle = (cumulative / total) * 360 - 90;
    const start = polarToCart(cx, cy, r, startAngle);
    const end   = polarToCart(cx, cy, r, endAngle);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return { ...seg, d: `M${cx},${cy} L${start.x},${start.y} A${r},${r} 0 ${largeArc} 1 ${end.x},${end.y} Z` };
  });
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

const AdminDashboardContent = () => (
  <>
    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {adminStatCards.map((c) => <StatCard key={c.label} {...c} />)}
    </div>

    {/* Row 2: Sales chart + Recent orders */}
    <div className="grid lg:grid-cols-3 gap-6 mb-6">
      <div className="lg:col-span-2 rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold" style={{ color: C.text }}>Sales Overview</h2>
          <span className="text-xs px-3 py-1 rounded-full font-medium" style={{ backgroundColor: C.bgGradStart, color: C.primary }}>
            This Week
          </span>
        </div>
        <MiniChart />
        <div className="flex justify-between mt-2">
          {["May 10","May 11","May 12","May 13","May 14","May 15","May 16"].map((d) => (
            <span key={d} className="text-xs" style={{ color: C.textMuted }}>{d.split(" ")[1]}</span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold" style={{ color: C.text }}>Recent Orders</h2>
          <button className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="space-y-3">
          {adminRecentOrders.map((order) => {
            const cfg = statusConfig[order.status];
            return (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold" style={{ color: C.text }}>{order.id}</p>
                  <p className="text-xs"               style={{ color: C.textMuted }}>{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold" style={{ color: C.text }}>{order.amount}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
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
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
              >
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: C.text }}>{p.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: C.bgGradStart }}>
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(p.sales / topProducts[0].sales) * 100}%`,
                        background: `linear-gradient(90deg, ${C.primaryLight}, ${C.primary})`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium flex-shrink-0" style={{ color: C.textMuted }}>{p.sales}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donut */}
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
                <p className="text-xs truncate"               style={{ color: C.textMuted }}>{u.email}</p>
              </div>
              <p className="text-xs flex-shrink-0" style={{ color: C.textMuted }}>{u.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

// ══════════════════════════════════════════════════════════════════════════════
// USER CONTENT
// ══════════════════════════════════════════════════════════════════════════════

const mockOrders = [
  { id: "#ORD-2456", date: "May 16, 2025", amount: "$120.00", status: "Delivered"  },
  { id: "#ORD-2455", date: "May 10, 2025", amount: "$89.00",  status: "Processing" },
  { id: "#ORD-2454", date: "May 05, 2025", amount: "$200.00", status: "Shipped"    },
  { id: "#ORD-2453", date: "Apr 30, 2025", amount: "$75.00",  status: "Delivered"  },
];

const userStatCards = [
  { label: "Total Orders",    value: "12",  sub: "View all orders",    icon: ShoppingBag, color: C.primary      },
//   { label: "Wishlist Items",  value: "8",   sub: "View your wishlist", icon: Heart,       color: "#e05a78"      },
//   { label: "Saved Addresses", value: "3",   sub: "Manage addresses",   icon: MapPin,      color: C.primaryLight },
  { label: "Reward Points",   value: "250", sub: "View rewards",       icon: Star,        color: "#e8a860"      },
];

const UserDashboardContent = () => (
  <>
    {/* Stat cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {userStatCards.map((c) => <StatCard key={c.label} {...c} />)}
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      {/* Recent Orders */}
      <div className="lg:col-span-2 rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
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
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bgGradStart)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cfg.bg }}>
                    <StatusIcon size={15} style={{ color: cfg.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: C.text }}>{order.id}</p>
                    <p className="text-xs"               style={{ color: C.textMuted }}>{order.date}</p>
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
      {/* <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <h2 className="text-base font-bold mb-5" style={{ color: C.text }}>Account Overview</h2> */}
        <div className="space-y-2">
          {[
            // { label: "Profile Information", desc: "Update your personal details", icon: User       },
            // { label: "Payment Methods",     desc: "Manage cards & billing",       icon: CreditCard },
            // { label: "Notifications",       desc: "Email & SMS alerts",           icon: Bell       },
          ].map(({ label, desc, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 w-full p-3 rounded-xl text-left transition-all duration-200"
              style={{ backgroundColor: C.bg }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.bgGradStart;
                e.currentTarget.style.borderLeft      = `3px solid ${C.primary}`;
                e.currentTarget.style.paddingLeft     = "10px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = C.bg;
                e.currentTarget.style.borderLeft      = "none";
                e.currentTarget.style.paddingLeft     = "12px";
              }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "rgba(28,128,121,0.1)" }}>
                <Icon size={15} style={{ color: C.primary }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: C.text }}>{label}</p>
                <p className="text-xs truncate"      style={{ color: C.textMuted }}>{desc}</p>
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
          <p className="text-xs mb-3"           style={{ color: C.textMuted }}>Explore exclusive offers and discounts.</p>
          <Link
            to="/all-products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg text-white"
            style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
          >
            Shop Now <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    {/* </div> */}
  </>
);

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — role switch happens here
// ══════════════════════════════════════════════════════════════════════════════
export default function DashboardPage() {
  // TODO: Replace localStorage read with your real auth context when ready
  // e.g.  const { user } = useAuth();  const isAdmin = user?.role === "admin";
  const role    = localStorage.getItem("role") || "user";
  const isAdmin = role === "admin";

  return isAdmin ? <AdminDashboardContent /> : <UserDashboardContent />;
}