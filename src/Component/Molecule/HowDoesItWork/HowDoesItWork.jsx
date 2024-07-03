import React from 'react';

const HowDoesItWork = () => {
    const data = [
        {
            title: 'Join',
            description: 'Become a member of Investarrr and unlock endless opportunities. Signing up is quick, easy, and completely free.'
        },
        {
            title: 'Profile',
            description: 'Create a detailed profile to showcase your interests, whether you are a startup founder or an investor. This helps us match you with the best opportunities.'
        },
        {
            title: 'Explore',
            description: 'Discover a variety of startups and investment opportunities. Find ventures that align with your goals and preferences.'
        },
        {
            title: 'Engage',
            description: 'Connect and communicate with other members. Whether you are seeking funding or looking to invest, build meaningful relationships to enhance your journey.'
        },
        {
            title: 'Grow',
            description: 'Achieve your goals with Investarrr. Startups can secure funding and grow, while investors can build a diverse and profitable portfolio.'
        },
        {
            title: 'Support',
            description: 'Need help finding the right match? Contact our support team for personalized assistance and guidance to make the most of Investarrr.'
        }
    ];

    return (
        <div className='w-full flex justify-center items-start py-16 md:py-24'>
            <div className='w-11/12 md:w-4/5'>
                <div className='flex flex-col items-center justify-center text-center pb-16'>
                    <h1 className='text-4xl text-primary font-bold'>How Does It Work</h1>
                    <p className='text-gray-600 text-lg'>We are a group of individuals who are passionate about making a difference in the world of startups and investments. We believe that the right idea can change the world and we are here to help you find the right idea and invest in it.</p>
                </div>
                {data.map((item, index) => (
                    // on hover the border will change to primary color and shadow will appear
                    <div key={index} className='gap-6 gap-5 flex flex-col md:flex-row items-center px-4 py-8 border border-gray-300 rounded-2xl mb-4 hover:shadow-lg transition duration-300 ease-in-out hover:border-primary border-l-4'>
                        <h1 className='w-full md:w-1/5 text-primary text-4xl font-bold'>{item.title}</h1>
                        <p className='w-full md:w-4/5 md:pl-4 text-lg text-left'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HowDoesItWork;
