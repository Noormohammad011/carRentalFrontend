import { Col, Row, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCar } from '../actions/carActions'
import { useNavigate } from 'react-router-dom'
import { CAR_CREATE_RESET } from '../constants/carConstans'
import Loader from '../components/Loader'
import Message from '../components/Message'



function CreateCar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const carCreate = useSelector((state) => state.carCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    car: createdCar,
  } = carCreate
  useEffect(() => {
    dispatch({ type: CAR_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/carlist`)
    }
  }, [dispatch, navigate, userInfo, successCreate])

  function onFinish(values) {
    values.bookedTimeSlots = []

    dispatch(createCar(values))
  }

  return (
    <>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      <Row justify='center mt-5'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          <Form className='bs1 p-2' layout='vertical' onFinish={onFinish}>
            <h3>Add New Car</h3>
            <hr />
            <Form.Item
              name='name'
              label='Car name'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='image'
              label='Image url'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='rentPerHour'
              label='Rent per hour'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='capacity'
              label='Capacity'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='fuelType'
              label='Fuel Type'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <div className='text-right'>
              <button className='btn1'>ADD CAR</button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default CreateCar
