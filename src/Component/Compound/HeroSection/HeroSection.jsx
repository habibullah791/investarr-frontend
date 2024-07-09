import React from 'react';

const HeroSection = ({
    title,
    description,
    createAccountText,
    learnMoreText,
    onCreateAccount,
    onLearnMore,
    imageSrc
}) => {
    return (
        <div className='w-full flex justify-center items-start my-16'>
            <div className='w-11/12 lg:w-4/5 flex flex-col lg:flex-row justify-between items-center gap-12'>
                <div className='w-full lg:w-3/5 flex flex-col justify-start items-start mb-8 lg:mb-0'>
                    {/* <h1 className='text-text_primary text-4xl md:text-5xl lg:text-6xl leading-none'> */}
                    <h1 className="text-text_primary text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                        {title}
                    </h1>
                    <p className='text-gray-600 text-lg mb-4'>
                        {description}
                    </p>
                    <div className='flex flex-col md:flex-row gap-4 mt-4'>
                        <button
                            className='bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border hover:border-primary'
                            onClick={onCreateAccount}
                        >
                            {createAccountText}
                        </button>
                        <button
                            className='bg-white text-primary py-2 px-6 border border-primary rounded-lg hover:text-white hover:bg-primary hover:border hover:border-primary'
                            onClick={onLearnMore}
                        >
                            {learnMoreText}
                        </button>
                    </div>
                </div>
                <div className='w-full lg:w-2/5 flex justify-center mt-5 lg:mt-0'>
                    <img
                        src={imageSrc}
                        alt='banner'
                        className='w-11/12 lg:w-4/5 h-auto'
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
