import React from 'react'
import { useParams } from 'react-router-dom'

const CarEdit = () => {
  const {id} = useParams()
  return (
    <div>
      <h1>Car Edit page {id}</h1>
    </div>
  )
}

export default CarEdit
