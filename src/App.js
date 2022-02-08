// import './App.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TopNavbar from './components/TopNavbar'
import Booking from './pages/Booking'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import UserList from './pages/UserList'
import PrivateRoute from './privateRoute/PrivateRoute'
import UserEdit from './pages/UserEdit'
import CarLists from './pages/CarLists'
import CarEdit from './pages/CarEdit'
import BookingList from './pages/BookingList'
import CreateCar from './pages/CreateCar'
import Footer from './components/Footer'
const App = () => {
  return (
    <BrowserRouter>
      <TopNavbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/booking/:id'
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/userlist'
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          {/* <Route path='/admin/user/:id/edit' element={<UserEdit />} /> */}
          <Route
            path='/admin/user/:id/edit'
            element={
              <PrivateRoute>
                <UserEdit />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/carlist'
            element={
              <PrivateRoute>
                <CarLists />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/car/:id/edit'
            element={
              <PrivateRoute>
                <CarEdit />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/bokingList'
            element={
              <PrivateRoute>
                <BookingList />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin/careatecar'
            element={
              <PrivateRoute>
                <CreateCar />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
