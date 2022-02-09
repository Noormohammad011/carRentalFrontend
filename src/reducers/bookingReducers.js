
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




export const bookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { loading: true, bookings: [] }
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      }
    case BOOKING_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}



export const getbookingsReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_GET_REQUEST:
      return { loading: true, bookings: [] }
    case BOOKING_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        bookings: action.payload,
      }
    case BOOKING_GET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const bookingDetailsReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return { ...state, loading: true }
    case BOOKING_DETAILS_SUCCESS:
      return { loading: false, booking: action.payload }
    case BOOKING_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}