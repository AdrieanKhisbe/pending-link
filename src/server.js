/** The server
 * Created by abecchis on 27/02/15.
 */
"use strict";

var Hapi = require('hapi');

module.exports = function(port){
  var server = new Hapi.Server();
  server.connection({ port: port });
  server.route(require('./config/routes'));

  return server;
}