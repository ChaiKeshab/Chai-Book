import { authContext, noteContext } from "../context/appContext"
import { useContext } from "react"

const Home = () => {
    const noteContextData = useContext(noteContext)
    const authcontextData = useContext(authContext)
    const { second, updateStateAuth } = authcontextData
    const { first, updateState } = noteContextData


    return (
        <div>
            <p>My name is {first.name} and here {first.work}</p>
            <p>{second.name} and {second.work}</p>
            <button onClick={updateState}>Click</button>
            <button onClick={updateStateAuth}>Click</button>
        </div>
    )
}

export default Home