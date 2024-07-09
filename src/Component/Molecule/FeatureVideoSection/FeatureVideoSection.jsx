import React from 'react';
import VideoCard from '../../Compound/VideoCard/VideoCard';
import { getRandomVideos } from '../../../utils/utilityFunctions';

const FeatureVideoSection = ({ articles }) => {
    const randomVideos = getRandomVideos(articles);

    if (randomVideos.length === 0) {
        return null;
    }

    return (
        <div className="w-full flex justify-center items-start py-20">
            <div className="w-11/12 md:w-4/5 flex flex-wrap justify-center items-stretch">
                <div className="w-full flex flex-col items-center mb-12">
                    <h1 className="text-4xl text-primary font-bold">Featured Videos</h1>
                    <p className="w-3/4 text-gray-600 text-lg">
                        Explore our collection of insightful videos on investment strategies, market trends, and more.
                    </p>
                </div>
                {randomVideos.map((video) => (
                    video && <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
};

export default FeatureVideoSection;
