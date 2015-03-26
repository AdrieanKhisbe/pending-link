/** The server
 * Created by abecchis on 27/02/15.
 */
"use strict";

var Hapi = require('hapi');
var Blipp = require('blipp');
var default_option = require('../config/options').default_option;
var controller = require('./linkController');
var routes = require('./routes');
var staticRoutes = require('./staticRoutes');

module.exports = function (options) {

  if (options == null) options = default_option;

  var log = options.logger;

  var hapi_config = {
    load: {sampleInterval: 5000} // process monitoring
  };
  //TODO: see how config doc
  var server = new Hapi.Server(hapi_config);
  server.connection({port: options.port, host: options.host});

  var linkedRoutes = routes(controller(options));
  server.route(staticRoutes);

  var prefixize = function (r) {  r.path = options.base_uri + r.path;return r; }
  server.route(linkedRoutes.map(prefixize));
  //TODO: clone.

  server.loadGoodies = function () {
    // Bliip plugin (print routes)
    server.register({register: Blipp}, function (err) {
      if (err) log.error("Error happened loading blipp %j", err);
      log.info('Server running at: ' + server.info.uri);
    });
  };

  return server;
};
