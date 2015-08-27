'use strict';

let ReportingManager = require('../managers/reporting');
let Promise = require('bluebird');
let async = Promise.coroutine;
let Joi = require('joi');
let CsvFormatter = require('../formatters/csv');
let PdfFormatter = require('../formatters/pdf');


module.exports = [
  {
    method: 'GET',
    path: '/v1/{asset}/reports',
    config: {
      validate: {
        query: {
          output: Joi.string().lowercase().allow(['json', 'csv', 'pdf']).default('json')
        }
      }
    },

    handler: async(function* (request, reply) {

      // Should be json by default
      let output = request.query.output;
      let reportingManager = new ReportingManager(request.params.asset);
      let results = yield reportingManager.query();

      if (output === 'csv') {
        return reply(CsvFormatter.convert(results));
      }
      else if (output === 'pdf') {
        return reply(PdfFormatter.convert(results));
      }
      else {

        return reply(results);
      }
    })
  },
];