import { Handshake, Target, Wallet } from "lucide-react";

const WhyVebeKino = () => {
    return (
        <div className="mt-40 mb-40 py-20 bg-gradient-to-r from-[#2fe0cb]/70 via-[#1c8079]/70 to-[#2fe0cb]/70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-14 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 place-items-center">
                <div className="flex flex-col items-center justify-center space-y-5 text-center">
                    <div className="p-5 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:bg-white/40 hover:-translate-y-2 hover:shadow-xl hover:text-gray-900">
                        <Target />
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">Buy with intention</p>
                        <p className="text-2xl text-gray-800">not impulse</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-5">
                    <div className="p-5 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:bg-white/40 hover:-translate-y-2 hover:shadow-xl hover:text-gray-900">
                            <Wallet />
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">Save more money</p>
                        <p className="text-2xl text-gray-800">friction filters out regret purchases</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center space-y-5">
                    <div className="p-5 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ease-out hover:scale-110 hover:bg-white/40 hover:-translate-y-2 hover:shadow-xl hover:text-gray-900">
                            <Handshake />
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold">Accountable Shopping</p>
                        <p className="text-2xl text-gray-800">If it's worth it, it's worth sharing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyVebeKino;