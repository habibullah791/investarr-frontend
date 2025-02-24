import React, { useEffect, useState } from "react";

import HeroSection from "../../Compound/HeroSection/HeroSection";
import StatsSection from "../../Molecule/StatsSection/StatsSection";
import WhoWeAreSection from "../../Molecule/WhoWeAreSection/WhoWeAreSection";
import AboutCard from "../../Compound/AboutCard/AboutCard";
import HowDoesItWork from "../../Molecule/HowDoesItWork/HowDoesItWork";
import FindServices from "../../Molecule/FindServices/FindServices";
import PerksCard from "../../Compound/PerksCard/PerksCard";
import FAQ from "../../Compound/FAQ/FAQ";
import Spinner from "../../Atom/Spinner/Spinner";

import HeroBanner from "../../../Assets/Banners/HeroBanner_1.png";

import { fetchInvestorData, fetchInvesteeData } from "../../../api/User/User";
import { faqData } from '../../../Constant/constants';
import CallToAction from "../../Compound/CallToAction/CallToAction";
import ServicesSection from "../../Molecule/ServicesSection/ServicesSection";

const HomePage = () => {
    const [investorData, setInvestorData] = useState(null);
    const [investeeData, setInvesteeData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [investorResponse, investeeResponse] = await Promise.all([
                    fetchInvestorData(),
                    fetchInvesteeData()
                ]);
                setLoading(false);

                setInvestorData(investorResponse);
                setInvesteeData(investeeResponse);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Spinner />

    return (
        <>
            <HeroSection
                title={
                    <>
                        Shape your Portfolio <br />for the
                        best returns <br />with Investarr
                    </>
                }
                description="We help you invest in the best companies in the world. Our platform is designed to help you grow your wealth. We offer a wide range of investment options to help you achieve your financial goals."
                createAccountText="Create Account"
                learnMoreText="Learn More"
                onCreateAccount={() => console.log("Create Account Clicked")}
                onLearnMore={() => console.log("Learn More Clicked")}
                imageSrc={HeroBanner}
            />
            <StatsSection />
            <WhoWeAreSection />
            <AboutCard />
            {error ?
                <div
                    className="w-full flex justify-center items-center h-96"
                >Error While Fetching Data</div>
                :
                <FindServices investorData={investorData} investeeData={investeeData} />
            }
            <ServicesSection />
            <HowDoesItWork />
            <CallToAction />
            <PerksCard />
            <div className="w-full flex justify-center py-20">
                <div className="w-4/5">
                    <div className="text-text_primary text-4xl mb-6 text-center">
                        An easy
                        {` `}
                        <span className="text-primary font-bold">
                            FAQ
                        </span>
                        {` `}
                        for <br />
                        your reference
                    </div>
                    <FAQ
                        faqData={faqData}
                    />
                </div>
            </div>
        </>
    );
};

export default HomePage;
