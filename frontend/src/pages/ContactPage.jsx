import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle } from "lucide-react";
// import { FaTwitter, FaInstagram, FaLinkedin, FaFacebook, FaThread } from 'react-icons/fa'; // Import icons


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

const VectorBg = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 800 900"
  >
    <defs>
      <radialGradient id="cOrb1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1c8079" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="cOrb2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="100" cy="150" rx="300" ry="250" fill="url(#cOrb1)" />
    <ellipse cx="700" cy="750" rx="350" ry="280" fill="url(#cOrb2)" />
    <path d="M0,300 C160,240 320,360 480,280 C640,200 740,300 800,260 L800,0 L0,0 Z" fill="#1c8079" fillOpacity="0.07" />
    <path d="M0,600 C200,540 400,660 600,580 C720,530 780,580 800,560 L800,900 L0,900 Z" fill="#2fe0cb" fillOpacity="0.08" />
    <circle cx="60" cy="780" r="120" fill="none" stroke="#1c8079" strokeWidth="1.5" strokeOpacity="0.2" />
    <circle cx="740" cy="100" r="140" fill="none" stroke="#2fe0cb" strokeWidth="1" strokeOpacity="0.18" />
    <circle cx="60" cy="200" r="12" fill="#1c8079" fillOpacity="0.2" />
    <circle cx="300" cy="80" r="7" fill="#2fe0cb" fillOpacity="0.3" />
    <circle cx="750" cy="400" r="14" fill="#2fe0cb" fillOpacity="0.2" />
    {[...Array(6)].map((_, col) =>
      [...Array(8)].map((_, row) => (
        <circle key={`${col}-${row}`} cx={60 + col * 120} cy={60 + row * 110} r="2" fill="#1c8079" fillOpacity="0.1" />
      ))
    )}
  </svg>
);

const contactInfo = [
  {
    icon: <Mail size={20} />,
    label: "Email Us",
    value: "hello@vebekino.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: <Phone size={20} />,
    label: "Call Us",
    value: "+1 (555) 012-3456",
    sub: "Mon – Fri, 9 AM – 6 PM EST",
  },
  // {
  //   icon: <MapPin size={20} />,
  //   label: "Our Office",
  //   value: "42 Mindful Lane, Suite 7",
  //   sub: "San Francisco, CA 94103",
  // },
  {
    icon: <Clock size={20} />,
    label: "Support Hours",
    value: "Mon – Fri: 9 AM – 6 PM",
    sub: "Sat: 10 AM – 2 PM EST",
  },
];

const topics = [
  "General Inquiry",
  "Order Support",
  "Product Question",
  "Partnership",
  "Press & Media",
  "Feedback",
];

