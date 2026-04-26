/**
 * OrdersPage.jsx
 * Route: /dashboard/orders  (user only)
 *
 * Features:
 *  - Full order list with status, date, amount, items
 *  - Search by order ID or product name
 *  - Filter by status tab
 *  - Expandable order details (items list + tracking timeline)
 *  - Empty state
 */

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Truck,
  Circle,
  Package,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import API_BASE_URL from "../api/config";

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

const statusConfig = {
  Delivered:  { color: "#1c8079", bg: "rgba(28,128,121,0.1)",  icon: CheckCircle, label: "Delivered"  },
  Processing: { color: "#e8a860", bg: "rgba(232,168,96,0.1)",  icon: Clock,       label: "Processing" },
  Shipped:    { color: "#2fe0cb", bg: "rgba(47,224,203,0.12)", icon: Truck,       label: "Shipped"    },
  Pending:    { color: "#9ca3af", bg: "rgba(156,163,175,0.1)", icon: Circle,      label: "Pending"    },
  Cancelled:  { color: "#e05a5a", bg: "rgba(224,90,90,0.08)",  icon: Circle,      label: "Cancelled"  },
};

const STATUS_TABS = ["All", "Delivered", "Processing", "Shipped", "Pending", "Cancelled"];

// ── Order Row (expandable) ─────────────────────────────────────────────────────
const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);
  const cfg = statusConfig[order.status] ?? statusConfig.Pending;
  const StatusIcon = cfg.icon;

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={{ backgroundColor: C.white, borderColor: open ? C.primary : C.border }}
    >
      {/* Summary row */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        style={{ backgroundColor: open ? C.bgGradStart : C.white }}
      >
        <div className="flex items-center gap-4 min-w-0">
          {/* Status icon */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: cfg.bg }}>
            <StatusIcon size={17} style={{ color: cfg.color }} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold" style={{ color: C.text }}>#{order._id.slice(-6).toUpperCase()}</p>
            <p className="text-xs" style={{ color: C.textMuted }}>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
          <p className="text-sm font-bold hidden sm:block" style={{ color: C.text }}>${order.totalAmount.toFixed(2)}</p>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: cfg.bg, color: cfg.color }}
          >
            {order.status}
          </span>
          {open ? <ChevronUp size={16} style={{ color: C.textMuted }} /> : <ChevronDown size={16} style={{ color: C.textMuted }} />}
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="border-t" style={{ borderColor: C.border }}>
          <div className="grid lg:grid-cols-2 gap-6 p-5">

            {/* Items */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: C.textMuted }}>Items Ordered</p>
              <div className="space-y-2">
                {order.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: C.bg }}
                  >
                    <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: C.text }}>{item.name}</p>
                      <p className="text-xs" style={{ color: C.textMuted }}>Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold flex-shrink-0" style={{ color: C.primary }}>${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              {/* Payment + address */}
              <div className="mt-4 space-y-2 text-xs" style={{ color: C.textMuted }}>
                <p><span className="font-semibold" style={{ color: C.text }}>Payment:</span> Stripe Checkout</p>
                <p className="font-bold text-sm pt-1" style={{ color: C.text }}>Total: ${order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Tracking timeline */}
            <div className="relative pl-5">
              {/* Vertical line */}
              <div
                className="absolute left-1.5 top-2 bottom-2 w-0.5"
                style={{ backgroundColor: C.border }}
              />
              <div className="space-y-4">
                {[
                  { label: "Order Placed",   date: new Date(order.createdAt).toLocaleString(), done: true },
                  { label: "Payment Verified", date: "Via Stripe", done: true },
                  { label: "Processing",     date: "Estimated 2-3 days", done: order.status !== 'Pending' },
                  { label: "Delivered",      date: "Final step",  done: order.status === 'Delivered' },
                ].map((step, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    {/* Dot */}
                    <div
                      className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full border-2 flex-shrink-0"
                      style={{
                        backgroundColor: step.done ? C.primary : C.white,
                        borderColor:     step.done ? C.primary : C.border,
                      }}
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: step.done ? C.text : C.textMuted }}>{step.label}</p>
                      {step.date && <p className="text-xs" style={{ color: C.textMuted }}>{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,    setSearch]    = useState("");
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    if (user?.email) {
      fetch(`${API_BASE_URL}/orders/user/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching orders:", err);
          setLoading(false);
        });
    }
  }, [user]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((o) => {
      const matchStatus = activeTab === "All" || o.status === activeTab;
      const matchSearch = !q ||
        o._id.toLowerCase().includes(q) ||
        o.items.some((it) => it.name.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  }, [search, activeTab, orders]);

  const tabCounts = STATUS_TABS.reduce((acc, tab) => {
    acc[tab] = tab === "All"
      ? orders.length
      : orders.filter((o) => o.status === tab).length;
    return acc;
  }, {});

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c8079]"></div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: C.primary }}>My Account</p>
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>My Orders</h1>
        <p className="text-sm mt-1" style={{ color: C.textMuted }}>Track and review all your past and current orders.</p>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Orders",   value: orders.length,                                                    color: C.primary      },
          { label: "Delivered",      value: orders.filter((o) => o.status === "Delivered").length,            color: C.primary      },
          { label: "In Progress",    value: orders.filter((o) => ["Processing","Shipped"].includes(o.status)).length, color: "#e8a860" },
          { label: "Cancelled",      value: orders.filter((o) => o.status === "Cancelled").length,            color: "#e05a5a"       },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="p-4 rounded-2xl border text-center"
            style={{ backgroundColor: C.white, borderColor: C.border }}
          >
            <p className="text-2xl font-bold" style={{ color }}>{value}</p>
            <p className="text-xs mt-0.5"     style={{ color: C.textMuted }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Search + tabs */}
      <div className="rounded-2xl border overflow-hidden mb-4" style={{ backgroundColor: C.white, borderColor: C.border }}>
        <div className="px-5 py-4 border-b" style={{ borderColor: C.border }}>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
            <input
              type="text"
              placeholder="Search by order ID or product name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
              style={{ borderColor: C.border, backgroundColor: C.bg, color: C.text }}
              onFocus={(e) => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = "0 0 0 3px rgba(28,128,121,0.1)"; }}
              onBlur={(e)  => { e.target.style.borderColor = C.border;  e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Status tabs — horizontally scrollable */}
        <div className="flex overflow-x-auto px-4 py-2 gap-2" style={{ scrollbarWidth: "none" }}>
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap transition-all flex-shrink-0"
              style={
                activeTab === tab
                  ? { backgroundColor: C.primary, color: C.white }
                  : { backgroundColor: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }
              }
            >
              {tab}
              {tabCounts[tab] > 0 && (
                <span
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={
                    activeTab === tab
                      ? { backgroundColor: "rgba(255,255,255,0.25)", color: C.white }
                      : { backgroundColor: C.border,                 color: C.textMuted }
                  }
                >
                  {tabCounts[tab]}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders list */}
      {filtered.length === 0 ? (
        <div
          className="rounded-2xl border p-16 flex flex-col items-center justify-center text-center"
          style={{ backgroundColor: C.white, borderColor: C.border }}
        >
          <ShoppingBag size={48} className="mb-4" style={{ color: C.border }} />
          <p className="text-base font-bold mb-1" style={{ color: C.text }}>No orders found</p>
          <p className="text-sm mb-6" style={{ color: C.textMuted }}>
            {search ? "Try a different search term." : "You haven't placed any orders yet."}
          </p>
          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl text-white"
            style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
          >
            Start Shopping <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => (
            <OrderRow key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}