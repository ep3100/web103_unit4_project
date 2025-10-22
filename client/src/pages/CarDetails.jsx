import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarsAPI } from '../services/CarsAPI'
import '../App.css'

const CarDetails = () => {
  const { id } = useParams()
  const [car, setCar] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    CarsAPI.get(id).then(setCar).catch(err => setError(err.message))
  }, [id])

  if (error) return <article role='alert'>{error}</article>
  if (!car) return <p>Loading...</p>

  return (
    <main className='container'>
      <h2>{car.name}</h2>
      <p><strong>Exterior:</strong> {car.exterior}</p>
      <p><strong>Wheels:</strong> {car.wheels}</p>
      <p><strong>Interior:</strong> {car.interior}</p>
      <p><strong>Price:</strong> ${Number(car.price).toLocaleString()}</p>

      <div>
        <Link to={`/edit/${car.id}`} role='button'>Edit</Link>{' '}
        <Link to='/customcars' role='button' className='secondary'>Back to List</Link>
      </div>
    </main>
  )
}

export default CarDetails
