'use strict';

let Promise = require('bluebird');
let CsvConverter = Promise.promisifyAll(require('json-2-csv'));

class CsvFormatter {

  /**
   * Converts JSON to CSV
   * @param {object|array} data
   * @returns {Promise<[String]>}
   */
  static convert(data) {
    return CsvConverter.json2csvAsync(data);
  }
}

module.exports = CsvFormatter;