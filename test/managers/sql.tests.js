'use strict';

let expect = require('chai').expect;
let AbstractSqlManager = require('../../lib/managers/abstract');

describe('AbstractSqlManager', function() {

  var manager;
  before(function() {
    manager = new AbstractSqlManager();
    expect(manager).to.be.ok;
  });


  it('should be able to query', function(done) {
    manager.execute('SELECT TOP 1 * FROM Term_C_GPU_Alarms')
      .then(function(recordset) {
        expect(recordset).to.be.ok;
        expect(recordset.length).to.be.eql(1);
        done();
      }).catch(function(err) {
        done(err);
      });
  });

});