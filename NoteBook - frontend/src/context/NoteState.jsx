import {noteContext} from "./appContext";
import { useState } from "react";
import PropTypes from 'prop-types'

const NoteState = (props) => {

    const [first, setFirst] = useState({
        "name": "Chai",
        "work": "none"
    })

    const updateState = () => {
        //In react, don't mutate the object directly. Instead, create new object with updated values
        setFirst((prevState) => ({
            ...prevState,
            work: "legend"
        }))
    }

    return (
        <noteContext.Provider value={{ first, updateState }}>
            {props.children}
        </noteContext.Provider>
    )
}

NoteState.propTypes = {
    children: PropTypes.object
  };

export default NoteState