import React, { useState } from 'react';

import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";



const FAQ = ({ faqData }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = index => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (

        <div className="space-y-4">
            {faqData.map((faq, index) => (
                <div key={index}
                >
                    <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full px-4 py-6 text-left flex justify-between items-center focus:outline-none border-b border-gray-300"
                    >
                        <span className="text-2xl">{faq.question}</span>
                        <span className='text-xl font-semibold'>{activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                    </button>
                    {activeIndex === index && (
                        <div className="px-4 py-5 text-xl bg-gray-50">
                            <p>{faq.answer}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>

    );
};

export default FAQ;
