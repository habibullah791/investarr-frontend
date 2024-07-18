import React from "react";

const ImageCard = ({ imgUrl, heading, desc, classes }) => {
    return (
        <section className="flex flex-col items-center justify-center md:mb-0 mb-6">
            <div className={`flex flex-col md:flex ${classes === 'flex-row' ? 'md:flex-row' : ''} ${classes === 'flex-row-reverse' ? 'md:flex-row-reverse' : ''} justify-center md:gap-0 gap-6`}>
                <div className={`w-full md:w-1/2 flex flex-col gap-3 ${classes === 'flex-row-reverse' ? 'md:pl-10 md:pt-10' : ''}`}>
                    <h3 className="text-primary text-2xl">{heading}</h3>
                    <p className="md:text-md text-md md:pr-16">{desc}</p>
                    <button className="w-full md:w-1/3 bg-white text-primary py-2 px-6 border border-primary rounded-lg hover:text-white hover:bg-primary hover:border hover:border-primary">Learn More</button>
                </div>
                <div className="w-full md:w-1/2 h-full">
                    <img
                        src={imgUrl}
                        alt="destination"
                        className="w-full h-96 object-cover"
                    />
                </div>
            </div>
        </section>
    );
}

export default ImageCard;
