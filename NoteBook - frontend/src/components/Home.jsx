import { useContext, useState } from "react"
import { noteContext } from "../context/appContext"
import Note from "./Note"

const Home = () => {


    const noteContextData = useContext(noteContext)
    const { handleAddNote } = noteContextData

    // following dataFormat according to api requirements
    const [addNote, setAddNote] = useState({ description: "", title: "", tags: "" })

    // takes input values and forms an object according to required dataFormat
    const handleChange = (e) => {
        setAddNote({ ...addNote, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // call AddNote api
        handleAddNote(addNote.description, addNote.title, addNote.tags);
        setAddNote({ description: "", title: "", tags: "" })
    }

    return (
        <div>
            <div>
                <form action="" onSubmit={handleSubmit}>

                    <div className='input-field'>
                        <label htmlFor="title">Title</label>
                        <input type="title"
                            autoComplete='off'
                            placeholder='Title'
                            id='title'
                            name='title'
                            value={addNote.title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='input-field'>
                        <label htmlFor="description">Description</label>
                        <input type="description"
                            autoComplete='off'
                            placeholder='Description'
                            id='description'
                            name='description'
                            value={addNote.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='input-field'>
                        <label htmlFor="tags">Tags</label>
                        <input type="tags"
                            autoComplete='current-tags'
                            placeholder='Tags'
                            id='tags'
                            name='tags'
                            value={addNote.tags}
                            onChange={handleChange}
                        />
                    </div>

                    <button className='submit' type='submit'>Submit</button>
                </form>
            </div>
            <Note />
        </div>
    )
}

export default Home