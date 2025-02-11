import * as yup from "yup"


export const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
    confirm_password: yup.string()
       .oneOf([yup.ref('password')], 'Passwords must match')
       .required('Confirm Password is required'),
})

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
})

export const ticketSchema = yup.object().shape({
    subject: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
})