import { useState, useContext, useEffect } from 'react'
import { noteContext } from "../context/appContext"


const Note = () => {
    const noteContextData = useContext(noteContext)
    const { handleFetchAllNotes, handleUpdateNote, note } = noteContextData
    //check if logged in or not
    const authbool = localStorage.getItem('token') ? true : false

    const [EditModal, setEditModal] = useState(false)

    // authbool: call after login
    useEffect(() => {
        handleFetchAllNotes(authbool)
    }, [handleFetchAllNotes, authbool])

    const handleEditModal = () => {
        if (!EditModal) setEditModal(true)
        else if (EditModal) setEditModal(false)
    }

    return (
        <div>
            {note.length > 0 ?
                note.map((e, i) => (
                    <div style={{ border: '1px solid black', marginBottom: '20px' }} key={`${note._id}${i}`}>
                        <div>{e.title} <button onClick={() => handleEditModal()}>Edit</button></div>
                        <div>{e.description} <button onClick={() => handleEditModal()}>Edit</button></div>
                        <div>{e.tags} <button onClick={() => handleEditModal()}>Edit</button></div>
                    </div>
                )) : <div></div>}
        </div>
    )
}

export default Note