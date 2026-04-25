/**
 * ProfilePage.jsx
 *
 * Displayed at /dashboard/profile inside DashboardLayout's <Outlet />.
 * Reads user info from localStorage (set during login).
 * Allows editing name only — email is read-only.
 *
 * localStorage shape expected:
 *   { name: string, email: string }  stored under key "user"
 *   role: "admin" | "user"           stored under key "role"
 */

import { useState } from "react";
import { User, Mail, Shield, Save, CheckCircle, Pencil, X } from "lucide-react";

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

// ── Helpers ────────────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

const readUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const saveUserToStorage = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

// ── Sub-components ─────────────────────────────────────────────────────────────
const InfoRow = ({ icon: Icon, label, value, muted = false }) => (
  <div
    className="flex items-center gap-4 p-4 rounded-xl border"
    style={{ backgroundColor: C.bg, borderColor: C.border }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: "rgba(28,128,121,0.1)" }}
    >
      <Icon size={18} style={{ color: C.primary }} />
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-medium tracking-wider uppercase mb-0.5" style={{ color: C.textMuted }}>
        {label}
      </p>
      <p
        className="text-sm font-semibold truncate"
        style={{ color: muted ? C.textMuted : C.text }}
      >
        {value || "—"}
      </p>
    </div>
  </div>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const storedUser = readUserFromStorage();
  const role       = localStorage.getItem("role") || "user";
  const isAdmin    = role === "admin";

  const [name,       setName]       = useState(storedUser.name  || (isAdmin ? "Admin" : "John Doe"));
  const [email]                     = useState(storedUser.email || (isAdmin ? "admin@vebkino.com" : "john@gmail.com"));
  const [isEditing,  setIsEditing]  = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [saved,      setSaved]      = useState(false);
  const [error,      setError]      = useState("");

  const handleEdit = () => {
    setEditedName(name);
    setIsEditing(true);
    setSaved(false);
    setError("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(name);
    setError("");
  };

  const handleSave = () => {
    const trimmed = editedName.trim();
    if (!trimmed) {
      setError("Name cannot be empty.");
      return;
    }
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    // Persist to localStorage
    const updated = { ...storedUser, name: trimmed };
    saveUserToStorage(updated);

    setName(trimmed);
    setIsEditing(false);
    setError("");
    setSaved(true);

    // Hide the success indicator after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };

  const initials  = getInitials(name);
  const roleLabel = isAdmin ? "Super Admin" : "Member";

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      {/* ── Page header ── */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase font-semibold mb-1" style={{ color: C.primary }}>
          My Account
        </p>
        <h1 className="text-2xl font-bold" style={{ color: C.text }}>Profile</h1>
        <p className="text-sm mt-1" style={{ color: C.textMuted }}>
          View and manage your account information.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* ── Left: Avatar card ── */}
        <div
          className="rounded-2xl border p-8 flex flex-col items-center text-center"
          style={{ backgroundColor: C.white, borderColor: C.border }}
        >
          {/* Avatar circle */}
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 relative"
            style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
          >
            {initials}
          </div>

          <h2 className="text-lg font-bold mb-1" style={{ color: C.text }}>{name}</h2>
          <p className="text-sm mb-3" style={{ color: C.textMuted }}>{email}</p>

          {/* Role badge */}
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: isAdmin ? "rgba(28,128,121,0.12)" : "rgba(47,224,203,0.12)",
              color: C.primary,
            }}
          >
            {roleLabel}
          </span>

          {/* Divider */}
          <div className="w-full my-6 h-px" style={{ backgroundColor: C.border }} />

          {/* Quick stats */}
          <div className="w-full grid grid-cols-2 gap-3">
            {(isAdmin
              ? [{ label: "Total Orders", value: "2,589" }, { label: "Products",     value: "320"   }]
              : [{ label: "My Orders",    value: "12"     }, { label: "Wishlist",     value: "8"     }]
            ).map(({ label, value }) => (
              <div
                key={label}
                className="rounded-xl p-3"
                style={{ backgroundColor: C.bg, border: `1px solid ${C.border}` }}
              >
                <p className="text-lg font-bold" style={{ color: C.primary }}>{value}</p>
                <p className="text-xs"           style={{ color: C.textMuted }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Info + Edit form ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Account Information card */}
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: C.white, borderColor: C.border }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{ color: C.text }}>Account Information</h3>

              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border"
                  style={{ borderColor: C.border, color: C.primary, backgroundColor: C.bg }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = C.bgGradStart;
                    e.currentTarget.style.borderColor     = C.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = C.bg;
                    e.currentTarget.style.borderColor     = C.border;
                  }}
                >
                  <Pencil size={13} /> Edit Name
                </button>
              )}
            </div>

            <div className="space-y-3">
              {/* Name — editable */}
              {isEditing ? (
                <div>
                  <label
                    className="block text-xs font-medium tracking-wider uppercase mb-2"
                    style={{ color: C.textMuted }}
                  >
                    Full Name
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => { setEditedName(e.target.value); setError(""); }}
                      className="flex-1 px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                      style={{
                        borderColor: error ? "#f87171" : C.border,
                        color:       C.text,
                        backgroundColor: C.white,
                        boxShadow: error ? "0 0 0 3px rgba(248,113,113,0.1)" : "none",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = C.primary;
                        e.target.style.boxShadow   = `0 0 0 3px rgba(28,128,121,0.1)`;
                      }}
                      onBlur={(e) => {
                        if (!error) {
                          e.target.style.borderColor = C.border;
                          e.target.style.boxShadow   = "none";
                        }
                      }}
                      autoFocus
                    />
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-semibold text-white transition-all duration-200"
                      style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <Save size={13} /> Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center gap-1.5 px-3 py-3 rounded-xl text-xs font-semibold transition-all duration-200 border"
                      style={{ borderColor: C.border, color: C.textMuted, backgroundColor: C.bg }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = C.bgGradStart)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = C.bg)}
                    >
                      <X size={13} />
                    </button>
                  </div>
                  {error && (
                    <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>{error}</p>
                  )}
                </div>
              ) : (
                <InfoRow icon={User} label="Full Name" value={name} />
              )}

              {/* Email — always read-only */}
              <div className="relative">
                <InfoRow icon={Mail} label="Email Address" value={email} />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "rgba(47,224,203,0.12)", color: C.primary }}
                >
                  fixed
                </span>
              </div>

              {/* Role — read-only */}
              <InfoRow icon={Shield} label="Role" value={roleLabel} />
            </div>

            {/* Save success banner */}
            {saved && (
              <div
                className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor: "rgba(28,128,121,0.08)", border: `1px solid ${C.border}` }}
              >
                <CheckCircle size={16} style={{ color: C.primary }} />
                <span style={{ color: C.primary, fontWeight: 600 }}>
                  Name updated successfully!
                </span>
              </div>
            )}
          </div>

          {/* Note card */}
          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: C.bgGradStart, borderColor: C.border }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: C.text }}>
              🔒 Why can't I change my email?
            </p>
            <p className="text-xs leading-relaxed" style={{ color: C.textMuted }}>
              Your email address is used to identify your account and cannot be changed here.
              If you need to update it, please contact support.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}