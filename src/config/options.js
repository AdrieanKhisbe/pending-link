/**
 * Options for the modules
 *
 * Created by abecchis on 17/03/15.
 */

var logger = require('./logger');
var conf = require('./configuration');
var DataStore = require('nedb');
var mongojs = require('mongojs');

function dbFromConf(conf){
  if (conf.get("db:in_memory")) {
    return function () {
      return new DataStore(conf.get("db:path"));
    }
  } else {
    return function () {
      return mongojs(conf.get("db:path"), ['links'])
    }
  }
}

module.exports = {
  null_option: {
    logger: logger.empty_logger,
    port: 0,
    host: "0.0.0.0",
    base_uri: "/api",
    db: function(){return new DataStore();}
  },

  default_option: {
    logger: logger.createLogger(conf),
    port: conf.get("pl:port"),
    host: conf.get("pl:host") || "0.0.0.0",
    base_uri: conf.get("pl:base_uri"),
    db:dbFromConf(conf)
  },

  option_from: function (port, host) {
    return {
      logger: logger.createLogger(conf),
      port: port || conf.get("pl:port"),
      host: host || conf.get("pl:host"),
      base_uri: conf.get("pl:base_uri"),
      db:dbFromConf(conf)

    };
  }

};