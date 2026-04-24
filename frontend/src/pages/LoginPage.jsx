import { useState } from "react";
import { Link, useNavigate } from "react-router";

// Brand colors matching VebeKino homepage
const C = {
  primary: "#1c8079",
  primaryLight: "#2fe0cb",
  primaryDark: "#155f5a",
  bg: "#f0fafa",
  bgGradStart: "#e0f5f3",
  bgGradEnd: "#b2e8e2",
  text: "#0d3533",
  textMuted: "#4a8580",
  border: "#a8d8d4",
  borderFocus: "#1c8079",
  errorRed: "#d94f3d",
  white: "#ffffff",
};

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setIsLoading(true);
    setErrors({});
    setGeneralError("");
    try {
      await new Promise((res) => setTimeout(res, 1000));
      navigate("/dashboard");
    } catch (err) {
      setGeneralError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      {/* Left decorative panel */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12"
        style={{ background: `linear-gradient(135deg, ${C.bgGradStart} 0%, ${C.bgGradEnd} 100%)` }}
      >
        {/* SVG background matching Banner.jsx */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 900">
          <defs>
            <radialGradient id="lOrb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c8079" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lOrb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="150" rx="300" ry="250" fill="url(#lOrb1)" />
          <ellipse cx="700" cy="750" rx="350" ry="280" fill="url(#lOrb2)" />
          <path d="M0,300 C160,240 320,360 480,280 C640,200 740,300 800,260 L800,0 L0,0 Z" fill="#1c8079" fillOpacity="0.07" />
          <path d="M0,600 C200,540 400,660 600,580 C720,530 780,580 800,560 L800,900 L0,900 Z" fill="#2fe0cb" fillOpacity="0.08" />
          <circle cx="60" cy="780" r="120" fill="none" stroke="#1c8079" strokeWidth="1.5" strokeOpacity="0.2" />
          <circle cx="740" cy="100" r="140" fill="none" stroke="#2fe0cb" strokeWidth="1" strokeOpacity="0.18" />
          <circle cx="60" cy="200" r="12" fill="#1c8079" fillOpacity="0.2" />
          <circle cx="300" cy="80" r="7" fill="#2fe0cb" fillOpacity="0.3" />
          <circle cx="600" cy="140" r="5" fill="#1c8079" fillOpacity="0.25" />
          <circle cx="750" cy="400" r="14" fill="#2fe0cb" fillOpacity="0.2" />
          <circle cx="150" cy="700" r="8" fill="#23a898" fillOpacity="0.28" />
          {[...Array(6)].map((_, col) =>
            [...Array(8)].map((_, row) => (
              <circle key={`${col}-${row}`} cx={60 + col * 120} cy={60 + row * 110} r="2" fill="#1c8079" fillOpacity="0.1" />
            ))
          )}
        </svg>

        {/* Brand */}
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold tracking-tight" style={{ color: C.text }}>
            Vebe<span style={{ color: C.primary }}>Kino</span>
          </Link>
        </div>

        {/* Center content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <p className="text-xs tracking-[0.25em] uppercase mb-4 font-medium" style={{ color: C.primaryDark }}>
            Welcome Back
          </p>
          <h2 className="text-5xl font-bold leading-tight mb-6" style={{ color: C.text, lineHeight: "1.15" }}>
            Think
            <br />
            <span style={{ color: C.primary }}>Wait...</span>
            <br />
            Earn it
          </h2>
          <p className="text-base leading-relaxed" style={{ color: C.textMuted, maxWidth: "300px" }}>
            Because not everything you want, you need. Sign in and make every purchase mean something.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12" style={{ backgroundColor: C.white }}>
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-2xl font-bold" style={{ color: C.text }}>
              Vebe<span style={{ color: C.primary }}>Kino</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.25em] uppercase mb-2 font-semibold" style={{ color: C.primary }}>
              Sign In
            </p>
            <h1 className="text-4xl font-bold mb-2" style={{ color: C.text }}>
              Welcome back
            </h1>
            <p className="text-sm" style={{ color: C.textMuted }}>
              Don't have an account?{" "}
              <Link to="/auth/register" className="font-semibold underline underline-offset-2" style={{ color: C.primary }}>
                Register here
              </Link>
            </p>
          </div>

          {/* General error */}
          {generalError && (
            <div
              className="mb-5 px-4 py-3 rounded-lg text-sm border"
              style={{ backgroundColor: "#fff0ee", borderColor: "#f5c4be", color: C.errorRed }}
            >
              {generalError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                style={{
                  borderColor: errors.email ? C.errorRed : C.border,
                  color: C.text,
                  backgroundColor: errors.email ? "#fff8f7" : C.bg,
                  boxShadow: errors.email ? `0 0 0 3px rgba(28,128,121,0.08)` : "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = C.borderFocus;
                  e.target.style.boxShadow = "0 0 0 3px rgba(28,128,121,0.12)";
                  e.target.style.backgroundColor = C.white;
                }}
                onBlur={(e) => {
                  if (!errors.email) {
                    e.target.style.borderColor = C.border;
                    e.target.style.boxShadow = "none";
                    e.target.style.backgroundColor = C.bg;
                  }
                }}
              />
              {errors.email && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs tracking-widest uppercase font-semibold" style={{ color: C.textMuted }}>
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-medium" style={{ color: C.primary }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 pr-14 rounded-xl border text-sm outline-none transition-all duration-200"
                  style={{
                    borderColor: errors.password ? C.errorRed : C.border,
                    color: C.text,
                    backgroundColor: errors.password ? "#fff8f7" : C.bg,
                    boxShadow: errors.password ? "0 0 0 3px rgba(28,128,121,0.08)" : "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = C.borderFocus;
                    e.target.style.boxShadow = "0 0 0 3px rgba(28,128,121,0.12)";
                    e.target.style.backgroundColor = C.white;
                  }}
                  onBlur={(e) => {
                    if (!errors.password) {
                      e.target.style.borderColor = C.border;
                      e.target.style.boxShadow = "none";
                      e.target.style.backgroundColor = C.bg;
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs tracking-widest uppercase font-semibold"
                  style={{ color: C.primary }}
                  tabIndex={-1}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-white text-sm tracking-widest uppercase font-semibold transition-all duration-300 mt-2"
              style={{
                background: isLoading
                  ? "#7ab8b4"
                  : `linear-gradient(135deg, ${C.primaryLight} 0%, ${C.primary} 50%, ${C.primaryDark} 100%)`,
                letterSpacing: "0.15em",
                boxShadow: isLoading ? "none" : "0 4px 20px rgba(28,128,121,0.35)",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 6px 28px rgba(28,128,121,0.45)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(28,128,121,0.35)";
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-7">
            <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
            <span className="text-xs tracking-widest uppercase font-medium" style={{ color: C.textMuted }}>or</span>
            <div className="flex-1 h-px" style={{ backgroundColor: C.border }} />
          </div>

          {/* Social */}
          <div className="grid grid-cols-1 gap-3">
            {["Continue with Google"].map((label) => (
              <button
                key={label}
                type="button"
                className="py-3 px-4 rounded-xl border text-xs tracking-wide font-medium transition-all duration-200"
                style={{ borderColor: C.border, color: C.textMuted, backgroundColor: C.bg }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.backgroundColor = "#e6f7f5";
                  e.currentTarget.style.color = C.primary;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.backgroundColor = C.bg;
                  e.currentTarget.style.color = C.textMuted;
                }}
                onClick={() => console.log(`${label} clicked — TODO: implement OAuth`)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}