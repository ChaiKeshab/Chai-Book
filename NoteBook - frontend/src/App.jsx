import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login/Login'
import { useEffect, useState } from 'react'

function App() {
  const navigate = useNavigate()
  const [navbar, setnavbar] = useState(true)

  useEffect(() => {
    const navigateLogin = () => {
      if (localStorage.getItem('token') === "true") {
        setnavbar(true)
      } else {
        navigate(`/login`);
        setnavbar(false)
      }
    }
    navigateLogin()
  }, [navigate])


  return (
    <>
      {navbar && <Navbar />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </>
  )
}

export default App
