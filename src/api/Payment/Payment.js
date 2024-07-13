import axios from 'axios';

const CONSUMER_KEY = "rXH9puVpvYTF6iu55E7llJDQevg76NbV";
const CONSUMER_SECRET = "ORxeVnn5msRcBlfCweMqw0fEOes=";

export const Authentication = async () => {
    try {
        const response = await axios.post(`https://pay.pesapal.com/v3/api/Auth/RequestToken`, {
            "consumer_key": CONSUMER_KEY,
            "consumer_secret": CONSUMER_SECRET
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const RegisterIPNURL = async (url, notificationType, token) => {
    try {
        const response = await axios.post(`https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN`, {
            "url": url,
            "ipn_notification_type": notificationType
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const SubmitOrderRequest = async (paymentFormDetails, token) => {
    try {
        const response = await axios.post(
            'https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest',
            paymentFormDetails,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response;
    }
};

export const GetTransactionStatus = async (orderTrackingId, token) => {
    console.log(orderTrackingId, token);
    try {
        const response = await axios.get(
            `https://pay.pesapal.com/v3/api/Transactions/GetTransactionStatus`, {
            params: { orderTrackingId: orderTrackingId },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        );
        return response.data;
    } catch (error) {
        throw error.response;
    }
};