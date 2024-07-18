// api.js

import axios from "axios";

const API_URL = 'https://web-production-15a27.up.railway.app/api';
// const API_URL = 'http://127.0.0.1:8000/api';


export const signup = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/signup/`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/login/`, formData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const logout = async (accessToken, refreshToken) => {
    try {
        await axios.post(
            `${API_URL}/logout/`,
            {
                "refresh_token": refreshToken
            },

            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,

                },
            },


        ).then((response) => {
            return response.data;
        });
    } catch (error) {
        console.error("Error logging out: ", error);
        // It's a good idea to check if error.response exists before accessing error.response.data
    }
};

export const resetPassword = async (formData) => {
    const response = await axios.post(`${API_URL}/password-reset/`, formData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};


export const fetchInvestorData = async () => {
    try {
        const response = await axios.get(`${API_URL}/investors_data/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const fetchInvesteeData = async () => {
    try {
        const response = await axios.get(`${API_URL}/investee_data/`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const fetchUserData = async (accessToken, userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


export const updateInvestorPersonalInfo = async (accessToken, investorId, formData) => {

    try {
        const response = await axios.patch(
            `${API_URL}/investor-info/update/${investorId}/`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateInvesteePersonalInfo = async (accessToken, investorId, formData) => {

    try {
        const response = await axios.patch(
            `${API_URL}/investee-info/update/${investorId}/`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const updateEmailPassword = async (accessToken, investorId, formData) => {
    try {
        const response = await axios.patch(
            `${API_URL}/email-pass/update/${investorId}/`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserVerificationStatus = async (accessToken) => {
    try {
        const response = await axios.get(
            `${API_URL}/user/verification-status/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getUserCertifiedUsers = async (accessToken) => {
    try {
        const response = await axios.get(
            `${API_URL}/certified-users/`,
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};


export const storeOrderTrackId = async (accessToken, formData) => {
    try {
        const response = await axios.post(
            `${API_URL}/order/track/`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const retrieveOrder = async (accessToken, orderTrackingId) => {
    try {
        const response = await axios.get(
            `${API_URL}/order/retrieve/${orderTrackingId}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        // Log the error for debugging
        console.error("Error retrieving order:", error);

        // Throw a stringified version of the error response data
        throw JSON.stringify(error.response.data);
    }
};

export const verifyPayment = async (accessToken, userId, paymentStatus) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/${userId}/payment-verification/`,
            { payment_status: paymentStatus },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        // Log the error for debugging
        console.error("Error verifying payment:", error);

        // Throw a stringified version of the error response data
        throw JSON.stringify(error.response.data);
    }
};

export const SendUserEmail = async (recipient_email) => {
    try {
        const response = await axios.post(
            `${API_URL}/email/send/`,
            {
                recipient_email
            }
        );
        return response.data;
    } catch (error) {
        // Log the error for debugging
        console.error("Error verifying payment:", error);

        // Throw a stringified version of the error response data
        throw JSON.stringify(error.response.data);
    }
};


export const ContactUsAPI = async (formData) => {
    console.log(formData);
    try {
        const response = await axios.post(
            `${API_URL}/contact-us/`,
            formData  // Send formData directly
        );
        return response.data;
    } catch (error) {
        console.error("Error verifying payment:", error);
        throw JSON.stringify(error.response.data);
    }
};

export const GenerateOTP = async (accessToken) => {
    console.log(accessToken);
    try {
        const response = await axios.post(
            `${API_URL}/generate-otp/`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const VerifyOTP = async (accessToken, otp) => {
    try {
        const response = await axios.post(
            `${API_URL}/verify-otp/`,
            { otp },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
