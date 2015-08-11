'use strict';

let ReportingManager = require('../managers/reporting');
let Promise = require('bluebird');
let async = Promise.coroutine;


module.exports = [
  {
    method: 'GET',
    path: '/v1/{asset}/reports',
    handler: async(function* (request, reply) {
      let reportingManager = new ReportingManager(request.params.asset);
      let results = yield reportingManager.query();
      reply(results);
    })
  },
];