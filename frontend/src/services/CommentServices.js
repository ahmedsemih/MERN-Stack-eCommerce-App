import axios from 'axios';

export const getAllComments = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/comments`);
    return data;
};

export const getCommentById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`);
    return data;
};

export const getCommentByAuthorId = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/comments/author/${id}`);
    return data;
};

export const getCommentByProductId = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/comments/product/${id}`);
    return data;
};

export const addComment = async (productId, comment, author) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/comments`, {
        for: productId,
        comment,
        author
    });
    return data;
};

export const updateComment = async (id, productId, comment, author) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`, {
        for: productId,
        comment,
        author
    });
    return data;
};

export const deleteComment = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`);
    return data;
};