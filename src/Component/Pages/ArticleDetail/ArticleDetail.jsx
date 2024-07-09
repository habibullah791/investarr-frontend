import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticleById } from '../../../api/Articles/Articles';
import { selectTokens } from '../../../store/user/userSlice';
import VideoCard from '../../Compound/VideoCard/VideoCard';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const tokens = useSelector(selectTokens);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesResponse = await fetchArticleById(tokens.access, id);
                setArticle(articlesResponse);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                toast.error('Failed to load article');
            }
        };

        fetchData();
    }, [tokens.access, id]);



    return (
        <div className="h-full bg-white shadow-md rounded-md overflow-hidden">
            <div className="relative h-96">
                {article.images && article.images.length > 0 && (
                    <img
                        src={article.images[0].image}
                        alt={article.images[0].caption}
                        className="object-cover w-full h-full"
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white">
                    <h1 className="text-4xl font-bold text-center">{article.title}</h1>
                </div>
            </div>
            <div className="w-full flex justify-center items-start py-20 bg-gray-100">
                <div className="w-11/12 md:w-4/5 flex flex-wrap justify-center items-center">
                    <div className="w-11/12 md:w-full flex flex-col gap-3">
                        <h1 className='text-4xl text-primary font-bold'>{article.title}</h1>
                        <p className="text-gray-600 text-base">{article.description}</p>
                    </div>
                    <hr className="w-full border-1 border-gray-400 my-8" />
                    <div className="w-11/12 md:w-full flex flex-col gap-6">
                        {article.subtopics && article.subtopics.length > 0 && (
                            article.subtopics.map((subtopic, index) => (
                                <div key={index} className="flex md:flex-row flex-col gap-6 items-center">
                                    <div className="w-full md:w-3/5 flex flex-col gap-3">
                                        <h1 className="text-xl text-primary ">{subtopic.title}</h1>
                                        <p className="w-11/12 text-gray-600 text-base">{subtopic.description}</p>
                                    </div>
                                    {article.images && article.images.length > index && (
                                        <div className="w-full md:w-2/5 h-full">
                                            <img
                                                src={article.images[index].image}
                                                alt={article.images[index].caption}
                                                className="w-full h-56 object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                    <hr className="w-full border-1 border-gray-400 my-8" />
                    <div className="w-11/12 md:w-full flex flex-col gap-6">
                        <div className="w-full flex md:flex-row flex-col">
                            {article.videos && article.videos.length > 0 && (
                                article.videos.map((video, index) => (
                                    <>
                                        <h1 className="text-2xl text-primary font-bold">Some Videos Related to {article.title}</h1>
                                        <VideoCard key={index} video={video} />
                                    </>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
