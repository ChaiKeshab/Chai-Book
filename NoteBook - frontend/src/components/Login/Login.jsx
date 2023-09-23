// import React from 'react'
import { useFormik } from 'formik'
import './Login.css'
import { signUpSchema } from '../../schemas'
import BallCat from '../../assets/Images/BallCat.jpg'

//Datas that need to be pass to backend
const initialValues = {
    //use "name" of input fields
    username: "",
    email: "",
    password: "",
    confirmPass: "",
}

export default function Form() {

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema, //validate all data
        onSubmit: (val, action) => {
            console.log(val)    
            action.resetForm()  //reset form after successful submit
        }
    })
    // console.log(errors)

    // const ObjExample = useFormik({       //To view the structure of the Formik object in console
    //     initialValues: initialValues,
    //     validationSchema: signUpSchema,
    //     onSubmit: (values) => {
    //         console.log(values)
    //     }
    // })
    // console.log(ObjExample)

    return (
        <div className='container-form'>
            <div className='container-main'>
                <div className='col-1'>
                    <h1>Welcome Bitches!</h1>
                    <img src={BallCat} alt="The cat god" />
                </div>
                <div className='col-2'>
                    <h1>Login</h1>

                    <form action="" onSubmit={handleSubmit}>

                        <div className='input-field'>
                            <label htmlFor="username">Username</label>
                            <input type="text"
                                autoComplete='off'
                                placeholder='Username'
                                id='username'
                                name='username'
                                value={values.username} //use "name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.username && errors.username ? <p>{errors.username}</p> : null}
                        </div>

                        <div className='input-field'>
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                autoComplete='off'
                                placeholder='Email'
                                id='email'
                                name='email'
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.email && errors.email ? <p>{errors.email}</p> : null}
                        </div>

                        <div className='input-field'>
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                autoComplete='off'
                                placeholder='Password'
                                id='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.password && errors.password ? <p>{errors.password}</p> : null}

                        </div>

                        <div className='input-field'>
                            <label htmlFor="confirmPass">Confirm Password</label>
                            <input type="password"
                                autoComplete='off'
                                placeholder='Confirm Password'
                                id='confirmPass'
                                name='confirmPass'
                                value={values.confirmPass}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.confirmPass && errors.confirmPass ? <p>{errors.confirmPass}</p> : null}
                        </div>

                        <button className='submit' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
