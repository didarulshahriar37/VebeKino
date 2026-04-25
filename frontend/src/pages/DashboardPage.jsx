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

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SEO from "../components/Shared/SEO";
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
  AlertTriangle,
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



const topProducts = [
  { name: "Minimalist Desk Lamp", sales: 523 },
  { name: "Wireless Headphones",  sales: 487 },
  { name: "Smart Watch",          sales: 389 },
  { name: "Portable Speaker",     sales: 320 },
  { name: "Mechanical Keyboard",  sales: 289 },
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

const AdminDashboardContent = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching admin stats:", err);
        setLoading(false);
      });
  }, []);

  console.log("AdminDashboardContent render state:", { loading, statsNull: !stats });

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c8079]"></div>
      <p className="ml-3 text-sm font-bold text-[#1c8079]">Loading platform stats...</p>
    </div>
  );

  if (!stats) {
    // Fallback to semi-mock data so it's not empty if fetch fails
    const fallbackStats = {
      totalUsers: 1,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      recentOrders: []
    };
    
    const adminStatCards = [
      { label: "Total Users",    value: fallbackStats.totalUsers,    sub: "Registered members",  icon: Users,       color: C.primary      },
      { label: "Active Products",value: fallbackStats.totalProducts, sub: "Inventory count",     icon: Package,     color: C.primaryLight },
      { label: "Total Orders",   value: fallbackStats.totalOrders,   sub: "Lifetime sales",      icon: ShoppingBag, color: "#e8a860"      },
      { label: "Total Revenue",  value: `$${fallbackStats.totalRevenue.toFixed(2)}`, sub: "Gross income", icon: Star, color: "#e05a5a" },
    ];

    return (
      <div className="p-8 text-center">
        <div className="mb-6 inline-flex p-4 rounded-full bg-amber-50 text-amber-600">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-xl font-bold mb-2">Connecting to live data...</h2>
        <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
          We're having trouble reaching the live statistics server. Showing local database summary instead.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-left">
          {adminStatCards.map((c) => <StatCard key={c.label} {...c} />)}
        </div>
      </div>
    );
  }

  const adminStatCards = [
    { label: "Total Users",    value: stats.totalUsers,    sub: "Registered members",  icon: Users,       color: C.primary      },
    { label: "Active Products",value: stats.totalProducts, sub: "Inventory count",     icon: Package,     color: C.primaryLight },
    { label: "Total Orders",   value: stats.totalOrders,   sub: "Lifetime sales",      icon: ShoppingBag, color: "#e8a860"      },
    { label: "Total Revenue",  value: `$${stats.totalRevenue.toFixed(2)}`, sub: "Gross income", icon: Star, color: "#e05a5a" },
  ];

  return (
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
          <Link to="/dashboard/orders" className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
          {stats.recentOrders.length === 0 ? (
            <p className="text-xs text-center py-10 opacity-50">No orders yet</p>
          ) : (
            stats.recentOrders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.Pending;
              return (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold" style={{ color: C.text }}>#{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs truncate w-24" style={{ color: C.textMuted }}>{order.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold" style={{ color: C.text }}>${order.amount.toFixed(2)}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
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

      {/* Donut - Orders by Status */}
      <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <h2 className="text-base font-bold mb-5" style={{ color: C.text }}>Platform Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold" style={{ color: C.textMuted }}>Total Sales</span>
            <span className="text-xs font-bold" style={{ color: C.primary }}>{stats.totalOrders}</span>
          </div>
          <div className="w-full bg-[#f0fafa] h-2 rounded-full overflow-hidden">
            <div className="bg-[#1c8079] h-full" style={{ width: stats.totalOrders > 0 ? '100%' : '0%' }}></div>
          </div>
          <p className="text-[10px]" style={{ color: C.textMuted }}>Platform is currently running at 100% capacity with all services active.</p>
          <div className="pt-4 border-t" style={{ borderColor: C.border }}>
            <div className="flex items-center gap-2 text-[#1c8079] mb-1">
              <CheckCircle size={14} />
              <span className="text-xs font-bold">Stripe Connected</span>
            </div>
            <p className="text-[10px]" style={{ color: C.textMuted }}>Test keys are currently active and ready for transactions.</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold" style={{ color: C.text }}>Quick Actions</h2>
        </div>
        <div className="space-y-4">
          <button 
            onClick={() => alert("Setting lock hours...")}
            className="w-full py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all hover:bg-gray-50"
            style={{ borderColor: C.border, color: C.primary }}
          >
            Config Lock Hours
          </button>
          <button 
            onClick={() => alert("Resetting user locks...")}
            className="w-full py-3 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all hover:bg-gray-50"
            style={{ borderColor: C.border, color: "#e8a860" }}
          >
            Manage User Locks
          </button>
        </div>
      </div>
    </div>
  </>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// USER CONTENT
// ══════════════════════════════════════════════════════════════════════════════

const mockOrders = [
  { id: "#ORD-2456", date: "May 16, 2025", amount: "$120.00", status: "Delivered"  },
  { id: "#ORD-2455", date: "May 10, 2025", amount: "$89.00",  status: "Processing" },
  { id: "#ORD-2454", date: "May 05, 2025", amount: "$200.00", status: "Shipped"    },
  { id: "#ORD-2453", date: "Apr 30, 2025", amount: "$75.00",  status: "Delivered"  },
];

const UserDashboardContent = () => {
  const { user } = useAuth();
  const [queueCount, setQueueCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      // Fetch queue count
      fetch(`http://localhost:3000/queue/${user.email}`)
        .then(res => res.json())
        .then(data => setQueueCount(data.length))
        .catch(err => console.error("Error fetching queue count:", err));

      // Fetch recent orders
      fetch(`http://localhost:3000/orders/user/${user.email}`)
        .then(res => res.json())
        .then(data => setRecentOrders(data.slice(0, 4))) // Only last 4
        .catch(err => console.error("Error fetching recent orders:", err));
    }
  }, [user]);

  const userStatCards = [
    { label: "Waitlist Items", value: queueCount, sub: "In Anti-Impulse queue", icon: Clock, color: C.primary },
    { label: "Impulse Savings", value: `$${(queueCount * 120).toFixed(2)}`, sub: "Money you kept", icon: Heart, color: "#e05a78" },
    { label: "Total Orders", value: recentOrders.length, sub: "Completed purchases", icon: ShoppingBag, color: C.primaryLight },
    { label: "Reward Points", value: recentOrders.length * 50 + 100, sub: "Loyalty balance", icon: Star, color: "#e8a860" },
  ];

  return (
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
          <Link to="/dashboard/orders" className="text-xs font-semibold flex items-center gap-1" style={{ color: C.primary }}>
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-3">
          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package size={32} className="mx-auto mb-2 opacity-20" style={{ color: C.text }} />
              <p className="text-sm" style={{ color: C.textMuted }}>No orders yet.</p>
            </div>
          ) : (
            recentOrders.map((order) => {
              const cfg = statusConfig[order.status] || statusConfig.Pending;
              const StatusIcon = cfg.icon;
              return (
                <div
                  key={order._id}
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
                      <p className="text-sm font-semibold" style={{ color: C.text }}>#{order._id.slice(-6).toUpperCase()}</p>
                      <p className="text-xs"               style={{ color: C.textMuted }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold" style={{ color: C.text }}>${order.totalAmount.toFixed(2)}</p>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: cfg.bg, color: cfg.color }}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Waitlist Journey */}
      <div className="rounded-2xl border p-6" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <h2 className="text-base font-bold mb-4" style={{ color: C.text }}>Anti-Impulse Journey</h2>
        <div className="space-y-4">
          {[
            { label: "Cool-down Phase", active: true, done: true },
            { label: "AI Cognitive Review", active: queueCount > 0, done: false },
            { label: "Social Validation", active: false, done: false },
            { label: "Intent Verification", active: false, done: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border"
                style={{ 
                  backgroundColor: step.done ? C.primary : (step.active ? C.bgGradStart : "transparent"),
                  color: step.done ? "white" : (step.active ? C.primary : C.textMuted),
                  borderColor: step.active || step.done ? C.primary : C.border
                }}
              >
                {step.done ? <CheckCircle size={14} /> : i + 1}
              </div>
              <p className="text-xs font-semibold" style={{ color: step.active || step.done ? C.text : C.textMuted }}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
        <Link 
          to="/queue"
          className="w-full mt-6 py-3 rounded-xl border text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:bg-gray-50"
          style={{ borderColor: C.border, color: C.primary }}
        >
          Check My Progress <ArrowRight size={14} />
        </Link>
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
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — role switch happens here
// ══════════════════════════════════════════════════════════════════════════════
export default function DashboardPage() {
  const { user } = useAuth();
  const isAdmin = user?.role?.toLowerCase() === "admin";

  return (
    <>
      <SEO 
        title={isAdmin ? "Admin Dashboard" : "User Dashboard"} 
        description={isAdmin ? "Manage VebeKino platform users, products, and global statistics." : "Track your anti-impulse progress, manage your waitlist, and view your orders."} 
      />
      {isAdmin ? <AdminDashboardContent /> : <UserDashboardContent />}
    </>
  );
}