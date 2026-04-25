import { Clock, Brain, Link as LinkIcon, PenTool, Unlock } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            num: 1,
            badge: "Mechanical",
            title: "Wait 48 hours",
            desc: "Item locks in your queue. The countdown begins. No skipping.",
            icon: Clock
        },
        {
            num: 2,
            badge: "Cognitive",
            title: "Read & reflect",
            desc: "AI generates real pros and cons. You must read before moving on.",
            icon: Brain
        },
        {
            num: 3,
            badge: "Social",
            title: "Share with 5",
            desc: "Send to 5 friends. If it's worth buying, it's worth sharing.",
            icon: LinkIcon
        },
        {
            num: 4,
            badge: "Creative",
            title: "Make your case",
            desc: "Write 50+ words justifying the purchase. Convince yourself first.",
            icon: PenTool
        }
    ];

    return (
        <div className="mb-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="text-center max-w-2xl mx-auto mb-20 fade-in">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">How Vebe<span className="text-[#1c8079]">Kino</span> works</h2>
                    <p className="text-gray-500 text-lg md:text-xl font-medium">Every purchase passes through 4 friction gates. No shortcuts.</p>
                </div>

                <div className="relative mb-20">
                    <div className="hidden md:block absolute top-[48px] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-[#2fe0cb] opacity-40 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                        {steps.map((step, idx) => {
                            const Icon = step.icon;
                            return (
                                <div key={idx} className="flex flex-col items-center text-center relative group">
                                    {/* Icon Circle */}
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 rounded-full bg-white border-[3px] border-[#2fe0cb]/30 flex items-center justify-center shadow-sm transition-all duration-500 ease-out group-hover:scale-110 group-hover:border-[#2fe0cb] group-hover:shadow-[0_0_25px_rgba(47,224,203,0.4)]">
                                            <Icon className="w-10 h-10 text-[#1c8079] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                                        </div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#2fe0cb] to-[#1c8079] text-white flex items-center justify-center font-bold shadow-md ring-4 ring-white">
                                            {step.num}
                                        </div>
                                    </div>
                                    
                                    <div className="px-5 py-1.5 rounded-full bg-[#2fe0cb]/10 text-[#1c8079] text-xs font-bold uppercase tracking-wider mb-5 transition-colors duration-300 group-hover:bg-[#1c8079] group-hover:text-white">
                                        {step.badge}
                                    </div>

                                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#1c8079] transition-colors duration-300">{step.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-[240px] px-2">{step.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto border-t-2 border-dashed border-gray-200 pt-10">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                        <div className="p-4 bg-[#2fe0cb] rounded-2xl shrink-0">
                            <Unlock className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">Purchase unlocked — <span className="text-gray-500 font-medium">if you still want it</span></h4>
                            <p className="text-gray-500">Most people who make it here genuinely need what they're buying.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;