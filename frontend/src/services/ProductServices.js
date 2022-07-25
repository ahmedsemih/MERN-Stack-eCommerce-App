import axios from 'axios';

export const getAllProducts = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
    return data;
};

export const getProductById = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
    return data;
};

export const getProductByPrice = async (lower, upper) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products`, {
        lower,
        upper
    });
    return data;
};

export const getProductByCategoryId = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/category/${id}`);
    return data;
};

export const getProductByColor = async (color) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/color/${color}`);
    return data;
};

export const getProductByGender = async (gender) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/gender/${gender}`);
    return data;
};

export const getProductByStatus = async (status) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/status/${status}`);
    return data;
};

export const getProductBySearch = async (search) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/search/${search}`);
    return data;
};

export const addProduct = async (name, color, sizes, description, category, gender, price) => {
    const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/products`, {
        name,
        color,
        sizes,
        description,
        category,
        gender,
        price
    });
    return data;
};

export const updateProduct = async (id, name, color, sizes, description, category, gender, price, discount, status) => {
    const { data } = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`, {
        name,
        color,
        sizes,
        description,
        category,
        gender,
        price,
        discount,
        status
    });
    return data;
};

export const deleteProduct = async (id) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}`);
    return data;
};