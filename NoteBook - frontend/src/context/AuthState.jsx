import { authContext } from "./appContext";
import PropTypes from 'prop-types';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

const AuthState = (props) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

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
            if (response.data.success) {
                const authToken = response.data.authToken
                localStorage.setItem('token', authToken);
                navigate("/");
                handleGetUserData(authToken)
            }
            else {
                alert("Invalid credentials");
            }

        } catch (error) {
            console.error(error)
            alert("Invalid credentials");
            console.error(error.response.data)
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
                const authToken = response.data.authToken
                localStorage.setItem('token', authToken);
                navigate("/");
                handleGetUserData(authToken)
            }
            else {
                alert("Invalid credentials");
            }

        } catch (error) {
            console.error(error)
            console.error(error.response.data)
        }
    }

    const handleGetUserData = async (authToken) => {
            try {
                console.log(authToken, 'getdata')
                const config = {
                    headers: {
                        'auth-token': authToken
                    },
                };
                const url = `${import.meta.env.VITE_AUTH_URL}/getuser`

                const response = await axios.get(url, config)
                setUserData(response.data)

            } catch (error) {
                console.error(error)
                console.error(error.response.data)
            }
    }

    return (
        <authContext.Provider value={{ handleSignup, handleLogin, userData }}>
            {props.children}
        </authContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.object
};

export default AuthState