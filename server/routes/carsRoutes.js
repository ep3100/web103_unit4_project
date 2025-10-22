import express from 'express'
import { getCars, getCar, createCar, updateCar, deleteCar } from '../controllers/carsController.js'

const router = express.Router()

router.post('/cars', createCar)
router.get('/cars', getCars)
router.get('/cars/:id', getCar)
router.put('/cars/:id', updateCar)
router.delete('/cars/:id', deleteCar)


export default router