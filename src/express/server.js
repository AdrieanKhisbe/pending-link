/** The Express server
 * Created by abecchis on 09/03/15.
 */
"use strict";

var bodyParser = require('body-parser');
var express = require('express');
var default_option = require('../config/options').default_option;
var controller = require('./linkController');
var routes = require('./routes');

module.exports = function(options){

  if(options == null) options = default_option;

  var log = options.logger;
  var server = express();
  var realServer;

  server.use(bodyParser.json());

  var linkedRoutes = routes(controller(options));
  server.use('/', linkedRoutes);

  // Add this methods to have an uniform api with hapi
  server.start = function (callback) {
    log.info("Starting Express Server")
    realServer = server.listen(options.port, callback);
    return realServer;
  };

  server.loadGoodies = function () {
    // No goodies
  };

  server.stop = function(callback){
    realServer.close(callback);
  };

  return server;
}
