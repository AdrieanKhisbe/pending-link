/**
 * Options for the modules
 *
 * Created by abecchis on 17/03/15.
 */

var logger = require('./logger');
var conf = require('./configuration');

module.exports = {
  null_option: {
    logger: logger.empty_logger,
    port: 0,
    host: "0.0.0.0",
    base_uri: "/api",
    in_memory: true,
    db_path: 'link.nedb'
  },

  default_option: {
    logger: logger.createLogger(conf),
    port: conf.get("pl:port"),
    host: conf.get("pl:host") || "0.0.0.0",
    base_uri: conf.get("pl:base_uri"),
    in_memory: conf.get("db:in_memory"),
    db_path: conf.get("db:path")
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