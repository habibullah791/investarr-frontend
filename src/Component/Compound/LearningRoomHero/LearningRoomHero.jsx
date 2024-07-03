import React from 'react';
import { Link } from 'react-router-dom';

const LearningRoomHero = ({ headerText, subHeaderText, buttonText, buttonLink, imageUrl }) => {
    return (
        <header className="flex flex-col items-center justify-center py-16 space-y-8 bg-primary-background">
            <div className="w-4/5 flex flex-row items-center justify-between gap-8">
                <div className="w-1/2 flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            {headerText}
                        </h1>
                        <p className='text-gray-600 text-lg'>
                            {subHeaderText}
                        </p>
                    </div>
                    <Link
                        to={buttonLink}
                        className='w-1/4 bg-primary text-white py-2 px-6 rounded-lg hover:text-primary hover:bg-white hover:border hover:border-primary'
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
                    className="w-4/5 h-auto rounded-lg shadow-lg lg:w-2/5"
                />
            </div>
        </header>
    );
};

export default LearningRoomHero;
