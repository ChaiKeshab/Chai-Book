import { noteContext } from "./appContext";
import { useState, useCallback } from "react";
import axios from "axios";
import PropTypes from 'prop-types'


const NoteState = (props) => {

    const [note, setNote] = useState([])

    const handleAddNote = async (description, title, tags) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            };
            const url = `${import.meta.env.VITE_NOTE_URL}/addnote`

            const data = {
                "title": title,
                "description": description,
                "tags": tags
            }

            await axios.post(url, data, config)
            // fetch note after adding note
            handleFetchAllNotes(true)

        } catch (error) {
            console.error(error)
        }
    }


    const handleFetchAllNotes = useCallback(async (callCheck) => {

        // callCheck: false only when logout. **Note.jsx
        if (callCheck) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                };
                const url = `${import.meta.env.VITE_NOTE_URL}/fetchallnotes`

                const response = await axios.get(url, config)
                setNote(response.data)

            } catch (error) {
                console.error(error)
            }
        }
    }, [])

    const handleUpdateNote = async (id, description, title, tags) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            };
            const url = `${import.meta.env.VITE_NOTE_URL}/updatenote/${id}`

            const data = {
                "title": title,
                "description": description,
                "tags": tags
            }

            await axios.post(url, data, config)
            // fetch note after adding note
            handleFetchAllNotes(true)

        } catch (error) {
            console.error(error)
        }
    }



    return (
        <noteContext.Provider value={{ handleAddNote, handleFetchAllNotes, handleUpdateNote, note }}>
            {props.children}
        </noteContext.Provider>
    )
}

NoteState.propTypes = {
    children: PropTypes.object
};

export default NoteState