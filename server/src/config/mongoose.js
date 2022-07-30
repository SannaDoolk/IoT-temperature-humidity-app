/**
 * Mongoose configuration.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import mongoose from 'mongoose'

/**
 * Starts a connection to a database.
 *
 * @returns { Promise } resolves if the connection is successfull.
 */
export const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Mongoose connection open.'))
  mongoose.connection.on('error', err => console.error(`Mongose error has occurred: ${err}`))
  mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose connection is disconnected due to application termination.')
      process.exit(0)
    })
  })

  return mongoose.connect(process.env.DB_CONNECTION_STRING, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}