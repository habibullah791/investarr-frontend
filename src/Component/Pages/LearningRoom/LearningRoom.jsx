import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

import LearningRoomHero from '../../Compound/LearningRoomHero/LearningRoomHero';
import FeatureArticleSection from '../../Molecule/FeatureArticleSection/FeatureArticleSection';
import FeatureVideoSection from '../../Molecule/FeatureVideoSection/FeatureVideoSection';
import Spinner from '../../Atom/Spinner/Spinner';
import Image from '../../../Assets/WhoWeAre_1.jpg';

import { fetchArticles } from "../../../api/Articles/Articles";
import { selectTokens } from '../../../store/user/userSlice';



const LearningRoom = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const tokens = useSelector(selectTokens);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const articlesResponse = await fetchArticles(tokens.access);
                setArticles(articlesResponse.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
                toast.error('Failed to load articles');
            }
        };

        fetchData();
    }, [tokens.access]);

    if (loading) return <Spinner />;

    return (
        <>
            <div>
                <LearningRoomHero
                    headerText="Learn and Grow with Our Resources"
                    subHeaderText="Explore our collection of articles, videos, and more to help you navigate the world of investing and entrepreneurship."
                    buttonText="Get Started"
                    buttonLink="/get-started"
                    imageUrl={Image}
                />
                <FeatureArticleSection articles={articles ? articles.slice(0, 3) : []} />
                <FeatureVideoSection articles={articles} />
            </div>
        </>
    );
};

export default LearningRoom;
