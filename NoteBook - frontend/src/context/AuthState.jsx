import { authContext } from "./appContext";
import { useState } from "react";
import PropTypes from 'prop-types'

const AuthState = (props) => {

    const [second, setSecond] = useState({
        "name": "oppai",
        "work": "hentai"
    })

    const updateStateAuth = () => {
        //In react, don't mutate the object directly. Instead, create new object with updated values
        setSecond((prevState) => ({
            ...prevState,
            work: "yamete"
        }))
    }

    return (
        <authContext.Provider value={{ second, updateStateAuth }}>
            {props.children}
        </authContext.Provider>
    )
}

AuthState.propTypes = {
    children: PropTypes.object
};

export default AuthState