/**
 * Options for the modules
 *
 * Created by abecchis on 17/03/15.
 */

var logger = require('./logger');
var conf = require('./configuration');
var DataStore = require('nedb');
var mongojs = require('mongojs');



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
    db: conf.get("db:in_memory")? function(){return new DataStore(conf.get("db:path"));}:
      function(){return mongojs(conf.get("db:path"), ['links'])}
  },

  option_from: function (port, host) {
    return {
      logger: logger.createLogger(conf),
      port: port || conf.get("pl:port"),
      host: host || conf.get("pl:host"),
      base_uri: conf.get("pl:base_uri"),
      db_path: conf.get("db:path"),
      in_memory:conf.get("db:in_memory")

    };
  }

};