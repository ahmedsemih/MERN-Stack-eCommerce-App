import * as yup from 'yup';

const RegisterValidations = yup.object().shape({
    firstName: yup.string().required("first name is required").min(1).max(30),
    lastName: yup.string().required("last name is required").min(1).max(30),
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(20),
    phone: yup.number().typeError("phone number must be valid").required(),
    terms: yup.boolean().oneOf([true]).required()
});

export default RegisterValidations;