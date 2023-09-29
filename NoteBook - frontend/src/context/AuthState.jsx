import { authContext } from "./appContext";
import PropTypes from 'prop-types';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthState = (props) => {
    const navigate = useNavigate()


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
                localStorage.setItem('token', response.data.authToken);
                navigate("/");
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
                localStorage.setItem('token', response.data.authToken);
                navigate("/");
            }
            else {
                alert("Invalid credentials");
            }

        } catch (error) {
            console.error(error)
            console.error(error.response.data)
        }
    }

    return (
        <authContext.Provider value={{ handleSignup, handleLogin }}>
            {props.children}
        </authContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.object
};

export default AuthState