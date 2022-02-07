
import { Col, Row, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from 'react-router-dom'
import Loader from '../components/Loader'

import { listCars, editCar } from '../actions/carActions'
function EditCar() {
  const {id} = useParams();
  
  const carList = useSelector((state) => state.carList)
  const { cars } = carList
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState();
  const [totalcars, settotalcars] = useState([]);
  useEffect(() => {
    if (cars.length == 0) {
      dispatch(listCars())
    } else {
      settotalcars(cars)
      setcar(cars.find((o) => o._id == id))
    }
  }, [cars, dispatch])

  function onFinish(values) {
    values._id = car._id;

    dispatch(editCar(values));
   
  }

  return (
    <>
      {loading && <Loader />}
      <Row justify='center mt-5'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalcars.length > 0 && (
            <Form
              initialValues={car}
              className='bs1 p-2'
              layout='vertical'
              onFinish={onFinish}
            >
              <h3>Edit Car</h3>

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
                <button className='btn1'>Edit CAR</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>
    </>
  )
}

export default EditCar;
