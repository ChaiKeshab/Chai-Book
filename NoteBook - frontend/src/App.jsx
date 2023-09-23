import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login/Login'

function App() {

  return (
    <>
      <Login/>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
      </Routes>
    </>
  )
}

export default App
