import React, { useState } from 'react';
import FAQ from '../../Compound/FAQ/FAQ';
import { faqInvestorData, faqInvesteeData } from '../../../Constant/constants'; // Assuming you have separate FAQ data for investor and investee

const FAQPage = () => {
    const [activeTab, setActiveTab] = useState('investor');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className='w-full flex justify-center items-start mt-8 mb-24'>
            <div className='w-11/12 md:w-4/5 flex flex-col justify-between items-stretch gap-12'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-4xl font-bold text-primary'>Frequently Asked Questions</h1>
                    <p className='text-md'>If you can’t find the answer you are looking for here, please <span className='text-primary font-bold'>contact us</span></p>
                </div>
                <div className="flex justify-center gap-4">
                    <button
                        className={`text-lg px-4 py-2 border border-primary rounded-lg ${activeTab === 'investor' ? 'bg-primary text-white' : 'text-primary'}`}
                        onClick={() => handleTabChange('investor')}
                    >
                        Investor FAQs
                    </button>
                    <button
                        className={`text-lg px-4 py-2 border border-primary rounded-lg ${activeTab === 'investee' ? 'bg-primary text-white' : 'text-primary'}`}
                        onClick={() => handleTabChange('investee')}
                    >
                        Investee FAQs
                    </button>
                </div>
                <FAQ faqData={activeTab === 'investor' ? faqInvestorData : faqInvesteeData} />
            </div>
        </div>
    )
}

export default FAQPage;
