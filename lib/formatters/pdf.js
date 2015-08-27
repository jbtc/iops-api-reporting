'use strict';

let Promise = require('bluebird');
let Path = require('path');
let FS = require('fs');
let Pdf = Promise.promisifyAll(require('html-pdf'));
let HB = require('handlebars');
let _ = require('lodash');

class PdfFormatter {

  /**
   * Converts data to a PDF file
   * @param {Array<data>} data
   * @param {object} [options]
   * @param {string} [options.templateRelativePath]
   * @returns {*}
   */
  static convert(data, options) {
    options = options || {};
    options.templateRelativePath = options.templateRelativePath || '../../config/templates/default-pdf.html';

    let template = Path.resolve(__dirname, options.templateRelativePath);
    let html = FS.readFileSync(template, 'utf8');
    let render = HB.compile(html);

    let columns = [];
    let keys = [];
    if (_.isArray(data) && !_.isEmpty(data)) {
      let header = _.first(data);
      keys = _.keys(header);
      columns.push(keys);
    }

    return Pdf.createAsync(render({ keys: keys, columns: columns, payload: data }),
        { format: 'Tabloid', orientation: 'landscape', border: '0.5in' });
  }

}

module.exports = PdfFormatter;