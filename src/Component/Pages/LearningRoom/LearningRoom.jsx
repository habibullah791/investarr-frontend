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
    // const [loading, setLoading] = useState(true);

    const tokens = useSelector(selectTokens);

    const fetchData = async () => {
        try {
            const articlesResponse = await fetchArticles(tokens.access);
            console.log(articlesResponse.data);
            // setLoading(false);
            setArticles(articlesResponse.data);
        } catch (error) {
            // setLoading(false);
            setError(error);
            toast.error('Failed to load articles');
        }
    };
    useEffect(() => {

        fetchData();
    }, []);

    // if (loading) return <Spinner />;

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
                {articles && <FeatureArticleSection articles={articles ? articles.slice(0, 3) : []} />}
                {articles && <FeatureVideoSection articles={articles} />}
            </div>
        </>
    );
};

export default LearningRoom;
