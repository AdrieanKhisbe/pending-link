/** The server
 * Created by abecchis on 27/02/15.
 */
"use strict";

var Hapi = require('hapi');

module.exports = function(port, host){
  // Default value
  if(!host ) host = "0.0.0.0";

  var server = new Hapi.Server();
  server.connection({ port: port, host:host });
  server.route(require('./config/routes'));

  return server;
}