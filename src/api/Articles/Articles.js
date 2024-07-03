import axios from "axios";

const API_URL = 'https://web-production-15a27.up.railway.app/api';

export const fetchArticles = async (accessToken) => {
    try {
        const response = await axios.get(`${API_URL}/articles/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const fetchArticleById = async (accessToken, articleId) => {

    console.log('fetchArticleById', accessToken, articleId);
    try {
        const response = await axios.get(`${API_URL}/articles/${articleId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

