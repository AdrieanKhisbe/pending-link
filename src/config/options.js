/**
 * Options for the modules
 *
 * Created by abecchis on 17/03/15.
 */
'use strict';

var logger = require('./logger');
var conf = require('./configuration');
var DataStore = require('nedb');
var mongojs = require('mongojs');

function dbFromConf(config) {
  if (config.get("db:in_memory")) {
    return function () {
      return new DataStore({ filename: config.get("db:path"), autoload: true });
    };
  } else {
    return function () {
      // FIXME: draft in building
      return mongojs(config.get("db:path"), ['links'])
    };
  }
}

module.exports = {
  nullOption: {
    logger: logger.emptyLogger,
    port: 0,
    host: "0.0.0.0",
    baseUri: "/api",
    db: function () {
      return new DataStore();
    }
  },

  defaultOption: {
    logger: logger.createLogger(conf),
    port: conf.get("pl:port"),
    host: conf.get("pl:host") || "0.0.0.0",
    baseUri: conf.get("pl:baseUri"),
    db: dbFromConf(conf)
  },

  optionFrom: function (port, host) {
    return {
      logger: logger.createLogger(conf),
      port: port || conf.get("pl:port"),
      host: host || conf.get("pl:host"),
      baseUri: conf.get("pl:baseUri"),
      db: dbFromConf(conf)
    };
  }

};
