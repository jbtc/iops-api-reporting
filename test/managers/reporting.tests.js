'use strict';

let expect = require('chai').expect;
let ReportingManager = require('../../lib/managers/reporting');
let moment = require('moment');


describe('ReportingManager', function() {

  var manager;
  before(function() {
    manager = new ReportingManager('GPU');
    expect(manager).to.be.ok;
  });

  it('should be able to query by gate', function(done) {
    manager.query({ gate: 'Gate C-3' })
      .then(function(results) {
        expect(results).to.be.ok;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should be able to query by dates', function(done) {
    let startDate = moment().subtract(1, 'month').toDate();
    let endDate = moment().toDate();

    manager.query({ startDate: startDate, endDate: endDate })
      .then(function(results) {
        expect(results).to.be.ok;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('should be able to query by alarm type', function(done) {
    manager.query({ alarmType: 'OPC' })
      .then(function(results) {
        expect(results).to.be.ok;
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

});