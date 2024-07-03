import React from 'react';
import { Link } from 'react-router-dom';

const LearningRoomHero = ({ headerText, subHeaderText, buttonText, buttonLink, imageUrl }) => {
    return (
        <header className="flex flex-col items-center justify-center py-16 space-y-8 bg-primary-background">
            <div className="w-11/12 flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:w-4/5">
                <div className="w-full flex flex-col justify-center space-y-4 md:w-1/2">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                            {headerText}
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            {subHeaderText}
                        </p>
                    </div>
                    <Link
                        to={buttonLink}
                        className='w-full bg-primary text-white py-2 px-6 rounded-lg text-center md:w-1/4 hover:text-primary hover:bg-white hover:border hover:border-primary'
                        prefetch={false}
                    >
                        {buttonText}
                    </Link>
                </div>
                <img
                    src={imageUrl}
                    width="550"
                    height="550"
                    alt="Hero"
                    className="w-full h-auto rounded-lg shadow-lg md:w-2/5 lg:w-2/5"
                />
            </div>
        </header>
    );
};

export default LearningRoomHero;
