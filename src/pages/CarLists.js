import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCar, listCars } from '../actions/carActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { CAR_CREATE_RESET } from '../constants/carConstans'

const CarLists = () => {
   const carList = useSelector((state) => state.carList)
   const { loading, error, cars } = carList
   const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()
  const dispatch = useDispatch()
    useEffect(() => {
      dispatch({ type:CAR_CREATE_RESET })

      if (!userInfo || !userInfo.isAdmin) {
        navigate('/login')
      }
      dispatch(listCars())
     
    }, [
      dispatch,
      navigate,
      userInfo,
     
    ])
    const deleteHandler = (id) => {
      if (window.confirm('Are you sure')) {
        dispatch(deleteCar(id))
      }
    }
  return (
    <>
      <div className='container'>
        <Link to='/admin/careatecar' className='btn btn-light my-3'>
          <i className='fas fa-plus'></i> Create Car
        </Link>
      </div>
      <h1 className='text-center my-4 text-uppercase'>Car</h1>
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
                <th>NAME</th>
                <th>IMAGE</th>
                <th>CAR_R_HOUR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car._id}</td>
                  <td>{car.name}</td>
                  <td>
                    <img
                      src={car.image}
                      alt={car.name}
                      style={{ height: '30px', width: '30px' }}
                    />
                  </td>
                  <td>{car.rentPerHour}</td>

                  <td>
                    <Link to={`/admin/car/${car._id}/edit`}>
                      <button type='button' className='btn btn-sm btn-light'>
                        <i className='fas fa-edit'></i>
                      </button>
                    </Link>
                    <button
                      type='button'
                      className='btn btn-sm btn-danger'
                      onClick={() => deleteHandler(car._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default CarLists
