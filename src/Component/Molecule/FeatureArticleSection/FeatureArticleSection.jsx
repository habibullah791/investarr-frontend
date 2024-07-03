import React from 'react';

import ArticleCard from '../../Compound/ArticleCard/ArticleCard';

const FeatureArticleSection = ({ articles }) => {

    return (
        <div className="w-full flex justify-center items-start py-20 bg-gray-100">
            <div className="w-11/12 md:w-4/5 flex flex-wrap justify-center items-center">
                <div className="w-full flex flex-col items-center">
                    <h1 className="text-4xl text-primary font-bold">Featured Articles</h1>
                    <p className="w-3/4 text-gray-600 text-lg">Explore our collection of insightful articles on investment strategies, market trends, and more.</p>
                </div>
                <div className="w-full flex flex-wrap justify-center">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeatureArticleSection;
