/**
 * The routes.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { Controller } from '../controllers/controller.js'

export const router = express.Router()
export const controller = new Controller()

router.use('/', (req, res, next) => controller.test(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))