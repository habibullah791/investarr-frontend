import React from 'react';

import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const ArticleCard = ({ article }) => {
    const firstImage = article.images.length > 0 ? article.images[0] : null;

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 p-4 my-6">
            <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
                {firstImage && firstImage.image && (
                    <img
                        src={firstImage.image}
                        alt={firstImage.caption ? firstImage.caption : 'Article Image'}
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                )}
                <div className='py-4 px-2 flex flex-col justify-between flex-1'>
                    <div>
                        <h2 className="text-lg font-semibold mb-2 h-14 overflow-hidden">{article.title}</h2>
                        <p className="text-sm text-gray-700 mb-4">{(article.previewText).slice(0, 180)}...</p>
                    </div>
                    <Link
                        to={`/article/${article.id}`} // Link to the dynamic article detail route
                        // to={`/article/${article.id}`}
                        className="flex items-center text-primary hover:text-primary-dark"
                    >
                        Read More <FaArrowRightLong className="ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
