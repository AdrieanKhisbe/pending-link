/** The Express server
 * Created by abecchis on 09/03/15.
 */
"use strict";

var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');
// TODO: logging

module.exports = function (port, host) {

  var server = express();

  // Default value
  if (!host) host = "0.0.0.0";

  var realServer;

  server.use(bodyParser.json());

  server.use('/', routes);


  server.start = function (callback) {
    realServer = server.listen(port, callback);
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
