import React from 'react';

const StatsSection = () => {
    const stats = [
        {
            investors: 30000,
            text: 'Investors',
            label: '+'
        },
        {
            invested: 500,
            text: 'Invested',
            label: '+ Million'
        },
        {
            investees: 100,
            text: 'Performance',
            label: '%'
        }
    ];

    return (
        <div className='w-full flex justify-center items-start my-8'>
            <div className='w-11/12 md:w-4/5 flex flex-col md:flex-row lg:flex-row justify-between items-stretch gap-8'>
                {stats.map((stat, index) => (
                    <div key={index} className="w-full sm:w-[45%] md:w-[30%] lg:w-[30%] flex flex-col p-8 md:p-4 gap-2 border border-primary rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-primary group">
                        <h1 className="tracking-tighter text-4xl md:text-4xl lg:text-4xl font-bold text-primary group-hover:text-white">
                            {stat.investors || stat.invested || stat.investees}{stat.label}
                        </h1>
                        <p className='text-text_primary text-3xl md:text-2xl font-semibold group-hover:text-white'>
                            {stat.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StatsSection;
