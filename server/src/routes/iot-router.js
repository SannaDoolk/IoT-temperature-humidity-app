/**
 * The routes.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import { Controller } from '../controllers/controller.js'

export const controller = new Controller()
export const router = express.Router()

router.get('/', (req, res, next) => controller.getLatestSensorValues(req, res, next))
router.get('/temperature-values', (req, res, next) => controller.getTemperatureValues(req, res, next))
router.get('/humidity-values', (req, res, next) => controller.getHumidityValues(req, res, next))
