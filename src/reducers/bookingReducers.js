
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
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
