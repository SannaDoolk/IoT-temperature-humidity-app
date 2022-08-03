/**
 * The starting point of the application.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors'
import { router } from './routes/router.js'

/**
 * The main function of the application.
 */
const main = async () => {
  const app = express()

  app.use(helmet())

  app.use(cors())

  app.use(logger('dev'))

  app.use(express.json())

  app.use('/', router)

  app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (req.app.get('env') !== 'development') {
      res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
      return
    }

    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        innerException: err.innerException,
        stack: err.stack
      })
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
}

main().catch(console.error)
