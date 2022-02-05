import axios from 'axios'

import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_FAIL,
  CAR_DETAILS_SUCCESS,
} from '../constants/carConstans'

export const listCars = () => async (dispatch) => {
  try {
    dispatch({ type: CAR_LIST_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/api/car/`)

    dispatch({
      type: CAR_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CAR_LIST_FAIL,
      payload: error.response.data || 'Something went wrong.',
    })
  }
}



export const listCarDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAR_DETAILS_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/api/car/${id}`)

    dispatch({
      type: CAR_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CAR_DETAILS_FAIL,
      payload: error.response.data || 'Something went wrong.',
    })
  }
}