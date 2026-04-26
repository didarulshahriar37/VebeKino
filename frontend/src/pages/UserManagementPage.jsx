/**
 * UserManagementPage.jsx
 * Route: /dashboard/users  (admin only)
 *
 * Features:
 *  - List all customers with avatar, name, email, role, join date, status
 *  - Search & filter by role
 *  - Toggle role: user ↔ admin
 *  - Remove / delete user (with confirmation modal)
 *  - Fully mock data — swap the `mockUsers` array + handlers with real API calls
 */

import { useState, useMemo, useEffect } from "react";
import API_BASE_URL from "../api/config";
import {
  Search,
  Trash2,
  ShieldCheck,
  ShieldOff,
  ChevronUp,
  ChevronDown,
  X,
  Users,
  UserCheck,
  UserX,
  AlertTriangle,
} from "lucide-react";

const C = {
  primary:      "#1c8079",
  primaryLight: "#2fe0cb",
  primaryDark:  "#155f5a",
  bg:           "#f0fafa",
  bgGradStart:  "#e0f5f3",
  text:         "#0d3533",
  textMuted:    "#4a8580",
  border:       "#a8d8d4",
  white:        "#ffffff",
  danger:       "#e05a5a",
  dangerBg:     "rgba(224,90,90,0.08)",
};



// ── Small helpers ──────────────────────────────────────────────────────────────
const RoleBadge = ({ role }) => (
  <span
    className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
    style={
      role === "admin"
        ? { backgroundColor: "rgba(28,128,121,0.12)", color: C.primary }
        : { backgroundColor: "rgba(168,216,212,0.25)", color: C.textMuted }
    }
  >
    {role === "admin" ? <ShieldCheck size={11} /> : <ShieldOff size={11} />}
    {role === "admin" ? "Admin" : "User"}
  </span>
);

const StatusDot = ({ status }) => (
  <span className="flex items-center gap-1.5">
    <span
      className="w-2 h-2 rounded-full"
      style={{ backgroundColor: status === "active" ? C.primary : "#d1d5db" }}
    />
    <span className="text-xs" style={{ color: status === "active" ? C.primary : C.textMuted }}>
      {status === "active" ? "Active" : "Inactive"}
    </span>
  </span>
);

