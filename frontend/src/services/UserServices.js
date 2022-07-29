import axios from 'axios';

export const getAllUsers = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users`);
    return data;
};

export const getUserById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
    return data;
};

export const updateUser = async ( id, address, phone ) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, {
        address,
        phone
    });
    return data;
};

export const deleteUser = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`);
    return data;
};

export const addFavorite = async (id, productId) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/favorite/${productId}`);
    return data;
};

export const deleteFavorite = async (id, productId) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/users/${id}/favorite/${productId}`);
    return data;
};