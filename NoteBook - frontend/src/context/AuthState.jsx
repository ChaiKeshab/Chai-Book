import { authContext } from "./appContext";
import { useState } from "react";
import PropTypes from 'prop-types';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthState = (props) => {
    const navigate = useNavigate()
    const [getAuthToken, setGetAuthToken] = useState(false)

    const handleLogin = async (email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const url = `${import.meta.env.VITE_AUTH_URL}/login`

            const data = {
                "email": email,
                "password": password
            }

            const response = await axios.post(url, data, config)
            console.log(response.data.authToken, "login")
            if (response.data.success) {
                setGetAuthToken(true)
                localStorage.setItem('token', !getAuthToken);
                // localStorage.setItem('token', response.data.getAuthToken);
                navigate("/");
            }
            else {
                alert("Invalid credentials");
            }

        } catch (error) {
            console.error(error)
            alert("Invalid credentials");
        }
    }


    const handleSignup = async (name, email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };
            const url = `${import.meta.env.VITE_AUTH_URL}/createuser`
            const data = {
                "name": name,
                "email": email,
                "password": password
            }
            const response = await axios.post(url, data, config)

            if (response.data.success) {
                // Save the auth token and redirect
                setGetAuthToken(true)
                localStorage.setItem('token', !getAuthToken);
                // localStorage.setItem('token', response.data.getAuthToken);
                navigate("/");
            }
            else {
                alert("Invalid credentials");
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <authContext.Provider value={{ handleSignup, handleLogin, getAuthToken }}>
            {props.children}
        </authContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.object
};

export default AuthState