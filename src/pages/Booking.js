import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { listCarDetails } from '../actions/carActions'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Col, Row, Divider, DatePicker, Checkbox, Modal } from 'antd'
import { bookCar } from '../actions/bookingActions'
const { RangePicker } = DatePicker
const Booking = () => {
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const [totalHours, setTotalHours] = useState(0)
  const [driver, setdriver] = useState(false)
  const [totalAmount, setTotalAmount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  let { id } = useParams()
  const dispatch = useDispatch()
  const carDetails = useSelector((state) => state.carDetails)
  const { car } = carDetails
  useEffect(() => {
    if (!car._id || car._id !== id) {
      dispatch(listCarDetails(id))
    }
  }, [dispatch, id, car._id])

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour)
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours)
    }
  }, [driver, totalHours, car.rentPerHour])

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format('MMM DD yyyy HH:mm'))
    setTo(moment(values[1]).format('MMM DD yyyy HH:mm'))

    setTotalHours(values[1].diff(values[0], 'hours'))
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  function bookNow() {
    const reqObj = {
      user: userInfo._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    }
    dispatch(bookCar(reqObj))
  }
  // function onToken(token){
  //     const reqObj = {
  //         token,
  //         user: JSON.parse(localStorage.getItem("user"))._id,
  //         car: car._id,
  //         totalHours,
  //         totalAmount,
  //         driverRequired: driver,
  //         bookedTimeSlots: {
  //           from,
  //           to,
  //         },
  //       };

  //       dispatch(bookCar(reqObj));
  //   }
  return (
    <>
      <Row
        justify='center'
        className='d-flex align-items-center'
        style={{ minHeight: '90vh' }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img
            src={car.image}
            className='carimg2 bs1 w-100'
            data-aos='flip-left'
            data-aos-duration='1500'
            alt={car.name}
          />
        </Col>

        <Col lg={10} sm={24} xs={24} className='text-right'>
          <Divider type='horizontal' dashed>
            Car Info
          </Divider>
          <div style={{ textAlign: 'right' }}>
            <p>{car.name}</p>
            <p>{car.rentPerHour} Rent Per hour /-</p>
            <p>Fuel Type : {car.fuelType}</p>
            <p>Max Persons : {car.capacity}</p>
          </div>

          <Divider type='horizontal' dashed>
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='MMM DD yyyy HH:mm'
            onChange={selectTimeSlots}
          />
          <br />
          <button
            className='btn1 mt-2'
            onClick={() => {
              setShowModal(true)
            }}
          >
            See Booked Slots
          </button>
          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours}</b>
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true)
                  } else {
                    setdriver(false)
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h3>Total Amount : {totalAmount}</h3>
              {/* <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100}
                stripeKey='pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ'
              >
                <button className='btn1'>Book Now</button>
              </StripeCheckout> */}
              '
              <button className='btn1' onClick={bookNow}>
                Book Now
              </button>
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title='Booked time slots'
          >
            <div className='p-2'>
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className='btn1 mt-2'>
                    {slot.from} - {slot.to}
                  </button>
                )
              })}

              <div className='text-right mt-5'>
                <button
                  className='btn1'
                  onClick={() => {
                    setShowModal(false)
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </>
  )
}

export default Booking
