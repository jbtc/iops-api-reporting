'use strict';

let config = require('../../config');
let Promise = require('bluebird');
let Sql = Promise.promisifyAll(require('mssql'));
let _ = require('lodash');

class Parameter {
  constructor(name, sqlType, value) {
    this.name = name;
    this.sqlType = sqlType;
    this.value = value;
  }
}

class AbstractSqlManager {

  constructor() {
    this.configuration = {
      user: config.get('REPORTING_SQL_USER'),
      password: config.get('REPORTING_SQL_PASSWORD'),
      server: config.get('REPORTING_SQL_SERVER'),
      database: config.get('REPORTING_SQL_DATABASE'),
      options: {
        instanceName: config.get('REPORTING_SQL_INSTANCE_NAME'),
        appName: config.get('REPORTING_SQL_APP_NAME'),
      },
    };
  }

  get connection() {
    return new Sql.Connection(this.configuration);
  }

  execute(command, params) {
    var connection = this.connection;
    params = params || [];

    return Promise.resolve(connection.connect())
      .then(function() {
        var request = new Sql.Request(connection);
        _.forEach(params, function(param) {
          request.input(param.name, param.sqlType, param.value);
        });
        return request.queryAsync(command)
          .tap(function() {
            connection.close();
          });
      });
  }
}

module.exports = AbstractSqlManager;
module.exports.InputParameter = Parameter;