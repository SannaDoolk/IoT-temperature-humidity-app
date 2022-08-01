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

router.get('/iot', (req, res, next) => controller.getLatestSensorValues(req, res, next))