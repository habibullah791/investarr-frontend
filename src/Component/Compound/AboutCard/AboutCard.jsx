import React from 'react';
import { AiOutlineStock } from "react-icons/ai";
import { FaCircleArrowDown } from "react-icons/fa6";

const AboutCard = () => {
    return (
        <div className='w-full flex justify-center items-start py-12 md:py-24 bg-quaternary'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-center items-center text-center gap-6'>
                <h1 className='text-3xl md:text-5xl text-white font-bold px-4'>
                    Investarr P2P is your ideal companion in this journey. Here's why:
                </h1>
                {/* there will be two card in row and they have the icon and the text in row  */}
                <div className='w-full flex flex-col md:flex-col lg:flex-row justify-center items-center gap-8 mt-8 md:mt-12'>
                    <div className='w-full md:w-full flex flex-row justify-center items-center gap-4 border rounded-2xl py-6 md:py-10 px-6'>
                        <FaCircleArrowDown
                            className='text-secondary text-5xl md:text-7xl rounded-full p-2'
                        />
                        <div className='text-white text-lg md:text-2xl mt-4 text-center md:text-left'>
                            Fixed deposits are great, <br />
                            <span className='text-xl md:text-3xl font-bold'>but have <span className='text-xl md:text-3xl font-bold text-secondary'>low returns</span></span>
                        </div>
                    </div>
                    <div className='w-full md:w-full flex flex-row justify-center items-center gap-4 border rounded-2xl py-6 md:py-10 px-6'>
                        <AiOutlineStock
                            className='bg-secondary text-quaternary text-4xl md:text-7xl rounded-full py-1 px-2'
                        />
                        <div className='text-white text-lg md:text-2xl mt-4 text-center md:text-left'>
                            Stocks are great too, <br />
                            <span className='text-xl md:text-3xl font-bold'>but have <span className='text-xl md:text-3xl font-bold text-secondary'>high volatility</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutCard;
