import { Link } from "react-router";
import placeholder from "../../assets/Placeholder.jpg"
import { ArrowRight } from "lucide-react";

const Banner = () => {
    return (
        <div className="relative bg-gradient-to-r from-[#2fe0cb]/20 via-[#1c8079]/20 to-[#2fe0cb]/20 mt-14 sm:mt-16 lg:mt-20 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] overflow-hidden">

            {/* ── Vector Background ── */}
            <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 1440 900"
            >
                <defs>
                    <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#1c8079" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#1c8079" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="orb2" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#2fe0cb" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#2fe0cb" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="orb3" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#23a898" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#23a898" stopOpacity="0" />
                    </radialGradient>
                    <filter id="blur1">
                        <feGaussianBlur stdDeviation="8" />
                    </filter>
                </defs>

                <ellipse cx="200" cy="150" rx="350" ry="280" fill="url(#orb1)" />
                <ellipse cx="1280" cy="700" rx="400" ry="320" fill="url(#orb2)" />
                <ellipse cx="900" cy="400" rx="300" ry="260" fill="url(#orb3)" />

                <path
                    d="M0,320 C180,260 360,380 540,300 C720,220 900,340 1080,280 C1260,220 1380,300 1440,260 L1440,0 L0,0 Z"
                    fill="#1c8079" fillOpacity="0.06"
                />
                <path
                    d="M0,500 C200,440 400,560 620,480 C840,400 1000,520 1200,460 C1350,415 1420,470 1440,450 L1440,900 L0,900 Z"
                    fill="#2fe0cb" fillOpacity="0.07"
                />
                <path
                    d="M0,680 C240,620 480,740 720,660 C960,580 1200,680 1440,620 L1440,900 L0,900 Z"
                    fill="#1c8079" fillOpacity="0.05"
                />

                <circle cx="120" cy="760" r="140" fill="none" stroke="#1c8079" strokeWidth="1.5" strokeOpacity="0.18" />
                <circle cx="120" cy="760" r="100" fill="none" stroke="#2fe0cb" strokeWidth="1" strokeOpacity="0.12" />
                <circle cx="1340" cy="120" r="160" fill="none" stroke="#1c8079" strokeWidth="1.5" strokeOpacity="0.15" />
                <circle cx="1340" cy="120" r="110" fill="none" stroke="#2fe0cb" strokeWidth="1" strokeOpacity="0.1" />
                <circle cx="720" cy="820" r="90" fill="none" stroke="#23a898" strokeWidth="1" strokeOpacity="0.12" />

                <circle cx="80" cy="200" r="14" fill="#1c8079" fillOpacity="0.2" />
                <circle cx="340" cy="80" r="8" fill="#2fe0cb" fillOpacity="0.3" />
                <circle cx="620" cy="140" r="5" fill="#1c8079" fillOpacity="0.25" />
                <circle cx="1100" cy="80" r="10" fill="#2fe0cb" fillOpacity="0.2" />
                <circle cx="1400" cy="350" r="16" fill="#1c8079" fillOpacity="0.18" />
                <circle cx="1050" cy="820" r="12" fill="#2fe0cb" fillOpacity="0.22" />
                <circle cx="200" cy="680" r="7" fill="#23a898" fillOpacity="0.28" />
                <circle cx="480" cy="820" r="9" fill="#1c8079" fillOpacity="0.2" />

                {[...Array(10)].map((_, col) =>
                    [...Array(7)].map((_, row) => (
                        <circle
                            key={`${col}-${row}`}
                            cx={80 + col * 140}
                            cy={80 + row * 120}
                            r="2"
                            fill="#1c8079"
                            fillOpacity="0.12"
                        />
                    ))
                )}

                <line x1="0" y1="900" x2="400" y2="400" stroke="#1c8079" strokeWidth="1" strokeOpacity="0.08" />
                <line x1="1440" y1="0" x2="1000" y2="500" stroke="#2fe0cb" strokeWidth="1" strokeOpacity="0.08" />
                <line x1="600" y1="0" x2="200" y2="500" stroke="#23a898" strokeWidth="0.8" strokeOpacity="0.07" />
            </svg>

            {/* Main Banner Design */}
            <div className="relative z-10 flex items-center justify-between px-16 h-full">
                <div className="space-y-12">
                    <p className="text-2xl md:text-7xl font-bold">Think<br />
                        <span className="text-[#1c8079]">Wait...</span><br />
                        Earn it</p>
                    <div className="text-lg md:text-xl">
                        Because not everything you want, you need. Make every purchase mean something.
                    </div>
                    <Link to={"all-products"} className="bg-gradient-to-r from-[#2fe0cb] to-[#1c8079] text-black font-semibold px-6 py-4 border-2 hover:border-black hover:scale-110 transition-all duration-300 ease-in-out flex items-center rounded-lg w-fit">
                        Explore Products <ArrowRight />
                    </Link>

                </div>
                <div className="h-full overflow-hidden flex items-center">
                    <img src={placeholder} className="max-h-[90%] w-auto object-contain rounded-xl" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;