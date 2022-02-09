import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { getUserDetails } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { updateUserProfile } from './../actions/userActions'
import { getAllBookings } from '../actions/bookingActions'

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [navigate, userInfo, dispatch, user])

  const getBookings = useSelector((state) => state.getBookings)
  const { bookings } = getBookings

  useEffect(() => {
    dispatch(getAllBookings())
  }, [dispatch])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      setPassword('')
      setConfirmPassword('')
    }
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3 col-12'>
          <h1>User Profile</h1>
          {message && <Message>{message}</Message>}
          {error && <Message>{error}</Message>}
          {loading && <Loader />}
          {success && <Message variant='success'>Profile Updated</Message>}
          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor='inputEmail456' className='form-label'>
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                className='form-control'
                id='inputEmail456'
              />
            </div>
            <div>
              <label htmlFor='inputEmail4' className='form-label'>
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                className='form-control'
                id='inputEmail4'
              />
            </div>
            <div>
              <label htmlFor='inputPassword4' className='form-label'>
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                className='form-control'
                id='inputPassword4'
              />
            </div>
            <div>
              <label htmlFor='inputPassword47' className='form-label'>
                Confrim Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type='password'
                className='form-control'
                id='inputPassword47'
              />
            </div>

            <div>
              <button
                disabled={!name || !password || !email || !confirmPassword}
                type='submit'
                className='btn btn-primary mt-3'
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <div className='col-md-9 col-12 '>
          <>
            <h1 className='text-center my-4 text-uppercase'>Booking</h1>
            <div className='container-fluid mx-auto'>
              <table className='table-sm mx-auto table-responsive table-bordered'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CAR_NAME</th>
                    <th>CAR_RENT_HOUR</th>
                    <th>FROM_BOOKING</th>
                    <th>TO_BOOKING</th>
                    <th>BOOKING_CREATED</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings &&
                    bookings
                      ?.filter((o) => o.user == userInfo._id)
                      ?.map((booking, index) => (
                        <tr key={booking._id}>
                          <td>{index + 1}</td>
                          <td>{booking.car.name}</td>
                          <td>{booking.car.rentPerHour}</td>

                          <td>{booking.bookedTimeSlots.from}</td>
                          <td>{booking.bookedTimeSlots.to}</td>
                          <td>
                            {moment(booking.createdAt).format('MMM DD yyyy')}
                          </td>
                          <td>{booking.isDelivered ? 'YES' : 'NO'}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

export default Profile
