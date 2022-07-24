import axios from 'axios';

export const Register = async (firstName, lastName, email, password, phone) =>{
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/register`,{
        firstName,
        lastName,
        email,
        password,
        phone
    });
};

export const Login = async (email, password)=>{
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`,{
        email,
        password
    });
};