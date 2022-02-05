// import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNavbar from './components/TopNavbar'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './privateRoute/PrivateRoute';
const App = () => {
  return (
    <BrowserRouter>
      <TopNavbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/booking/:id' element={<PrivateRoute><Booking /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
