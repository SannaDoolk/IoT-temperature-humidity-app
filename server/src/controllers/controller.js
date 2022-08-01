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
   * Authenticates against InfluxDB.
   *
   * @returns {Object} The queryApi object.
   */
  authenicateToInfluxDb () {
    const url = process.env.INFLUX_URL || ''
    const token = process.env.INFLUX_TOKEN
    const org = process.env.INFLUX_ORG || ''

    const queryApi = new InfluxDB({url, token}).getQueryApi(org)

    return queryApi
  }

  /**
   * Sends a query to InfluxDB to get latest available value for temperature and humidity.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getLatestSensorValues (req, res, next) {
    try {
    const fluxQuery = `from(bucket: "Esp32-1dv027")
    |> range(start: -1d, stop: -12h)
    |> filter(fn: (r) => r["_measurement"] == "measurements")
    |> filter(fn: (r) => r["SSID"] == "Granstigen")
    |> filter(fn: (r) => r["_field"] == "Temperature" or r["_field"] == "Humidity")
    |> filter(fn: (r) => r["device"] == "ESP32")
    |> last()`

    let temperatureValue
    let humidityValue

    const queryApi = this.authenicateToInfluxDb()
    queryApi.queryRows(fluxQuery, {

      next(row, tableMeta) {
      const o = tableMeta.toObject(row)
      if (o._field === 'Temperature') {
          temperatureValue = {
            time: o._time.slice(0, 19),
            value: o._value
          }
        }
      if (o._field === 'Humidity') {
          humidityValue = {
            time: o._time.slice(0, 19),
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

  /**
   * .
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getTemperatureValues (req, res, next) {
    try {
      const fluxQuery = `from(bucket: "Esp32-1dv027")
      |> range(start: -1d, stop: now())
      |> filter(fn: (r) => r["_measurement"] == "measurements")
      |> filter(fn: (r) => r["SSID"] == "Granstigen")
      |> filter(fn: (r) => r["_field"] == "Temperature")
      |> filter(fn: (r) => r["device"] == "ESP32")`

      const queryApi = this.authenicateToInfluxDb()
      const temperatures = []
      queryApi.queryRows(fluxQuery, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        const temperatureObj = {
          time: o._time.slice(0, 19),
          value: o._value
        }
        temperatures.push(temperatureObj)
      },
      error(error) {
        console.error(error)
      },
      complete() {
        res.status(200).json(temperatures)
      },
    })
    } catch (error) {

    }
  }  

}