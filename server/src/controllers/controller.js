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
  async test (req, res, next) {
    try {
    // AUTH
    const url = process.env.INFLUX_URL || ''
    const token = process.env.INFLUX_TOKEN
    const org = process.env.INFLUX_ORG || ''

    const queryApi = new InfluxDB({url, token}).getQueryApi(org)

const fluxQuery = `from(bucket: "Esp32-1dv027")
|> range(start: -1d, stop: -1m)
|> filter(fn: (r) => r["_measurement"] == "measurements")
|> filter(fn: (r) => r["SSID"] == "Granstigen")
|> filter(fn: (r) => r["_field"] == "Temperature")
|> filter(fn: (r) => r["device"] == "ESP32")`

    /*const fluxQuery = 'from(bucket:"Esp32-1dv027") |> range(start: -1m, stop: 1m) |> filter(fn: (r) => r._measurement == "measurements") |> filter(fn: (r) => r._SSID == "Granstigen") |> filter(fn: (r) => r._field == "Temperature") |> filter(fn: (r) => r.device == "ESP32")'*/

  /*from(bucket: "Esp32-1dv027")
	|> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r["_measurement"] == "measurements")
  |> filter(fn: (r) => r["SSID"] == "Granstigen")
  |> filter(fn: (r) => r["_field"] == "Temperature")
  |> filter(fn: (r) => r["device"] == "ESP32")*/

    // range = tidsintervll
    const arr = []
    /*const observer = {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row)
        console.log(o)
        console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.sensor_id}): ${o._field}=${o._value}`)
        
        arr.push(o._field)
      },
      error(error) {
        console.error(error)
        console.log('\nFinished ERROR')
      },
      complete() {
        console.log('complete')
        res.json(arr)
      }
    }
    queryApi.queryRows(fluxQuery, observer)*/

    queryApi.queryRows(fluxQuery, {

      next(row, tableMeta) {
        console.log('Row:', row)
        const o = tableMeta.toObject(row)
        console.log(JSON.stringify(o, null, 2))
        console.log(
          `${o._time} ${o._measurement} in '${o.location}' (${o.example}): ${o._field}=${o._value}`
        )
        arr.push(o._field)
      },
      error(error) {
        console.error(error)
        console.log('\nFinished ERROR')
      },
      complete() {
        console.log('\nFinished SUCCESS')
        res.status(200).json(arr)
      },
    })

    /*res
      .json('Test')*/

    /*queryApi.collectRows(fluxQuery)
    .then(data => {
    console.log('data: ' + data)
    if (data) {
      console.log(data.length)
    }
    data.forEach(x => console.log(JSON.stringify(x)))
    console.log('\nCollect ROWS SUCCESS')
     })
    .catch(error => {
     console.error(error)
     console.log('\nCollect ROWS ERROR')
    })*/

    } catch (error) {
      console.log(error)
    }
  }

}