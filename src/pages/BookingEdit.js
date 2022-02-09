import React, { useEffect } from 'react'
import { Form, Button, Checkbox } from 'antd'

import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { editBooking, listBookingDetails } from '../actions/bookingActions'
import Message from './../components/Message'
import Loader from './../components/Loader'

const BookingEdit = () => {
  const { id } = useParams()
  const bookingDetails = useSelector((state) => state.bookingDetails)
  const { loading, error, booking } = bookingDetails
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listBookingDetails(id))
  }, [dispatch, id])

    const onFinish = (values) => {
        values._id = booking._id
     dispatch(editBooking(values))
   
  }
  return (
    <>
      {' '}
      <div className='container'>
        <Link to='/admin/bokingList' className='btn btn-light my-3'>
          Go Back
        </Link>
      </div>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <div className='container mx-auto d-flex justify-content-center'>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={booking}
          onFinish={onFinish}
        >
          <Form.Item>
            <Form.Item name='isDelivered' valuePropName='checked' noStyle>
              <Checkbox>isDelivered</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Delivered
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default BookingEdit
