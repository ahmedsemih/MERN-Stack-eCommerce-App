import axios from 'axios';

export const getAllImages = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images`);
    return data;
};

export const getImageById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`);
    return data;
};

export const addImage = async (url) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/images`, {
        url
    });
    return data;
};

export const updateImage = async (id, url) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`, {
        url
    });
    return data;
};

export const deleteImage = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/images/${id}`);
    return data;
};

export const getAllMiniImages = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/minis`);
    return data;
};

export const getMiniImageById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/minis/${id}`);
    return data;
};

export const addMiniImage = async (url) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/minis`, {
        url
    });
    return data;
};

export const updateMiniImage = async (id, url) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/minis/${id}`, {
        url
    });
    return data;
};

export const deleteMiniImage = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/minis/${id}`);
    return data;
};