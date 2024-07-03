import React from 'react';

import HeroBanner from '../../../Assets/about.png';
import HeroSection from '../../Compound/HeroSection/HeroSection';
import FeatureSection from '../../Molecule/FeatureSection/FeatureSection';

import { featuresSectionData, InvestmentTeamSectionData, TestimonialSectionData } from '../../../Constant/constants';
import InvestmentSection from '../../Molecule/InvestmentSection/InvestmentSection';
import TestimonialSection from '../../Molecule/TestimonialSection/TestimonialSection';

const AboutPage = () => {

    return (
        <>
            <HeroSection
                title={
                    <>
                        <span className="font-semibold">Empowering Investors, Transforming Futures</span>
                    </>
                }
                description="Acme Investments is a leading investment platform dedicated to connecting investors with promising opportunities and empowering businesses to thrive. Our mission is to create sustainable growth and financial security for all."
                createAccountText="Create Account"
                learnMoreText="Learn More"
                onCreateAccount={() => console.log('Create Account Clicked')}
                onLearnMore={() => console.log('Learn More Clicked')}
                imageSrc={HeroBanner}
            />
            <FeatureSection featuresSectionData={featuresSectionData} />
            <InvestmentSection investmentTeamSectionData={InvestmentTeamSectionData} />
            <TestimonialSection testimonialSectionData={TestimonialSectionData} />

        </>
    );
}

export default AboutPage;
