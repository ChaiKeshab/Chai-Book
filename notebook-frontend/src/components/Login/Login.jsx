import { useContext, useState } from 'react'
import { authContext } from "../../context/appContext"

import { useFormik } from 'formik'
import { logInSchema } from '../../schemas'

import SignupModal from './SignupModal'
import BallCat from '../../assets/Images/BallCat.jpg'
import './Login.css'



//Datas that need to be pass to backend
const initialValues = {
    //use "name" of input fields
    email: "",
    password: ""
}

export default function Form() {
    //modal handles signup page popup
    const [modal, setModal] = useState(false)

    const authContextData = useContext(authContext)
    const { handleLogin } = authContextData

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: logInSchema, //validate all data
        onSubmit: (val, action) => {
            console.log(val)
            handleLogin(val.email, val.password)
            action.resetForm()  //reset form after successful submit
        }
    })

    const handleModal = (e) => {
        e.preventDefault()
        if (!modal) setModal(true)
        else if (modal) setModal(false)
    }

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
                            <label htmlFor="email">Email</label>
                            <input type="email"
                                autoComplete='email'
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
                                autoComplete='current-password'
                                placeholder='Password'
                                id='password'
                                name='password'
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.password && errors.password ? <p>{errors.password}</p> : null}
                        </div>

                        <button className='submit' type='submit'>Submit</button>
                    </form>
                    <button onClick={handleModal}>Create New Account</button>
                </div>
            </div>
            {modal && <SignupModal handleModal={handleModal} />}
        </div>
    )
}
