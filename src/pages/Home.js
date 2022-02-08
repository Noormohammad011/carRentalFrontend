import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCars } from '../actions/carActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { Carousel } from 'antd'
import { Card } from 'antd'
const { Meta } = Card

const contentStyle = {
  height: '70vh',
  color: '#fff',
  width: '100%',
  
  textAlign: 'center',
  
}
const Home = () => {
  const carList = useSelector((state) => state.carList)
  const { loading, error, cars } = carList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listCars())
  }, [dispatch])

  return (
    <>
      <Carousel autoplay>
        {cars?.map((car) => (
          <div key={car._id}>
            <img src={car.image} alt={car.name} style={contentStyle}></img>
            <h1
              className='text-capitalize'
              style={{ fontSize: '30px', textAlign: 'center' }}
            >
              {car.name}
            </h1>
          </div>
        ))}
      </Carousel>

      <div className='container'>
        <div className='row my-5'>
          <h1 className='text-center text-uppercase'>
            Latest Cars
          </h1>
        </div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4'>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            cars.map((car) => (
              <div className='col my-2' key={car._id}>
                <Card
                  hoverable
                  // style={{ width: 240 }}
                  cover={<img alt={car.name} src={car.image} />}
                >
                  <Meta title={car.name} />
                  <p>rentPerhour: {car.rentPerHour}$</p>
                  <div className='d-grid gap-2 mt-2'>
                    <Link
                      to={`/booking/${car._id}`}
                      className='btn btn-outline-dark'
                    >
                      Booking
                    </Link>
                  </div>
                </Card>

                {/* <div className='card text-center'>
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
                </div> */}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default Home
