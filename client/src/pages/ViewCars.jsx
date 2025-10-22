import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CarsAPI } from '../services/CarsAPI'
import '../App.css'

const ViewCars = () => {
  const [cars, setCars] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    CarsAPI.list().then(setCars).catch(err => setError(err.message))
  }, [])

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this car?')) return
    try {
      await CarsAPI.remove(id)
      setCars(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className='container'>
      <h2>Saved Cars</h2>
      {error && <article role='alert'>{error}</article>}
      {!cars.length ? (
        <p>No cars saved yet. <Link to='/'>Create one</Link>.</p>
      ) : (
        <ul>
          {cars.map(car => (
            <li key={car.id}>
              <strong>{car.name}</strong> — ${Number(car.price).toLocaleString()}
              {' '}
              <Link to={`/customcars/${car.id}`}>Details</Link>{' '}
              <Link to={`/edit/${car.id}`} role='button' className='secondary'>Edit</Link>{' '}
              <button onClick={() => handleDelete(car.id)} className='contrast'>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default ViewCars
