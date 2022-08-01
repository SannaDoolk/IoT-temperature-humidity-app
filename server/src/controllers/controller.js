/**
 * Module for the Api-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

'use strict'
import createHttpError from 'http-errors'
import { InfluxDB, Point } from '@influxdata/influxdb-client' 
//import { . } from '../../models/'

/**
 * Encapsulates a controller.
 */
export class Controller {
  /**
   * .
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getLatestSensorValues (req, res, next) {
    try {
    // AUTH
    const url = process.env.INFLUX_URL || ''
    const token = process.env.INFLUX_TOKEN
    const org = process.env.INFLUX_ORG || ''

    const queryApi = new InfluxDB({url, token}).getQueryApi(org)

    // Get last available values 
    const fluxQuery = `from(bucket: "Esp32-1dv027")
    |> range(start: -1d, stop: -12h)
    |> filter(fn: (r) => r["_measurement"] == "measurements")
    |> filter(fn: (r) => r["SSID"] == "Granstigen")
    |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Humidity")
    |> filter(fn: (r) => r["device"] == "ESP32")
    |> last()`

    let temperatureValue
    let humidityValue

    queryApi.queryRows(fluxQuery, {

      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
          //console.log(o._time)
          //console.log(o._field)
          //console.log(o._value)

          if (o._field === 'Temperature') {
            temperatureValue = {
              time: o._time,
              value: o._value
            }
          }
          if (o._field === 'Humidity') {
            humidityValue = {
              time: o._time,
              value: o._value
            }
          }
      },
      error(error) {
        console.error(error)
      },
      complete() {
        res.status(200).json({ temperature: temperatureValue, humidity: humidityValue })
      },
    })
    } catch (error) {
      console.log(error)
    }
  }

}