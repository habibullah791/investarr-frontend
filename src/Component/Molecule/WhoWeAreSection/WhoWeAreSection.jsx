import React from 'react'


import ImageCard from "../../Compound/ImageCard/ImageCard";
import WhoWeAre_1 from '../../../Assets/WhoWeAre_1.jpg';
import WhoWeAre_2 from '../../../Assets/WhoWeAre_2.jpg';


const WhoWeAreSection = () => {

    return (
        <div className='w-full flex justify-center items-start py-32'>
            <div className='w-11/12 md:w-4/5 flex flex-wrap justify-center items-cenrer'>
                {/* there will he a eading and the para */}
                <div className='flex flex-col items-center justify-center text-center pb-16'>
                    <h1 className='text-4xl text-primary font-bold'>Who we are</h1>
                    <p className='text-gray-600 text-lg'>We are a group of individuals who are passionate about making a difference in the world of startups and investments. We believe that the right idea can change the world and we are here to help you find the right idea and invest in it.</p>
                </div>
                <ImageCard
                    imgUrl={WhoWeAre_1}
                    heading="Invest in the future"
                    desc="An investment is an asset or item acquired to generate income or gain appreciation. Appreciation is the increase in the value of an asset over time. It requires the outlay of a resource today, like time, effort, and money for a greater payoff in the future, generating a profit. An investment is an asset or item acquired to generate income or gain appreciation. Appreciation is the increase in the value of an asset over time. It requires the outlay of a resource today, like time, effort, and money for a greater payoff in the future, generating a profit."
                    classes='flex-row'
                />
                <ImageCard
                    imgUrl={WhoWeAre_2}
                    heading="Join the community"
                    desc="An investment is an asset or item acquired to generate income or gain appreciation. Appreciation is the increase in the value of an asset over time. It requires the outlay of a resource today, like time, effort, and money for a greater payoff in the future, generating a profit. An investment is an asset or item acquired to generate income or gain appreciation. Appreciation is the increase in the value of an asset over time. It requires the outlay of a resource today, like time, effort, and money for a greater payoff in the future, generating a profit."
                    classes='flex-row-reverse'
                />
            </div>
        </div>
    )
}

export default WhoWeAreSection