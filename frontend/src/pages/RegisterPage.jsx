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
  successGreen: "#1c8079",
  white: "#ffffff",
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    else if (formData.fullName.trim().length < 2) newErrors.fullName = "Name must be at least 2 characters.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
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
      setGeneralError(err.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (pwd) => {
    if (!pwd) return null;
    if (pwd.length < 8) return { level: 1, label: "Weak", color: "#d94f3d" };
    if (pwd.length < 12 && !/[!@#$%^&*]/.test(pwd)) return { level: 2, label: "Fair", color: "#e8a860" };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[!@#$%^&*]/.test(pwd))
      return { level: 4, label: "Strong", color: C.primaryLight };
    return { level: 3, label: "Good", color: C.primary };
  };

  const strength = getPasswordStrength(formData.password);

  const inputStyle = (fieldName) => ({
    borderColor: errors[fieldName] ? C.errorRed : C.border,
    color: C.text,
    backgroundColor: errors[fieldName] ? "#fff8f7" : C.bg,
    boxShadow: errors[fieldName] ? "0 0 0 3px rgba(28,128,121,0.08)" : "none",
  });

  const handleFocus = (e) => {
    e.target.style.borderColor = C.borderFocus;
    e.target.style.boxShadow = "0 0 0 3px rgba(28,128,121,0.12)";
    e.target.style.backgroundColor = C.white;
  };

  const handleBlur = (e, fieldName) => {
    if (!errors[fieldName]) {
      e.target.style.borderColor = C.border;
      e.target.style.boxShadow = "none";
      e.target.style.backgroundColor = C.bg;
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
            <radialGradient id="rOrb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c8079" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rOrb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="100" cy="150" rx="300" ry="250" fill="url(#rOrb1)" />
          <ellipse cx="700" cy="750" rx="350" ry="280" fill="url(#rOrb2)" />
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
            Join Us
          </p>
          <h2 className="text-5xl font-bold leading-tight mb-6" style={{ color: C.text, lineHeight: "1.15" }}>
            Begin Your
            <br />
            <span style={{ color: C.primary }}>Journey</span>
            <br />
            Today
          </h2>
          <p className="text-base leading-relaxed" style={{ color: C.textMuted, maxWidth: "300px" }}>
            Create your account and start making every purchase count — thoughtful, intentional, meaningful.
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
              Create Account
            </p>
            <h1 className="text-4xl font-bold mb-2" style={{ color: C.text }}>
              Join VebeKino
            </h1>
            <p className="text-sm" style={{ color: C.textMuted }}>
              Already have an account?{" "}
              <Link to="/auth/login" className="font-semibold underline underline-offset-2" style={{ color: C.primary }}>
                Login here
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
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all duration-200"
                style={inputStyle("fullName")}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, "fullName")}
              />
              {errors.fullName && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.fullName}</p>}
            </div>

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
                style={inputStyle("email")}
                onFocus={handleFocus}
                onBlur={(e) => handleBlur(e, "email")}
              />
              {errors.email && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full px-4 py-3 pr-14 rounded-xl border text-sm outline-none transition-all duration-200"
                  style={inputStyle("password")}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, "password")}
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
              {/* Strength bar */}
              {formData.password && strength && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= strength.level ? strength.color : "#d0eeec" }}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium" style={{ color: strength.color }}>{strength.label} password</p>
                </div>
              )}
              {errors.password && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 pr-14 rounded-xl border text-sm outline-none transition-all duration-200"
                  style={inputStyle("confirmPassword")}
                  onFocus={handleFocus}
                  onBlur={(e) => handleBlur(e, "confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs tracking-widest uppercase font-semibold"
                  style={{ color: C.primary }}
                  tabIndex={-1}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
              {formData.confirmPassword && formData.password && (
                <p className="mt-1.5 text-xs font-medium" style={{
                  color: formData.password === formData.confirmPassword ? C.successGreen : C.errorRed,
                }}>
                  {formData.password === formData.confirmPassword ? "✓ Passwords match" : "Passwords do not match"}
                </p>
              )}
              {errors.confirmPassword && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.confirmPassword}</p>}
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}