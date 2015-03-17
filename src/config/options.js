/**
 * Options for the modules
 *
 * Created by abecchis on 17/03/15.
 */

var logger = require('./logger');
var conf = require('./configuration');

module.exports = {
  null_option: {
    logger: logger.empty_logger
  },

  default_option:{
    logger: logger.createLogger(conf)
  }

  // LATER: config ?


}