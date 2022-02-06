import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../actions/bookingActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import moment from 'moment'
import { Link } from 'react-router-dom'
const BookingList = () => {
  const dispatch = useDispatch()
  const getBookings = useSelector((state) => state.getBookings)
  const { loading, error, bookings } = getBookings

  useEffect(() => {
    dispatch(getAllBookings())
  }, [])
  return (
    <>
      <h1 className='text-center my-4 text-uppercase'>Booking</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='container '>
          <table className='table-sm table-responsive mx-auto table-bordered'>
            <thead>
              <tr>
                <th>ID</th>
                <th>CAR_NAME</th>
                <th>CAR_RENT_HOUR</th>
               
                <th>TOTAL_TRANSACTION_ID</th>
                <th>FROM_BOOKING</th>
                <th>TO_BOOKING</th>
                <th>BOOKING_CREATED</th>

                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings
                .map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.car.name}</td>
                    <td>{booking.car.rentPerHour}</td>
                    <td>{booking.transactionId}</td>
                    <td>{booking.bookedTimeSlots.from}</td>
                    <td>{booking.bookedTimeSlots.to}</td>
                    <td>{moment(booking.createdAt).format('MMM DD yyyy')}</td>
                    <td>
                      <>
                        <button type='button' className='btn btn-sm btn-light'>
                          <i className='fas fa-edit'></i>
                        </button>
                      </>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger'
                        // onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td>
                    {/* <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <Link to={`/admin/user/${user._id}/edit`}>
                        <button type='button' className='btn btn-sm btn-light'>
                          <i className='fas fa-edit'></i>
                        </button>
                      </Link>
                      <button
                        type='button'
                        className='btn btn-sm btn-danger'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default BookingList
