import axios from 'axios'
import { message } from 'antd'

import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAIL,
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
      `https://mysterious-thicket-15468.herokuapp.com/api/bookings/bookcar`,
      reqObj,
      config
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

export const getAllBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_GET_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(
      `https://mysterious-thicket-15468.herokuapp.com/api/bookings/bookcar`,
      config
    )

    dispatch({
      type: BOOKING_GET_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
