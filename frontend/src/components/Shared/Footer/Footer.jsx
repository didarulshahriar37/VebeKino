import { Link } from "react-router";

function Footer() {
  const navLinks = [{
    name: "Home",
    href: "/"
  }, {
    name: "Contact",
    href: "/contact"
  },{
    name: "About Us",
    href: "/about-us"
  }];
  const socialIcons = [{
    name: "Facebook",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
        </svg>
  }, {
    name: "Instagram",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
        </svg>
  }, {
    name: "WhatsApp",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.85-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.79.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"></path>
        </svg>
  }, {
    name: "Gmail",
    href: "#",
    svg: <svg className="size-6 transition-transform duration-200 hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4l-8 5l-8-5V6l8 5l8-5z"></path>
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
                <Link
                  to={link.href}
                  className="text-black hover:text-[#1c8079] transition-all duration-300 relative after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-[#1c8079] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
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