const faqs = [
  {
    q: "How does the Earn-It wishlist work?",
    a: "Add items to your Earn-It list, set a 24-hour wait period, and revisit them before purchasing. It's designed to break the impulse buying cycle. The longer wait forces you to think twice, reducing impulsivity and making your purchase more deliberate.",
  },
  {
    q: "Why should I review the pros and cons of an item before I buy?",
    a: "The AI generates both the pros and cons of the product you want to buy. Reviewing both sides forces you to make a rational decision rather than acting on instinct. It’s designed to help you consider the rational aspects of your purchase and think it through.",
  },
  {
    q: "Can I share my wishlist with my friends?",
    a: "Absolutely! Before purchasing, you can share your wishlist with friends and have them vote on whether you should go ahead with the purchase. It introduces accountability and makes the decision social, not just personal.",
  },
  {
    q: "What do I need to write before purchasing an item?",
    a: "Before finalizing your purchase, you are required to write a 50-word justification for why you want the item. This forces you to articulate your reasons, and many customers abandon their carts here because they can’t come up with a good reason. It’s not about the difficulty of writing, but about realizing the true value of what you're about to buy.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!emailRegex.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.topic) e.topic = "Please select a topic.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20) e.message = "Please write at least 20 characters.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsLoading(false);
    setSubmitted(true);
  };

  const inputBase = {
    borderColor: C.border,
    color: C.text,
    backgroundColor: C.bg,
    outline: "none",
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200";

  const handleFocus = (e) => {
    e.target.style.borderColor = C.borderFocus;
    e.target.style.boxShadow = "0 0 0 3px rgba(28,128,121,0.12)";
    e.target.style.backgroundColor = C.white;
  };
  const handleBlur = (e, field) => {
    if (!errors[field]) {
      e.target.style.borderColor = C.border;
      e.target.style.boxShadow = "none";
      e.target.style.backgroundColor = C.bg;
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", backgroundColor: C.bg, color: C.text }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 px-6"
        style={{ background: `linear-gradient(135deg, ${C.bgGradStart} 0%, ${C.bgGradEnd} 100%)` }}
      >
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 500">
          <defs>
            <radialGradient id="hOrb1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c8079" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="hOrb2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="200" cy="100" rx="320" ry="250" fill="url(#hOrb1)" />
          <ellipse cx="1280" cy="400" rx="380" ry="300" fill="url(#hOrb2)" />
          <path d="M0,200 C180,150 360,260 540,180 C720,100 900,220 1080,160 C1260,100 1380,180 1440,140 L1440,0 L0,0 Z" fill="#1c8079" fillOpacity="0.06" />
          <circle cx="80" cy="120" r="12" fill="#1c8079" fillOpacity="0.2" />
          <circle cx="340" cy="60" r="7" fill="#2fe0cb" fillOpacity="0.3" />
          <circle cx="1100" cy="60" r="10" fill="#2fe0cb" fillOpacity="0.2" />
          {[...Array(10)].map((_, col) =>
            [...Array(4)].map((_, row) => (
              <circle key={`${col}-${row}`} cx={80 + col * 140} cy={60 + row * 110} r="2" fill="#1c8079" fillOpacity="0.1" />
            ))
          )}
        </svg>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: C.primary }}>
            Get in Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5" style={{ color: C.text }}>
            We'd love to<br />
            <span style={{ color: C.primary }}>hear from you.</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: C.textMuted }}>
            Questions, feedback, partnership ideas — whatever's on your mind, drop us a line. Real humans read every message.
          </p>
        </div>
      </section>

      {/* ── MAIN SPLIT ── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">

          {/* Left: contact info */}
          <div className="lg:w-2/5 flex flex-col gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: C.primary }}>Contact Info</p>
              <h2 className="text-3xl font-bold mb-2" style={{ color: C.text }}>Let's talk</h2>
              <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>
                Our support team is small, responsive, and actually cares. Here's where to find us.
              </p>
            </div>

            <div className="grid gap-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex gap-4 items-start p-5 rounded-2xl border transition-all duration-300"
                  style={{ borderColor: C.border, backgroundColor: C.white }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.primary;
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(28,128,121,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${C.primaryLight}33, ${C.primary}22)`, color: C.primary }}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs tracking-widest uppercase font-semibold mb-0.5" style={{ color: C.textMuted }}>{info.label}</p>
                    <p className="text-sm font-semibold mb-0.5" style={{ color: C.text }}>{info.value}</p>
                    <p className="text-xs" style={{ color: C.textMuted }}>{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="p-5 rounded-2xl border" style={{ 
               borderColor: C.border,
               backgroundColor: C.white,
               maxWidth: "250px",
               margin:"0 ", 
               }}>
              <p className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: C.textMuted }}>Follow Us</p>
              <div className="flex gap-3">
                {["X", "IG", "FB"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-200"
                    style={{ borderColor: C.border, color: C.textMuted }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})`;
                      e.currentTarget.style.borderColor = C.primary;
                      e.currentTarget.style.color = C.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.color = C.textMuted;
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:w-3/5">
            <div
              className="p-8 md:p-10 rounded-2xl border"
              style={{ borderColor: C.border, backgroundColor: C.white, boxShadow: "0 4px 40px rgba(28,128,121,0.07)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: `linear-gradient(135deg, ${C.primaryLight}33, ${C.primary}22)` }}
                  >
                    <CheckCircle size={40} style={{ color: C.primary }} />
                  </div>
                  <h3 className="text-3xl font-bold mb-3" style={{ color: C.text }}>Message Sent!</h3>
                  <p className="text-sm leading-relaxed mb-8 max-w-xs" style={{ color: C.textMuted }}>
                    Thanks for reaching out. A real human will get back to you within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", topic: "", message: "" }); }}
                    className="text-sm font-semibold underline underline-offset-2"
                    style={{ color: C.primary }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: C.primary }}>Send a Message</p>
                    <h2 className="text-2xl font-bold" style={{ color: C.text }}>We typically reply within 24 hours.</h2>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                          Your Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          placeholder="Jane Doe"
                          value={form.name}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={(e) => handleBlur(e, "name")}
                          className={inputClass}
                          style={{ ...inputBase, borderColor: errors.name ? C.errorRed : C.border }}
                        />
                        {errors.name && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          placeholder="jane@email.com"
                          value={form.email}
                          onChange={handleChange}
                          onFocus={handleFocus}
                          onBlur={(e) => handleBlur(e, "email")}
                          className={inputClass}
                          style={{ ...inputBase, borderColor: errors.email ? C.errorRed : C.border }}
                        />
                        {errors.email && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.email}</p>}
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <label className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                        Topic
                      </label>
                      <select
                        name="topic"
                        value={form.topic}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "topic")}
                        className={inputClass}
                        style={{ ...inputBase, borderColor: errors.topic ? C.errorRed : C.border }}
                      >
                        <option value="">Select a topic…</option>
                        {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.topic && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.topic}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs tracking-widest uppercase mb-2 font-semibold" style={{ color: C.textMuted }}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us what's on your mind…"
                        value={form.message}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={(e) => handleBlur(e, "message")}
                        className={inputClass}
                        style={{ ...inputBase, borderColor: errors.message ? C.errorRed : C.border, resize: "vertical" }}
                      />
                      {errors.message && <p className="mt-1.5 text-xs" style={{ color: C.errorRed }}>{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl text-white text-sm tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: isLoading
                          ? "#7ab8b4"
                          : `linear-gradient(135deg, ${C.primaryLight} 0%, ${C.primary} 50%, ${C.primaryDark} 100%)`,
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
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>Send Message <ArrowRight size={15} /></>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6" style={{ backgroundColor: C.white }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.primary }}>Quick Answers</p>
            <h2 className="text-4xl font-bold" style={{ color: C.text }}>FAQs</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition-all duration-200"
                style={{ borderColor: openFaq === i ? C.primary : C.border }}
              >
                <button
                  type="button"
                  className="w-full text-left px-6 py-5 flex justify-between items-center"
                  style={{ backgroundColor: openFaq === i ? "#e6f7f5" : C.bg }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold pr-4" style={{ color: C.text }}>{faq.q}</span>
                  <span
                    className="text-lg font-bold flex-shrink-0 transition-transform duration-200"
                    style={{ color: C.primary, transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}
                  >+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5" style={{ backgroundColor: "#e6f7f5" }}>
                    <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm" style={{ color: C.textMuted }}>
            Still have questions?{" "}
            <a href="mailto:hello@vebekino.com" className="font-semibold underline underline-offset-2" style={{ color: C.primary }}>
              Email us directly
            </a>
          </p>
        </div>
      </section>

      {/* ── MAP STRIP ── */}
      {/* <section
        className="py-16 px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.bgGradStart} 0%, ${C.bgGradEnd} 100%)` }}
      >
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-2" style={{ color: C.primary }}>Find Us</p>
            <h3 className="text-3xl font-bold mb-2" style={{ color: C.text }}>42 Mindful Lane, Suite 7</h3>
            <p className="text-sm" style={{ color: C.textMuted }}>San Francisco, CA 94103</p>
          </div>
          <Link
            to="/about"
            className="flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm tracking-widest uppercase border-2 transition-all duration-300"
            style={{ borderColor: C.primary, color: C.primary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = C.primary;
              e.currentTarget.style.color = C.white;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = C.primary;
            }}
          >
            Our Story <ArrowRight size={15} />
          </Link>
        </div>
      </section> */}

    </div>
  );
}