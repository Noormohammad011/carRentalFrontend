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
      
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      `http://localhost:5000/api/bookings/bookcar`,
      reqObj, config
    )

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    })
       message.success('Your car booked successfully')
        setTimeout(() => {
          window.location.href = '/'
        }, 500)
  } catch (error) {
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: error.response.data || 'Something went wrong.',
    })
    message.error('Something went wrong , please try later')
  }
}