import * as Yup from 'yup'

//Validation using yup
export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPass: Yup.string().required("Please re-enter your password").oneOf([Yup.ref('password'), null], "Password must match")
})

export const logInSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
})