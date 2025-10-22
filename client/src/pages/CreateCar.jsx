import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { CarsAPI } from '../services/CarsAPI'
import { calcPrice, validateCombo } from '../utilities/calcprice'

const CreateCar = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('My Bolt')
    const [exterior, setExterior] = useState('red')
    const [wheels, setWheels] = useState('standard')
    const [interior, setInterior] = useState('fabric')
    const [error, setError] = useState('')
    const price = calcPrice({ exterior, wheels, interior })

    async function handleSubmit(e) {
        e.preventDefault()
        const invalid = validateCombo({ exterior, wheels })
        if (invalid) return setError(invalid)
        try {
        const car = await CarsAPI.create({ name, exterior, wheels, interior, price })
        navigate(`/customcars/${car.id}`)
        } catch (err) {
        setError(err.message)
        }
    }
    return (
        <main className='container'>
        <h2>Customize Your Bolt</h2>
        {error && <article role='alert'>{error}</article>}
        <form onSubmit={handleSubmit}>
            <label>Name <input value={name} onChange={e=>setName(e.target.value)} required /></label>
            <label>Exterior
            <select value={exterior} onChange={e=>setExterior(e.target.value)}>
                <option value='red'>Red</option>
                <option value='blue'>Blue (+$500)</option>
                <option value='black'>Black (+$700)</option>
            </select>
            </label>
            <label>Wheels
            <select value={wheels} onChange={e=>setWheels(e.target.value)}>
                <option value='standard'>Standard</option>
                <option value='sport'>Sport (+$1500)</option>
            </select>
            </label>
            <label>Interior
            <select value={interior} onChange={e=>setInterior(e.target.value)}>
                <option value='fabric'>Fabric</option>
                <option value='leather'>Leather (+$1800)</option>
            </select>
            </label>
            <p><strong>Total:</strong> ${price.toLocaleString()}</p>
            <button type='submit'>Save Car</button>
        </form>
        </main>
    )
}

export default CreateCar