import { noteContext } from "../context/appContext"
import { useContext } from "react"

const Home = () => {
    const noteContextData = useContext(noteContext)
    const { first, updateState } = noteContextData


    return (
        <div>
            <p>My name is {first.name} and here {first.work}</p>
            <button onClick={updateState}>Click</button>
        </div>
    )
}

export default Home