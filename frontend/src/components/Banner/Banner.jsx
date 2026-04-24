import { Link } from "react-router";
import placeholder from "../../assets/Placeholder.jpg"
import { ArrowRight } from "lucide-react";

const Banner = () => {
    return (
        <div className="bg-orange-300 mt-14 sm:mt-16 lg:mt-20 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]">
            <div className="flex items-center justify-between px-16 h-full">
                <div className="space-y-12">
                    <p className="text-2xl md:text-7xl font-bold">Think<br />
                        Wait<br />
                        Earn it</p>
                    <div className="text-lg md:text-xl">
                        Because not everything you want, you need. Make every purchase mean something.
                    </div>
                    <Link to={"all-products"} className="bg-black text-white px-6 py-4 transition-colors flex items-center rounded-lg w-fit">
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