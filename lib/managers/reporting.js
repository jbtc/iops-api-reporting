'use strict';

let AbstractManager = require('./abstract');
let Sql = require('mssql');
let Promise = require('bluebird');
let Parameter = AbstractManager.InputParameter;

class ReportingManager extends AbstractManager {
  constructor(kind) {
    super();
    this.kind = kind;
  }

  get table() {
    return `Term_C_${this.kind}_Alarms`;
  }

  query(options) {
    options = options || {};
    let sql = `SELECT TOP 1000 * FROM ${this.table}`;
    let params = [];
    let sqlParams = [];

    if (options.startDate) {
      options.endDate = options.endDate || new Date();
      sqlParams.push(new Parameter('startDate', Sql.DateTime2, options.startDate));
      sqlParams.push(new Parameter('endDate', Sql.DateTime2, options.endDate));
      params.push(`AlarmDateTime BETWEEN @startDate AND @endDate`);
    }

    if (options.gate) {
      params.push(`AlarmID like '%${options.gate}%'`);
    }

    if (options.alarmType) {
      params.push(`AlarmType like '${options.alarmType}'`);
    }

    if (params.length > 0) {
      for (let i = 0; i < params.length; i++) {
        let param = params[i];
        var sqlPrefix = ' AND ';
        if (i == 0) {
          sqlPrefix = ' WHERE ';
        }
        sql += sqlPrefix + param;
      }
    }
    sql += ' ORDER BY AlarmDateTime DESC';
    return super.execute(sql, sqlParams);
  }
}

module.exports = ReportingManager;