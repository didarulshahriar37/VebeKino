import SEO from "../components/Shared/SEO";
import Banner from "../components/Banner/Banner";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import PopularProducts from "../components/Popular Products/PopularProducts";
import WhyVebeKino from "../components/Why VebeKino/WhyVebeKino";

const LandingPage = () => {
    return (
        <div className="bg-[#f0fafa] min-h-screen">
            <SEO 
                title="Home" 
                description="Experience the future of mindful shopping with VebeKino. Our Anti-Impulse system helps you save money and buy with intention." 
            />
            <Banner></Banner>
            <PopularProducts></PopularProducts>
            <WhyVebeKino></WhyVebeKino>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default LandingPage;