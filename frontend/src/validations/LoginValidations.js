import * as yup from 'yup';

const LoginValidations = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(20)
});

export default LoginValidations;