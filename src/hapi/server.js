/** The server
 * Created by abecchis on 27/02/15.
 */
'use strict';

var Hapi = require('hapi');
var clone = require('clone');

var defaultOption = require('../config/options').defaultOption;
var controller = require('./linkController');
var routes = require('./routes');
var staticRoutes = require('./staticRoutes');

module.exports = function (options) {

  if(!options) options = defaultOption;

  var log = options.logger;

  var hapiConfig = {
    load: {sampleInterval: 5000} // process monitoring
  };

  var server = new Hapi.Server(hapiConfig);
  server.connection({port: options.port, host: options.host});

  var linkedRoutes = routes(controller(options));
  server.route(staticRoutes);

  var prefixize = function (r) { r.path = options.baseUri + r.path; return r; };
  server.route(clone(linkedRoutes).map(prefixize));

  server.loadGoodies = function () {
    // Bliip plugin (print routes)
    server.register({register: require('blipp')}, function (err) {
      if (err) log.error("Error happened loading blipp %j", err);
      });


    // logging of request with good
    server.register({
      register: require('good'),
      options: {
        reporters: [{
          reporter: require('good-console'),
          events: { request: '*', response: '*' }}]
        }}, function (err) {
      if (err) log.error("Error happened loading good %j", err);
    });

    log.info('Server running at: ' + server.info.uri);

  };

  return server;
};
