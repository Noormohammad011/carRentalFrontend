import axios from 'axios'
import { message } from 'antd'

import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_DETAILS_FAIL,
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

export const listBookingDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_DETAILS_REQUEST })
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
      `https://mysterious-thicket-15468.herokuapp.com/api/bookings/${id}`,
      config
    )

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editBooking = (booking) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING', payload: true })

  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(
      `https://mysterious-thicket-15468.herokuapp.com/api/bookings/${booking._id}`,
      booking,
      config
    )

    dispatch({ type: 'LOADING', payload: false })
    message.success('Booking updated successfully')
    setTimeout(() => {
      window.location.href = '/admin/bokingList'
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'LOADING', payload: false })
  }
}

export const deleteBooking = (id) => async (dispatch, getState) => {
  dispatch({ type: 'LOADING', payload: true })

  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(
      `https://mysterious-thicket-15468.herokuapp.com/api/bookings/${id}`,
      config
    )

    dispatch({ type: 'LOADING', payload: false })
    message.success('Booking deleted successfully')
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'LOADING', payload: false })
  }
}
