import { pool } from '../config/database.js'

// validate

function validateCombo({ exterior, wheels}) {
    if (exterior === 'black' && wheels === 'sport') {
        return 'Sport wheels are not available with black exterior.'
    }
    return null
}

export async function getCars(req, res) {
    try {
        const { rows } = await pool.query('SELECT * FROM cars ORDER BY id DESC')
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cars'})
    }
}

export async function getCar(req, res) {
    try {
        const { id } = req.params
        const { rows } = await pool.query('SELECT * FROM cars WHERE id=$1', [id])
        if (!rows.length) return res.status(404).json({ error: 'Not found '})
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch car' })
    }
}

export async function createCar(req, res) {
    try {
        const { name, exterior, wheels, interior, price } = req.body
        const invalid = validateCombo({ exterior, wheels })
        if (invalid) return res.status(400).json({ error: invalid })

        const { rows } = await pool.query(
            `INSERT INTO cars (name, exterior, wheels, interior, price) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
            [name, exterior, wheels, interior, price]
        )
        res.status(201).json(rows[0])
    } catch (err) {
        console.error(' createCar error:', err)
        res.status(500).json({ error: 'Failed to create car' })
    }
}

export async function updateCar(req, res) {
    try {
        const { id } = req.params
        const { name, exterior, wheels, interior, price } = req.body
        const invalid = validateCombo({ exterior, wheels })
        if (invalid) return res.status(400).json({ error: invalid })

        const { rows } = await pool.query(
            'UPDATE cars SET name=$1, exterior=$2, wheels=$3, interior=$4, price=$5 WHERE id=$6 RETURNING *',
            [name, exterior, wheels, interior, price, id]
        )
        if (!rows.length) return res.status(404).json({ error: 'Not found' })
        res.json(rows[0])
    } catch (err) {
        res.status(500).json({ error: 'Failed to update car' })
    }
}

export async function deleteCar(req, res) {
    try {
        const { id } = req.params
        const { rowCount } = await pool.query('DELETE FROM cars WHERE id=$1', [id])
        if (!rowCount) return res.status(404).json({ error: 'Not found'})
        res.status(204).end()
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete car'})
    }
}