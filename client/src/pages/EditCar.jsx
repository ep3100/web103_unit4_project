import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CarsAPI } from '../services/CarsAPI'
import { calcPrice, validateCombo } from '../utilities/calcprice'
import '../App.css'

const EditCar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', exterior:'red', wheels:'standard', interior:'fabric' })
  const [error, setError] = useState('')

  useEffect(() => {
    CarsAPI.get(id).then(car => setForm(car)).catch(err => setError(err.message))
  }, [id])

  const price = calcPrice(form)

  function update(field) {
    return e => setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const invalid = validateCombo(form)
    if (invalid) return setError(invalid)
    try {
      await CarsAPI.update(id, { ...form, price })
      navigate(`/customcars/${id}`)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <main className='container'>
      <h2>Edit Car</h2>
      {error && <article role='alert'>{error}</article>}

      <form onSubmit={handleSubmit}>
        <label>Name
          <input value={form.name} onChange={update('name')} required />
        </label>

        <label>Exterior
          <select value={form.exterior} onChange={update('exterior')}>
            <option value='red'>Red</option>
            <option value='blue'>Blue (+$500)</option>
            <option value='black'>Black (+$700)</option>
          </select>
        </label>

        <label>Wheels
          <select value={form.wheels} onChange={update('wheels')}>
            <option value='standard'>Standard</option>
            <option value='sport'>Sport (+$1500)</option>
          </select>
        </label>

        <label>Interior
          <select value={form.interior} onChange={update('interior')}>
            <option value='fabric'>Fabric</option>
            <option value='leather'>Leather (+$1800)</option>
          </select>
        </label>

        <p><strong>Total Price:</strong> ${price.toLocaleString()}</p>
        <button type='submit'>Save Changes</button>
      </form>
    </main>
  )
}

export default EditCar
