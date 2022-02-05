import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_SUCCESS,
  CAR_DETAILS_FAIL,
} from '../constants/carConstans'

export const carListReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case CAR_LIST_REQUEST:
      return { loading: true, cars: [] }
    case CAR_LIST_SUCCESS:
      return {
        loading: false,
        cars: action.payload,
      }
    case CAR_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const carDetailsReducer = (
  state = { car: {  } },
  action
) => {
  switch (action.type) {
    case CAR_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CAR_DETAILS_SUCCESS:
      return { loading: false, car: action.payload }
    case CAR_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
