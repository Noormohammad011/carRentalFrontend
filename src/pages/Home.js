import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCars } from '../actions/carActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'

const Home = () => {
  const carList = useSelector((state) => state.carList)
  const { loading, error, cars } = carList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listCars())
  }, [dispatch])
  console.log(cars)
  return (
    <>
      <div className='container'>
        <div className='row my-5'>
          <h3 className='text-center text-uppercase'>
            Welcome To Car Rent house
          </h3>
        </div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            cars.map((car) => (
              <div className='col' key={car._id}>
                <div className='card text-center'>
                  <img
                    src={car.image}
                    className='card-img-top'
                    alt={car.name}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{car.name}</h5>
                    <p className='card-text'>rentPerhour: {car.rentPerHour}$</p>
                    <Link
                      to={`/booking/${car._id}`}
                      className='btn btn-primary'
                    >
                      Booking
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Home
