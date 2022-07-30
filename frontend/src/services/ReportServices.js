import axios from 'axios';

export const getAllReports = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reports`);
    return data;
};

export const getReportById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reports/${id}`);
    return data;
};

export const getReportByUserId = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/reports/user/${id}`);
    return data;
};

export const addReport = async (orderId, userId, content) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/reports`, {
        orderId,
        userId,
        content
    });
    return data;
};

export const updateReport = async ({ id, orderId, userId, content, status }) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/reports/${id}`, {
        orderId,
        userId,
        content,
        status
    });
    return data;
};

export const deleteReport = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/reports/${id}`);
    return data;
};