/** The Express server
 * Created by abecchis on 09/03/15.
 */
'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');

var defaultOption = require('../config/options').defaultOption;
var controller = require('./linkController');
var routes = require('./routes');
var staticRoutes = require('./staticRoutes')();

module.exports = function makeExpressServer(options){

  if(!options) options = defaultOption;

  var log = options.logger;
  var server = express();
  var realServer;

  server.use(bodyParser.json());

  var linkedRoutes = routes(controller(options));

  // Add this methods to have an uniform api with hapi
  server.start = function (callback) {

    // note: load routes in start so that they are loaded after the eventual goodies
    server.use(options.baseUri, linkedRoutes);
    server.use('/', staticRoutes);

    log.info('Starting Express Server');
    realServer = server.listen(options.port, callback);
    return realServer;
  };

  server.loadGoodies = function () {
    server.use(morgan('combined'));
  };

  server.stop = function(callback){
    realServer.close(callback);
  };

  return server;
};
