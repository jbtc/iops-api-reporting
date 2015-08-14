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
    let sql = `SELECT * FROM ${this.table} WHERE AlarmType like 'Digital' `;
    let params = [];
    let sqlParams = [];

    if (options.startDate) {
      options.endDate = options.endDate || new Date();
      sqlParams.push(new Parameter('startDate', Sql.DateTime2, options.startDate));
      sqlParams.push(new Parameter('endDate', Sql.DateTime2, options.endDate));
      sql += `AND AlarmDateTime BETWEEN @startDate AND @endDate`;
    }

    if (options.gate) {
      params.push(`AlarmID like '%${options.gate}%'`);
    }

    sql += ' ORDER BY AlarmDateTime DESC';
    return super.execute(sql, sqlParams);
  }
}

module.exports = ReportingManager;