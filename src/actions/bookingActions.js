import axios from 'axios'
import { message } from 'antd'



import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
} from './../constants/bookingConstants'


export const bookCar = (reqObj) => async (dispatch) => {
  try {
    dispatch({ type: BOOKING_CREATE_REQUEST })

    const { data } = await axios.post(
      `http://localhost:5000/api/bookings/bookcar`,
      reqObj
    )

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    })
       message.success('Your car booked successfully')
        setTimeout(() => {
          window.location.href = '/userbookings'
        }, 500)
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: error.response.data || 'Something went wrong.',
    })
    message.error('Something went wrong , please try later')
  }
}