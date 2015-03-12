/** The Express server
 * Created by abecchis on 09/03/15.
 */
"use strict";

var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');


module.exports = function (port, host) {

  var server = express();

  // Default value
  if (!host) host = "0.0.0.0";


  server.use(bodyParser.json());

  server.use('/', routes);


  server.start = function (callback) {
    return server.listen(port, callback);
  }

  server.loadGoodies = function () {
    // No goodies
  }

  return server;
}
