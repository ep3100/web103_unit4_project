import express from 'express'
import { getCars, getCar, createCar, updateCar, deleteCar } from '../controllers/carsController'

const router = express.Router()

router.get('/cars', getCars)
router.get('/cars/:id', getCar)
router.get('/cars', createCar)
router.get('/cars/:id', updateCar)
router.get('/cars/:id', deleteCar)

export default router