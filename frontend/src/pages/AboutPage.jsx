import { Link } from "react-router-dom";
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Users, Package, Star } from "lucide-react";

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
  white: "#ffffff",
};

const VectorBg = () => (
  <svg
    className="absolute inset-0 w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    viewBox="0 0 1440 900"
  >
    <defs>
      <radialGradient id="aOrb1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#1c8079" stopOpacity="0.25" />
        <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="aOrb2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="aOrb3" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#23a898" stopOpacity="0.2" />
        <stop offset="100%" stopColor="#23a898" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="200" cy="150" rx="350" ry="280" fill="url(#aOrb1)" />
    <ellipse cx="1280" cy="700" rx="400" ry="320" fill="url(#aOrb2)" />
    <ellipse cx="900" cy="400" rx="300" ry="260" fill="url(#aOrb3)" />
    <path d="M0,320 C180,260 360,380 540,300 C720,220 900,340 1080,280 C1260,220 1380,300 1440,260 L1440,0 L0,0 Z" fill="#1c8079" fillOpacity="0.06" />
    <path d="M0,500 C200,440 400,560 620,480 C840,400 1000,520 1200,460 C1350,415 1420,470 1440,450 L1440,900 L0,900 Z" fill="#2fe0cb" fillOpacity="0.07" />
    <circle cx="120" cy="760" r="140" fill="none" stroke="#1c8079" strokeWidth="1.5" strokeOpacity="0.18" />
    <circle cx="1340" cy="120" r="160" fill="none" stroke="#1c8079" strokeWidth="1.5" strokeOpacity="0.15" />
    <circle cx="80" cy="200" r="14" fill="#1c8079" fillOpacity="0.2" />
    <circle cx="340" cy="80" r="8" fill="#2fe0cb" fillOpacity="0.3" />
    <circle cx="1100" cy="80" r="10" fill="#2fe0cb" fillOpacity="0.2" />
    <circle cx="1400" cy="350" r="16" fill="#1c8079" fillOpacity="0.18" />
    {[...Array(10)].map((_, col) =>
      [...Array(7)].map((_, row) => (
        <circle key={`${col}-${row}`} cx={80 + col * 140} cy={80 + row * 120} r="2" fill="#1c8079" fillOpacity="0.1" />
      ))
    )}
  </svg>
);

const stats = [
  { value: "50K+", label: "Happy Users" },
  { value: "500+", label: "Products" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "3+", label: "Years Running" },
];

const values = [
  {
    icon: <Leaf size={22} />,
    title: "Mindful Choices",
    desc: "We believe that every purchase should be intentional and deliberate. By introducing a waiting period before finalizing your purchase, we ensure that you're making thoughtful, conscious decisions — not impulsive ones.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Rational Decisions",
    desc: "We encourage you to think critically about your choices. We provide both the pros and cons of each product, ensuring that you're fully informed and comfortable with your decision, rather than relying on quick gut reactions.",
  },
  {
    icon: <Users size={22} />,
    title: "Social Accountability",
    desc: "Buying isn't a private decision anymore. Our system introduces accountability by allowing you to share your intentions with friends, ensuring that you're not alone in making important purchasing decisions. Their input helps you stay true to your needs.",
  },
  {
    icon: <Sparkles size={22} />,
    title: "Personal Reflection",
    desc: "We challenge you to dig deeper. When you write about why you want a product, you’re forced to articulate your values. If you can’t justify your purchase, it’s a sign to step back — a process that ensures you're buying for the right reasons.",
  },
];

const team = [
  { name: "Arya Mensah", role: "Founder & CEO", initial: "A" },
  { name: "Priya Lowe", role: "Head of Curation", initial: "P" },
  { name: "Daniel Vu", role: "Lead Engineer", initial: "D" },
  { name: "Nadia Solis", role: "Brand & Design", initial: "N" },
];

const timeline = [
  { year: "2021", event: "VebeKino founded with 12 products and a big idea." },
  { year: "2022", event: "Crossed 10,000 users. Launched the Earn-It waitlist feature." },
  { year: "2023", event: "500+ curated products. Partnered with ethical manufacturers worldwide." },
  { year: "2024", event: "Mobile app launched. 50K+ community members." },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", backgroundColor: C.bg, color: C.text }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-28 pb-24 px-6"
        style={{ background: `linear-gradient(135deg, ${C.bgGradStart} 0%, ${C.bgGradEnd} 100%)` }}>
        <VectorBg />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-s tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: C.primary }}>
            Our Story
          </p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6" style={{ color: C.text }}>
            Think Before<br />
            <span style={{ color: C.primary }}>You Buy.</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: C.textMuted }}>
            VebeKino was born from a simple frustration: too many things, too little meaning. We built a marketplace that helps you want less and love more.
          </p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      {/* <section className="py-12 px-6 border-y" style={{ borderColor: C.border, backgroundColor: C.white }}>
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-bold mb-1" style={{ color: C.primary }}>{s.value}</p>
              <p className="text-xs tracking-widest uppercase font-medium" style={{ color: C.textMuted }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── MISSION ── */}
