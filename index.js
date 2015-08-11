'use strict';

let Hapi = require('hapi');
let config = require('./config');
let router = require('./lib/routes');
let Path = require('path');

let server = new Hapi.Server();
server.connection({
  port: config.get('PORT'),
  router: { isCaseSensitive: false, stripTrailingSlash: true },
});

server.route(router);

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'dist',
      listing: true,
    },
  },
});

server.register([
  {
    register: require('hapi-routes-status'),
  },
  {
    register: require('blipp'),
  },
  {
    register: require('lout'),
  },
  {
    register: require('tv'),
  },
  {
    register: require('hapi-auth-jwt2'),
  },
  {
    register: require('good'),
    options: {
      opsInterval: 5000,
      reporters: [
        {
          reporter: require('good-console'),
          events: { log: '*', response: '*', error: '*' },
        },
      ],
    },
  },
], function(err) {
  if (err) throw err;

  if (!module.parent) {
    server.start(function() {
      console.log('Server started', server.info.uri);
    });
  }
});


module.exports = server;