import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import SEO from "../components/Shared/SEO";
import API_BASE_URL from "../api/config";

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
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [generalSuccess, setGeneralSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [receivedOtp, setReceivedOtp] = useState(""); // For "captcha" style display
  const [lockUntil, setLockUntil] = useState(null);
  const [lockedEmail, setLockedEmail] = useState(""); // Track WHICH email is locked
  const [countdown, setCountdown] = useState("");
  const [isBackendLocked, setIsBackendLocked] = useState(false); // New state for live check

  const isCurrentEmailLocked = (lockedEmail && formData.email === lockedEmail && lockUntil && new Date() < new Date(lockUntil)) || isBackendLocked;

  useEffect(() => {
    const timer = setInterval(() => {
      if (lockUntil) {
        const remaining = new Date(lockUntil) - new Date();
        if (remaining <= 0) {
          setLockUntil(null);
          setGeneralError("");
        } else {
          const h = Math.floor(remaining / 3600000);
          const m = Math.floor((remaining % 3600000) / 60000);
          const s = Math.floor((remaining % 60000) / 1000);
          setCountdown(`${h}h ${m}m ${s}s`);
        }
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockUntil]);

  // Live Backend Check (Debounced)
  useEffect(() => {
    if (!formData.email || !formData.email.includes("@")) {
      const resetBackendLock = setTimeout(() => setIsBackendLocked(false), 0);
      return () => clearTimeout(resetBackendLock);
    }

    const checkLock = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/status?email=${formData.email}`);
        const data = await res.json();
        if (data.is_locked) {
          setIsBackendLocked(true);
          setLockUntil(data.lock_until);
          setLockedEmail(data.email);
        } else {
          setIsBackendLocked(false);
        }
      } catch (err) {
        console.error("Status check failed", err);
      }
    };

    const timeout = setTimeout(checkLock, 500); // 500ms debounce
    return () => clearTimeout(timeout);
  }, [formData.email]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    return newErrors;
  };

  const validateOtpStep = () => {
    const newErrors = {};
    if (!formData.otp || formData.otp.length !== 6) newErrors.otp = "Please enter a valid 6-digit OTP.";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setGeneralError("");
    setGeneralSuccess("");
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setGeneralError("");
      setGeneralSuccess("");
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      const validationErrors = validate();
      if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
      
      setIsLoading(true);
      setErrors({});
      setGeneralError("");
      try {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
        const data = await res.json();
        if (res.status === 403) {
          setLockUntil(data.locked_until);
          setLockedEmail(formData.email);
          throw new Error(`Account locked. Try again in ${countdown || "a few hours"}`);
        }
        if (!res.ok) throw new Error(data.error || "Login failed");
        
        setReceivedOtp(data.otp);
        setGeneralSuccess("Credentials valid. Please enter the OTP.");
        setStep(2);
      } catch (err) {
        setGeneralError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      handleVerifyOtp(e);
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const validationErrors = validateOtpStep();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }

    setIsLoading(true);
    setErrors({});
    setGeneralError("");
    try {
      const res = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });
      const data = await res.json();
      if (res.status === 403) {
        setLockUntil(data.locked_until);
        setLockedEmail(formData.email);
        throw new Error(`Verification failed. Account locked for ${countdown || "a few hours"}`);
      }
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");

      setGeneralSuccess("Verified successfully! Signing you in...");
      login({ email: data.email, role: data.role, name: data.name });
      navigate("/dashboard");
    } catch (err) {
      setGeneralError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <SEO 
        title="Login" 
        description="Access your VebeKino account to manage your waitlist, track orders, and view your anti-impulse progress." 
      />
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
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="group flex items-center gap-2 mb-8 text-xs font-bold uppercase tracking-widest transition-all duration-300"
            style={{ color: C.textMuted }}
            onMouseEnter={(e) => e.currentTarget.style.color = C.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = C.textMuted}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>{step === 1 ? "Back" : "Change Credentials"}</span>
          </button>

          {/* Mobile brand */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="text-2xl font-bold" style={{ color: C.text }}>
              Vebe<span style={{ color: C.primary }}>Kino</span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-xs tracking-[0.25em] uppercase mb-2 font-semibold" style={{ color: C.primary }}>
              {step === 1 ? "Sign In" : "Security Check"}
            </p>
            <h1 className="text-4xl font-bold mb-2" style={{ color: C.text }}>
              {step === 1 ? "Welcome back" : "Verify it's you"}
            </h1>
            <p className="text-sm" style={{ color: C.textMuted }}>
              {step === 1 ? (
                <>Don't have an account? <Link to="/auth/register" className="font-semibold underline underline-offset-2" style={{ color: C.primary }}>Register here</Link></>
              ) : (
                <>We've sent a code to <span className="font-semibold text-black">{formData.email}</span></>
              )}
            </p>
          </div>

          {/* OTP Captcha Display (Step 2 Only) */}
          {step === 2 && receivedOtp && (
            <div 
              className="mb-8 p-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ 
                backgroundColor: "#f0fdfa", 
                borderColor: C.primaryLight,
                boxShadow: "0 10px 30px -10px rgba(47, 224, 203, 0.2)"
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-teal-600">Verification Code</p>
              <div className="flex gap-3">
                {receivedOtp.split("").map((digit, i) => (
                  <div 
                    key={i} 
                    className="w-10 h-12 flex items-center justify-center rounded-lg bg-white border border-teal-100 text-xl font-black text-teal-700 shadow-sm"
                    style={{ fontFamily: "'Space Mono', monospace" }}
                  >
                    {digit}
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-teal-500/70 font-medium italic">For demonstration: OTP is shown on screen</p>
            </div>
          )}

          {/* General success */}
          {generalSuccess && (
            <div
              className="mb-5 px-4 py-3 rounded-lg text-sm border animate-in fade-in"
              style={{ backgroundColor: "#f0fdf4", borderColor: "#bbf7d0", color: C.primary }}
            >
              {generalSuccess}
            </div>
          )}

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
            {step === 1 ? (
              <>
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
                    }}
                  />
                  {errors.email && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-14 rounded-xl border text-sm outline-none transition-all duration-200"
                      style={{
                        borderColor: errors.password ? C.errorRed : C.border,
                        color: C.text,
                        backgroundColor: errors.password ? "#fff8f7" : C.bg,
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
              </>
            ) : (
              <div>
                <label htmlFor="otp" className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                  Enter 6-Digit Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  value={formData.otp || ""}
                  onChange={handleChange}
                  placeholder="0 0 0 0 0 0"
                  className="w-full px-4 py-6 rounded-xl border text-center text-2xl font-bold tracking-[0.5em] outline-none transition-all duration-200"
                  style={{
                    borderColor: errors.otp ? C.errorRed : C.border,
                    color: C.primary,
                    backgroundColor: errors.otp ? "#fff8f7" : C.bg,
                  }}
                />
                {errors.otp && <p className="mt-1.5 text-xs text-center" style={{ color: C.errorRed }}>{errors.otp}</p>}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || isCurrentEmailLocked}
              className="w-full py-3.5 rounded-xl text-white text-sm tracking-widest uppercase font-semibold transition-all duration-300 mt-2"
              style={{
                background: (isLoading || isCurrentEmailLocked)
                  ? "#7ab8b4"
                  : `linear-gradient(135deg, ${C.primaryLight} 0%, ${C.primary} 50%, ${C.primaryDark} 100%)`,
                letterSpacing: "0.15em",
                boxShadow: (isLoading || isCurrentEmailLocked) ? "none" : "0 4px 20px rgba(28,128,121,0.35)",
                cursor: (isLoading || isCurrentEmailLocked) ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {step === 1 ? "Checking..." : "Verifying..."}
                </span>
              ) : isCurrentEmailLocked ? (
                `Locked (${countdown})`
              ) : (
                step === 1 ? "Sign In" : "Verify & Continue"
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