<section className="py-20 px-6">
  <div className="max-w-5xl mx-auto grid md:grid-cols-1 gap-16 items-center">
    {/* Left: text */}
    <div className="text-center"> {/* Center-aligned */}
      <p className="text-s tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.primary }}>
        Why We Exist
      </p>
      <h2 className="text-5xl font-bold mb-6 leading-tight" style={{ color: C.text }}> {/* Increased size */}
        Because not everything<br />you want, you need.
      </h2>
      <p className="text-lg leading-relaxed mb-4" style={{ color: C.textMuted }}>
        Modern e-commerce is designed to make you buy impulsively — infinite scroll, countdown timers, manufactured urgency. We hated that. So we built the opposite.
      </p>
      <p className="text-lg leading-relaxed" style={{ color: C.textMuted }}>
        VebeKino encourages you to think, wait, and then earn your purchase. Every product you add to your list is an intention. Every checkout is a decision you've made — not one that was made for you.
      </p>
    </div>

    {/* Right: pull quote card (commented out) */}
    {/* <div className="relative">
      <div
        className="p-10 rounded-2xl border relative overflow-hidden"
        style={{ borderColor: C.border, background: `linear-gradient(135deg, ${C.bgGradStart}, ${C.bgGradEnd})` }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
          <ellipse cx="50" cy="50" rx="200" ry="160" fill="url(#aOrb2)" />
        </svg>
        <p className="text-5xl font-bold leading-none mb-6 relative z-10" style={{ color: C.primaryDark, opacity: 0.3 }}>"</p>
        <p className="text-2xl font-bold leading-snug relative z-10" style={{ color: C.text }}>
          Mindful commerce isn't a trend. It's the future of how we relate to things.
        </p>
        <div className="mt-8 flex items-center gap-3 relative z-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
            style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
          >
            A
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: C.text }}>Arya Mensah</p>
            <p className="text-xs" style={{ color: C.textMuted }}>Founder, VebeKino</p>
          </div>
        </div>
      </div>
    </div> */}
  </div>
</section>

      {/* ── VALUES ── */}
      <section className="py-20 px-6" style={{ backgroundColor: C.white }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-s tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.primary }}>What We Stand For</p>
            <h2 className="text-4xl font-bold" style={{ color: C.text }}>Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-8 rounded-2xl border transition-all duration-300"
                style={{ borderColor: C.border, backgroundColor: C.bg }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(28,128,121,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `linear-gradient(135deg, ${C.primaryLight}33, ${C.primary}22)`, color: C.primary }}
                >
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: C.text }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: C.textMuted }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      {/* <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.primary }}>How We Got Here</p>
            <h2 className="text-4xl font-bold" style={{ color: C.text }}>Our Journey</h2>
          </div>
          <div className="relative"> */}
            {/* vertical line */}
            {/* <div className="absolute left-8 top-0 bottom-0 w-px" style={{ backgroundColor: C.border }} />
            <div className="space-y-10">
              {timeline.map((t, i) => (
                <div key={t.year} className="flex gap-8 items-start pl-0">
                  <div
                    className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 border-2"
                    style={{
                      background: i === timeline.length - 1
                        ? `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})`
                        : C.white,
                      borderColor: C.primary,
                      color: i === timeline.length - 1 ? C.white : C.primary,
                    }}
                  >
                    {t.year}
                  </div>
                  <div className="pt-4">
                    <p className="text-base leading-relaxed" style={{ color: C.text }}>{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── TEAM ── */}
      {/* <section className="py-20 px-6" style={{ backgroundColor: C.white }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-semibold mb-3" style={{ color: C.primary }}>The Humans Behind It</p>
            <h2 className="text-4xl font-bold" style={{ color: C.text }}>Meet the Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="p-7 rounded-2xl border text-center transition-all duration-300"
                style={{ borderColor: C.border, backgroundColor: C.bg }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.primary;
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(28,128,121,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl text-white mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})` }}
                >
                  {m.initial}
                </div>
                <p className="font-bold text-sm mb-1" style={{ color: C.text }}>{m.name}</p>
                <p className="text-xs" style={{ color: C.textMuted }}>{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ── */}
      <section
        className="py-20 px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${C.bgGradStart} 0%, ${C.bgGradEnd} 100%)` }}
      >
        <VectorBg />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: C.text }}>
            Ready to shop differently?
          </h2>
          {/* <p className="text-base mb-8" style={{ color: C.textMuted }}>
            Join 50,000+ people who think before they buy.
          </p> */}
          <br></br>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/all-products"
              className="flex items-center gap-2 justify-center px-8 py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 text-white"
              style={{
                background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})`,
                boxShadow: "0 4px 20px rgba(28,128,121,0.35)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(28,128,121,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(28,128,121,0.35)";
              }}
            >
              Explore Products <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 justify-center px-8 py-4 rounded-xl font-semibold text-sm tracking-widest uppercase transition-all duration-300 border-2"
              style={{ borderColor: C.primary, color: C.primary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = C.primary;
                e.currentTarget.style.color = C.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = C.primary;
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}