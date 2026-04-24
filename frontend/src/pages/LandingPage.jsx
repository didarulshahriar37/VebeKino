import Banner from "../components/Banner/Banner";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import PopularProducts from "../components/Popular Products/PopularProducts";
import WhyVebeKino from "../components/Why VebeKino/WhyVebeKino";

const LandingPage = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularProducts></PopularProducts>
            <WhyVebeKino></WhyVebeKino>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default LandingPage;