// ── Confirm Modal ──────────────────────────────────────────────────────────────
const ConfirmModal = ({ user, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
    <div
      className="w-full max-w-sm rounded-2xl border p-6 shadow-2xl"
      style={{ backgroundColor: C.white, borderColor: C.border }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.dangerBg }}>
          <AlertTriangle size={20} style={{ color: C.danger }} />
        </div>
        <div>
          <p className="text-sm font-bold" style={{ color: C.text }}>Remove User</p>
          <p className="text-xs" style={{ color: C.textMuted }}>This action cannot be undone.</p>
        </div>
      </div>
      <p className="text-sm mb-6" style={{ color: C.textMuted }}>
        Are you sure you want to remove <strong style={{ color: C.text }}>{user.name}</strong>? Their account and all data will be permanently deleted.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border text-sm font-semibold transition-all"
          style={{ borderColor: C.border, color: C.textMuted, backgroundColor: C.bg }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bgGradStart)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
          style={{ backgroundColor: C.danger, boxShadow: "0 4px 14px rgba(224,90,90,0.3)" }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function UserManagementPage() {
  const [users,       setUsers]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [search,      setSearch]      = useState("");
  const [roleFilter,  setRoleFilter]  = useState("all");   // "all" | "user" | "admin"
  const [sortField,   setSortField]   = useState("name");
  const [sortDir,     setSortDir]     = useState("asc");
  const [toDelete,    setToDelete]    = useState(null);    // user object or null
  const [toast,       setToast]       = useState(null);    // { msg, type }

  const fetchUsers = () => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const adminId = parsedUser?.admin_id || parsedUser?.id || parsedUser?.user_id;

    fetch(`${API_BASE_URL}/api/admin/users`, {
      headers: adminId ? { admin_id: adminId } : {},
    })
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data.users) ? data.users : []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ── derived stats
  const totalAdmins   = users.filter((u) => u.role === "admin").length;
  const totalActive   = users.filter((u) => u.status === "active").length;

  // ── show brief toast
  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── toggle role
  const handleToggleRole = () => {
    showToast("Role update endpoint is not available in current backend.", "danger");
  };

  // ── delete
  const handleDelete = () => {
    showToast("Delete user endpoint is not available in current backend.", "danger");
    setToDelete(null);
  };

  // ── sort helper
  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
  };

  const SortIcon = ({ field }) =>
    sortField === field
      ? (sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />)
      : <ChevronDown size={13} style={{ opacity: 0.3 }} />;

  // ── filtered + sorted list
  const displayed = useMemo(() => {
    let list = users.filter((u) => {
      const q = search.toLowerCase();
      const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchRole   = roleFilter === "all" || u.role === roleFilter;
      return matchSearch && matchRole;
    });
    list = [...list].sort((a, b) => {
      const va = a[sortField] ?? "";
      const vb = b[sortField] ?? "";
      return sortDir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return list;
  }, [users, search, roleFilter, sortField, sortDir]);

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1c8079]"></div>
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* Toast */}
      {toast && (
        <div
          className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold"
          style={{
            backgroundColor: toast.type === "danger" ? C.danger : C.primary,
            color: C.white,
            minWidth: 220,
          }}
        >
          {toast.msg}
          <button onClick={() => setToast(null)} className="ml-auto opacity-75 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Delete confirm modal */}
      {toDelete && (
        <ConfirmModal
          user={toDelete}
          onConfirm={handleDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      {/* Page header */}
      <div className="mb-6">
        <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: C.primary }}>Admin Panel</p>
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>User Management</h1>
        <p className="text-sm mt-1" style={{ color: C.textMuted }}>View, manage and control all registered users.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Users",    value: users.length, icon: Users,     color: C.primary      },
          { label: "Admins",         value: totalAdmins,  icon: UserCheck, color: C.primaryLight },
          { label: "Active Users",   value: totalActive,  icon: UserX,     color: "#e8a860"      },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="p-4 rounded-2xl border flex items-center gap-4"
            style={{ backgroundColor: C.white, borderColor: C.border }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: C.text }}>{value}</p>
              <p className="text-xs"            style={{ color: C.textMuted }}>{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="rounded-2xl border overflow-hidden" style={{ backgroundColor: C.white, borderColor: C.border }}>

        {/* Toolbar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b"
          style={{ borderColor: C.border }}
        >
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
            <input
              type="text"
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
              style={{ borderColor: C.border, backgroundColor: C.bg, color: C.text }}
              onFocus={(e) => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = "0 0 0 3px rgba(28,128,121,0.1)"; }}
              onBlur={(e)  => { e.target.style.borderColor = C.border;  e.target.style.boxShadow = "none"; }}
            />
          </div>

          {/* Role filter pills */}
          <div className="flex gap-2">
            {["all", "user", "admin"].map((f) => (
              <button
                key={f}
                onClick={() => setRoleFilter(f)}
                className="text-xs font-semibold px-3 py-2 rounded-xl capitalize transition-all"
                style={
                  roleFilter === f
                    ? { backgroundColor: C.primary, color: C.white }
                    : { backgroundColor: C.bg, color: C.textMuted, border: `1px solid ${C.border}` }
                }
              >
                {f === "all" ? "All" : f === "admin" ? "Admins" : "Users"}
              </button>
            ))}
          </div>
        </div>

        {/* Table — scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: C.bg, borderBottom: `1px solid ${C.border}` }}>
                {[
                  { label: "#",      field: "_id"     },
                  { label: "User",   field: "name"   },
                  { label: "Email",  field: "email"  },
                  { label: "Role",   field: "role"   },
                  { label: "Joined", field: "joined" },
                  { label: "Status", field: "status" },
                  { label: "Actions" },
                ].map(({ label, field }) => (
                  <th
                    key={label}
                    className="px-4 py-3 text-left text-xs font-semibold tracking-wider uppercase select-none"
                    style={{ color: C.textMuted, cursor: field ? "pointer" : "default", whiteSpace: "nowrap" }}
                    onClick={() => field && handleSort(field)}
                  >
                    <span className="flex items-center gap-1">
                      {label}
                      {field && <SortIcon field={field} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center text-sm" style={{ color: C.textMuted }}>
                    No users match your search.
                  </td>
                </tr>
              ) : (
                displayed.map((user, idx) => (
                  <tr
                    key={user.email}
                    style={{ borderBottom: `1px solid ${C.border}` }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    {/* # */}
                    <td className="px-4 py-3.5 text-xs" style={{ color: C.textMuted }}>{idx + 1}</td>

                    {/* User avatar + name */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
                        >
                          {user.name[0]}
                        </div>
                        <span className="font-semibold whitespace-nowrap" style={{ color: C.text }}>{user.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3.5" style={{ color: C.textMuted }}>{user.email}</td>

                    {/* Role */}
                    <td className="px-4 py-3.5"><RoleBadge role={user.role} /></td>

                    {/* Joined */}
                    <td className="px-4 py-3.5 whitespace-nowrap" style={{ color: C.textMuted }}>{new Date(user.createdAt || Date.now()).toLocaleDateString()}</td>

                    {/* Status */}
                    <td className="px-4 py-3.5"><StatusDot status={user.is_locked ? "inactive" : "active"} /></td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        {/* Toggle role button */}
                        <button
                          onClick={() => handleToggleRole(user.email)}
                          title={user.role === "admin" ? "Demote to User" : "Promote to Admin"}
                          className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
                          style={{ borderColor: C.border, color: C.primary, backgroundColor: C.bg }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.bgGradStart; e.currentTarget.style.borderColor = C.primary; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.bg; e.currentTarget.style.borderColor = C.border; }}
                        >
                          {user.role === "admin" ? (
                            <><ShieldOff size={12} /> To User</>
                          ) : (
                            <><ShieldCheck size={12} /> To Admin</>
                          )}
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => setToDelete(user)}
                          title="Remove user"
                          className="flex items-center justify-center w-8 h-8 rounded-lg border transition-all"
                          style={{ borderColor: C.border, color: C.danger, backgroundColor: C.bg }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.dangerBg; e.currentTarget.style.borderColor = C.danger; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.bg; e.currentTarget.style.borderColor = C.border; }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex items-center justify-between border-t text-xs"
          style={{ borderColor: C.border, color: C.textMuted }}
        >
          <span>Showing <strong style={{ color: C.text }}>{displayed.length}</strong> of <strong style={{ color: C.text }}>{users.length}</strong> users</span>
          <span style={{ color: C.primary }}>{search && `Results for "${search}"`}</span>
        </div>
      </div>
    </div>
  );
}