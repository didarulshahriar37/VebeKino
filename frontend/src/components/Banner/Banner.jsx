import placeholder from "../../assets/Placeholder.jpg"

const Banner = () => {
    return (
        <div className="bg-orange-300">
            <div className="flex items-center justify-between px-16">
                <div>
                    TITLE 1
                    TITLE 2
                    TITLE 3
                </div>
                <div>
                    <img src={placeholder} height={12} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Banner;