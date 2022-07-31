/**
 * The routes.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as iotRouter } from './iot-router.js'


export const router = express.Router()

router.use('/', iotRouter)

router.use('*', (req, res, next) => next(createError(404)))