import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa6";
import { IoSparklesOutline, IoRocketOutline } from "react-icons/io5";
import { LuDiamond, LuCrown } from "react-icons/lu";
import LightICon from '../../../Assets/thought.png';

import MembershipModal from '../../Compound/MembershipModal/MembershipModal'


const membershipPlans = [
    {
        name: "Basic",
        icon: IoSparklesOutline,
        price: "$10",
        buttonTitle: "Get Started",
        features: [
            "Basic messaging",
            "Access to investor network",
            "Discounted event tickets",
            "Some information hidden"
        ],
    },
    {
        name: "Standard",
        icon: IoRocketOutline,
        price: "$20",
        buttonTitle: "Get Started",
        features: [
            "All Starter features",
            "Access to all profiles",
            "Personalized investment recommendations",
            "Priority access to investment opportunities",
            "Most information visible"
        ],
    },
    {
        name: "Premium",
        icon: LuCrown,
        price: "$30",
        buttonTitle: "Get Started",
        features: [
            "Access to all profiles",
            "1-on-1 coaching",
            "Exclusive content",
            "Full information visibility"
        ],
    },
    {
        name: "Premium Plus",
        icon: LuDiamond,
        price: "$120",
        buttonTitle: "Customize",
        features: [
            "Access to all profiles",
            "1-on-1 coaching",
            "Exclusive content",
            "Full information visibility"
        ],
    },
];

const benefits = [
    "Connect with potential investors and investees",
    "Access to detailed profiles",
    "Priority support",
    "Exclusive content and resources",
];

const Membership = () => {

    return (
        <div className='w-full flex justify-center items-start my-16'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-center items-center gap-8'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className="tracking-tighter text-center text-4xl font-bold text-primary">Unlock the Power of Our Membership</h1>
                    <p className='text-center'>Join our community of investors and investees to access exclusive resources, networking opportunities, and tailored support.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-4">
                    {membershipPlans.map((plan, index) => (
                        <div key={index} className={`border rounded-lg shadow-lg p-6 flex flex-col items-start ${index === membershipPlans.length - 1 ? 'bg-primary text-white' : ''}`}>
                            <div className='flex flex-row justify-center items-center gap-2 mb-5'>
                                <div className={`rounded-md p-3 flex items-center justify-center ${index === membershipPlans.length - 1 ? 'bg-white' : 'bg-primary'}`}>
                                    <plan.icon className={`w-6 h-6 ${index === membershipPlans.length - 1 ? 'text-primary' : 'text-white'}`} />
                                </div>
                                <h2 className={`tracking-tighter text-primary text-2xl font-semibold ${index === membershipPlans.length - 1 ? 'text-white' : ''}`}>{plan.name}</h2>
                            </div>
                            < p className="text-4xl font-bold" >
                                {plan.price}
                                < span className="text-lg font-normal text-gray-500 dark:text-gray-400" > /month</span >
                            </p>
                            <ul className="text-gray-700 my-4 mb-4">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start space-x-2">
                                        <FaCheck className="h-5 w-5 text-green-500" />
                                        <span className={`${index === membershipPlans.length - 1 ? 'text-white' : ''}`}>{feature}</span>
                                    </div>
                                ))}
                            </ul>
                            <button className={`w-full bg-primary py-2 px-4 rounded mt-auto ${index === membershipPlans.length - 1 ? 'bg-white text-primary' : 'text-white'}`}>{plan.buttonTitle}</button>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-200 rounded-lg w-full flex flex-col md:flex-row justify-center items-center gap-4 py-8 px-4">
                    <img src={LightICon} alt="Light Icon" className="w-24 h-24" />
                    <h2 className="tracking-tighter md:w-3/4 text-center text-2xl font-semibold text-primary">Become a Premium Member and Boost Your Chances of Finding the Right Investment</h2>
                </div>
            </div>
        </div >
    );
};

export default Membership;
