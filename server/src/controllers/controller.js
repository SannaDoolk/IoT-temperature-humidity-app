/**
 * Module for the Api-Controller.
 *
 * @author Sanna Doolk
 * @version 1.0.0
 */

import createHttpError from 'http-errors'
//import { . } from '../../models/user.js'

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
  test (res, req, next) {
    console.log('Hej')
  }

}