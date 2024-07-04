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

import HeroBanner_1 from "../../../Assets/HeroBanner_1.png";

import { fetchInvestorData, fetchInvesteeData } from "../../../api/User/User";
import { faqData } from '../../../Constant/constants'
import CallToAction from "../../Compound/CallToAction/CallToAction";



const HomePage = () => {
    const [investorData, setInvestorData] = useState(null);
    const [investeeData, setInvesteeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const investorResponse = await fetchInvestorData();
                setInvestorData(investorResponse);

                const investeeResponse = await fetchInvesteeData();
                setInvesteeData(investeeResponse);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Spinner />;

    return (
        <>
            <HeroSection
                title={
                    <>
                        Shape your <span className="text-text_primary font-bold">Portfolio</span> for the{" "}
                        <span className="font-bold text-primary">best returns</span>
                        <br />
                        with Investarr
                    </>
                }
                description="We help you invest in the best companies in the world. Our platform is designed to help you grow your wealth. We offer a wide range of investment options to help you achieve your financial goals."
                createAccountText="Create Account"
                learnMoreText="Learn More"
                onCreateAccount={() => console.log("Create Account Clicked")}
                onLearnMore={() => console.log("Learn More Clicked")}
                imageSrc={HeroBanner_1}
            />
            <StatsSection />
            <WhoWeAreSection />
            <AboutCard />
            <FindServices investorData={investorData} investeeData={investeeData} />
            <CallToAction />
            <HowDoesItWork />
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
