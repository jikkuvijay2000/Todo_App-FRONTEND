import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Register from './Pages/Register'
import Home from './Pages/Home'

function App() {


  return (
    <>
    <Header/>
          <Routes>
            <Route path='/' element={<Login/>}  />
            <Route path='/register' element={<Register/>}  />
            <Route path='/home' element={<Home/>}  />
          </Routes>
    <Footer/>
    </>
  )
}

export default App
