import { useState, useContext, useEffect } from 'react'
import { noteContext } from "../context/appContext"
import './Note.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons'


const Note = () => {

    //check if logged in or not
    const authbool = localStorage.getItem('token') ? true : false

    const noteContextData = useContext(noteContext)
    const { handleFetchAllNotes, handleUpdateNote, note } = noteContextData

    const [editNote, setEditNote] = useState({ id: '', description: '', title: '', tags: '' })
    const [EditModal, setEditModal] = useState(false)


    // authbool: call after login
    useEffect(() => {
        handleFetchAllNotes(authbool)
    }, [handleFetchAllNotes, authbool])

    const handleEditModal = (id, description, title, tags) => {
        if (!EditModal) {
            setEditNote({ _id: id, description: description, title: title, tags: tags })
            setEditModal(true)
        }
        else if (EditModal) setEditModal(false)
    }

    const handleChange = (e) => {
        setEditNote({ ...editNote, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // call editNote api
        handleUpdateNote(editNote._id, editNote.description, editNote.title, editNote.tags);
        setEditNote({ description: "", title: "", tags: "" })
        setEditModal(false)
    }

    return (
        <div className='note-container'>

            <div>
                {note.length > 0 ?
                    note.map((e, i) => (
                        <div style={{ border: '1px solid black', marginBottom: '20px' }} key={`${note._id}${i}`}>
                            {e.title || e.description || e.tags ?
                                <div>
                                    <div>{e.title}</div>
                                    <div>{e.description}</div>
                                    <div>{e.tags}</div>
                                </div> : <div>Empty Note</div>
                            }
                            <button onClick={() => handleEditModal(e._id, e.description, e.title, e.tags)}>Edit</button>
                        </div>
                    )) : <div></div>}
            </div>

            {EditModal &&
                <section className='modal'>
                    <div className="modal-content">
                        <button className="close-button" onClick={handleEditModal}>
                            <FontAwesomeIcon icon={faX} />
                        </button>

                        <form action="" onSubmit={handleSubmit}>

                            <div className='input-field'>
                                <label htmlFor="title">Title</label>
                                <input type="title"
                                    autoComplete='off'
                                    placeholder='Title'
                                    id='title'
                                    name='title'
                                    value={editNote.title}
                                    onChange={(e) => handleChange(e, 'title')}
                                />
                            </div>

                            <div className='input-field'>
                                <label htmlFor="description">Description</label>
                                <input type="description"
                                    autoComplete='off'
                                    placeholder='Description'
                                    id='description'
                                    name='description'
                                    value={editNote.description}
                                    onChange={(e) => handleChange(e, 'description')}
                                />
                            </div>

                            <div className='input-field'>
                                <label htmlFor="tags">Tags</label>
                                <input type="tags"
                                    autoComplete='current-tags'
                                    placeholder='Tags'
                                    id='tags'
                                    name='tags'
                                    value={editNote.tags}
                                    onChange={(e) => handleChange(e, 'tags')}
                                />
                            </div>

                            <button className='submit' type='submit'>Submit</button>
                        </form>
                    </div>
                </section>}
        </div>
    )
}

export default Note