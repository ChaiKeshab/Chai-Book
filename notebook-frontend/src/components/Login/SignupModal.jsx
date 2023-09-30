import { useContext } from 'react'
import { authContext } from "../../context/appContext"

import { useFormik } from 'formik'
import { signUpSchema } from '../../schemas'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import './Modal.css';

const initialValues = {
    //use "name" of input fields
    name: "",
    email: "",
    password: "",
    confirmPass: ""
}

const SignupModal = ({ handleModal }) => {

    const authContextData = useContext(authContext)
    const { handleSignup } = authContextData

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema, //validate all data
        onSubmit: (val, action) => {
            // console.log(val, 'signup')
            handleSignup(val.name, val.email, val.password)
            action.resetForm()  //reset form after successful submit
        }
    })

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={handleModal}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <form action="" onSubmit={handleSubmit}>

                    <div className='input-field'>
                        <label htmlFor="name">Username</label>
                        <input type="text"
                            autoComplete='off'
                            placeholder='Username'
                            id='name'
                            name='name'
                            value={values.name} //use "name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.name && errors.name ? <p>{errors.name}</p> : null}
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
    );
};

SignupModal.propTypes = {
    handleModal: PropTypes.func
};

export default SignupModal;
