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
    host: "0.0.0.0"
  },

  default_option:{
    logger: logger.createLogger(conf),
    port: conf.get("pl:port"),
    host: conf.get("pl:host") || "0.0.0.0"
  }

  // LATER: config ?


}