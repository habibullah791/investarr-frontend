import React from 'react';

import { HiCash } from "react-icons/hi";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoTicketOutline } from "react-icons/io5";


const PerksCard = () => {
    // Data for the perks
    const perksData = [
        {
            icon: HiCash,
            text: "Additional cashback of 0.5%",
            desc: 'More returns on all your Max investments'
        },
        {
            icon: TfiHeadphoneAlt,
            text: "Dedicated Relationship Manager",
            desc: 'A reliable partner for your wealth goals'
        },
        {
            icon: IoTicketOutline,
            text: "Premium Access to Events",
            desc: 'A reliable partner for your wealth goals'
        }
    ];

    return (
        <div className='w-full flex justify-center items-start py-24 bg-quaternary'>
            <div className='w-full md:w-4/5 flex flex-col justify-center items-center text-center gap-6'>
                <div className='w-11/12 md:w-3/4 flex flex-col justify-center items-center text-center gap-6'>
                    <h1 className='text-5xl text-white font-bold px-4'>
                        Investarr
                    </h1>
                    <h3 className='text-lg md:text-2xl text-white px-4'>
                        The big league of investing
                    </h3>
                    <h3 className='text-lg md:text-2xl text-white px-4'>
                        The Elite program is created to recognise and reward long term investors. Being an Elite member gives you the advantage in multiple ways:
                    </h3>
                </div>
                {/* there will be two card in row and they have the icon and the text in row  */}
                <div className='w-[85%] flex md:flex-row flex-col justify-center items-center gap-8 mt-12'>
                    {perksData.map((perk, index) => (
                        <div key={index} className='w-full md:w-1/2 flex md:flex-col flex-row justify-start items-start gap-2 border rounded-2xl md:py-10 py-5 md:px-6 px-3'>
                            <perk.icon className='text-secondary text-7xl rounded-full p-2' />
                            <div>
                                <h2 className='text-white text-sm md:text-2xl font-semibold mt-4 text-left'>
                                    {perk.text}
                                </h2>
                                <p className='text-white text-sm md:text-lg md:mt-4 text-left'>
                                    {perk.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PerksCard;
