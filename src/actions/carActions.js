import axios from 'axios'
import { message } from 'antd'

import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_FAIL,
  CAR_DETAILS_SUCCESS,
  CAR_DELETE_SUCCESS,
  CAR_DELETE_FAIL,
  CAR_DELETE_REQUEST,
  CAR_UPDATE_FAIL,
  CAR_UPDATE_SUCCESS,
  CAR_UPDATE_REQUEST,
  CAR_CREATE_REQUEST,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_FAIL,
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



// export const editCar = (reqObj) => async (dispatch) => {
//   dispatch({ type: 'LOADING', payload: true })

//   try {
//     await axios.post('/api/cars/editcar', reqObj)

//     dispatch({ type: 'LOADING', payload: false })
//     message.success('Car details updated successfully')
//     setTimeout(() => {
//       window.location.href = '/admin'
//     }, 500)
//   } catch (error) {
//     console.log(error)
//     dispatch({ type: 'LOADING', payload: false })
//   }
// }

export const deleteCar = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`http://localhost:5000/api/car/${id}`, config)

    dispatch({
      type: CAR_DELETE_SUCCESS,
    })
    setTimeout(() => {
      window.location.reload()
    }, 500)
  } catch (error) {
    dispatch({
      type: CAR_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const updateCar = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `http://localhost:5000/api/car/${product._id}`,
      product,
      config
    )

    dispatch({
      type: CAR_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CAR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const addCar = (reqObj) => async (dispatch, getState) => {
//   dispatch({ type: 'LOADING', payload: true })

//   try {
//      dispatch({
//        type: CAR_CREATE_REQUEST,
//      })
//      const {
//        userLogin: { userInfo },

//      } = getState()

//      const config = {
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${userInfo.token}`,
//        },
//      }
//     await axios.post('http://localhost:5000/api/car/', reqObj)

//     dispatch({ type: CAR_CREATE_SUCCESS, payload: data })
//     message.success('New car added successfully')
//     setTimeout(() => {
//       window.location.href = '/admin'
//     }, 500)
//   } catch (error) {
//     console.log(error)
//     dispatch({ type: 'LOADING', payload: false })
//   }
// }
export const createCar = (reqObj) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAR_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      `http://localhost:5000/api/car/`,
      reqObj,
      config
    )

    dispatch({
      type: CAR_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CAR_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const addCar = (reqObj) => async (dispatch, getState) => {
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
    await axios.post('http://localhost:5000/api/car/', reqObj, config)

    dispatch({ type: 'LOADING', payload: false })
    message.success('New car added successfully')
    setTimeout(() => {
      window.location.href = '/admin'
    }, 500)
  } catch (error) {
    console.log(error)
    dispatch({ type: 'LOADING', payload: false })
  }
}