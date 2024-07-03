import React from "react";

const VideoCard = ({ video }) => {
    const videoId = video.video_url.split('v=')[1];

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 my-6">
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
                <div className='aspect-w-16 h-44'>
                    <iframe
                        title={video.title}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        allowFullScreen
                        className="rounded-t-lg w-full h-full"
                    ></iframe>
                </div>
                <div className='py-4 px-2 flex-grow flex flex-col justify-between'>
                    <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
                    <a
                        href={video.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline block"
                    >
                        Watch Video
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
