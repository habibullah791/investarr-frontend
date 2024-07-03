import axios from 'axios';

// const API_URL = 'https://web-production-15a27.up.railway.app/api';
const API_URL = 'http://127.0.0.1:8000/api';

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
};

export const fetchArticleById = async (accessToken, articleId) => {
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
};
