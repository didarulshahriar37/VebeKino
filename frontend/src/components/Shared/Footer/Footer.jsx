function Footer() {
  const navLinks = [{
    name: "Features",
    href: "#"
  }, {
    name: "Solution",
    href: "#"
  }, {
    name: "Customers",
    href: "#"
  }, {
    name: "Pricing",
    href: "#"
  }, {
    name: "Help",
    href: "#"
  }, {
    name: "About",
    href: "#"
  }];
  const socialIcons = [{
    name: "X",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
        </svg>
  }, {
    name: "LinkedIn",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
        </svg>
  }, {
    name: "Facebook",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
        </svg>
  }, {
    name: "Threads",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 8.505c-1.577-5.867-7-5.5-7-5.5s-7.5-.5-7.5 8.995s7.5 8.996 7.5 8.996s4.458.296 6.5-3.918c.667-1.858.5-5.573-6-5.573c0 0-3 0-3 2.5c0 .976 1 2 2.5 2s3.171-1.027 3.5-3c1-6-4.5-6.5-6-4"></path>
        </svg>
  }, {
    name: "Instagram",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
        </svg>
  }, {
    name: "TikTok",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"></path>
        </svg>
  }];

  return (
    <footer className="relative overflow-hidden bg-[#1c8079]/30 py-12 px-4 sm:px-6 lg:px-8 font-inter">

      {/* SVG Decoration Layer */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 300"
      >
        <defs>
          <radialGradient id="fg-orb1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1c8079" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="fg-orb2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path
          d="M0,60 C240,0 480,100 720,50 C960,0 1200,80 1440,40 L1440,0 L0,0 Z"
          fill="#1c8079" fillOpacity="0.08"
        />
        <path
          d="M0,90 C300,20 600,120 900,70 C1150,25 1320,90 1440,65 L1440,0 L0,0 Z"
          fill="#2fe0cb" fillOpacity="0.05"
        />

        <path
          d="M0,240 C360,200 720,270 1080,230 C1260,210 1380,250 1440,240 L1440,300 L0,300 Z"
          fill="#1c8079" fillOpacity="0.06"
        />

        <ellipse cx="100"  cy="60"  rx="200" ry="160" fill="url(#fg-orb1)" />
        <ellipse cx="1350" cy="250" rx="220" ry="180" fill="url(#fg-orb2)" />
        <ellipse cx="720"  cy="290" rx="180" ry="120" fill="url(#fg-orb1)" />

        <circle cx="60"   cy="270" r="100" fill="none" stroke="#1c8079" strokeWidth="1"   strokeOpacity="0.12" />
        <circle cx="60"   cy="270" r="70"  fill="none" stroke="#2fe0cb" strokeWidth="0.8" strokeOpacity="0.08" />
        <circle cx="1390" cy="40"  r="120" fill="none" stroke="#1c8079" strokeWidth="1"   strokeOpacity="0.1"  />
        <circle cx="1390" cy="40"  r="80"  fill="none" stroke="#2fe0cb" strokeWidth="0.8" strokeOpacity="0.07" />

        <circle cx="200"  cy="30"  r="4" fill="#1c8079" fillOpacity="0.25" />
        <circle cx="480"  cy="15"  r="3" fill="#2fe0cb" fillOpacity="0.3"  />
        <circle cx="960"  cy="25"  r="3" fill="#1c8079" fillOpacity="0.22" />
        <circle cx="1240" cy="10"  r="4" fill="#2fe0cb" fillOpacity="0.2"  />
        <circle cx="380"  cy="260" r="5" fill="#23a898" fillOpacity="0.2"  />
        <circle cx="1060" cy="275" r="4" fill="#1c8079" fillOpacity="0.18" />

        <line x1="0"    y1="300" x2="300"  y2="100" stroke="#1c8079" strokeWidth="0.8" strokeOpacity="0.07" />
        <line x1="1440" y1="0"   x2="1100" y2="200" stroke="#2fe0cb" strokeWidth="0.8" strokeOpacity="0.07" />
      </svg>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">

        <div className="mb-6 flex items-center justify-center">
          <span className="text-3xl font-extrabold tracking-wide">
            <span>Vebe</span>
            <span className="text-[#1c8079]">Kino</span>
          </span>
        </div>

        <nav className="mb-6 w-full">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-base font-medium">
            {navLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-black hover:text-[#1c8079] transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#1c8079] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#1c8079]/60 to-transparent mb-6" />

        <div className="my-2 flex flex-wrap justify-center gap-4">
          {socialIcons.map(icon => (
            <a
              key={icon.name}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={icon.name}
              className="text-black hover:text-[#1c8079] transition-colors duration-300"
              href={icon.href}
            >
              {icon.svg}
            </a>
          ))}
        </div>

        <p className="text-center text-xs text-black mt-6">
          &copy; {new Date().getFullYear()} VebeKino. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;