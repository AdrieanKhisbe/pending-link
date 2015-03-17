'use strict';

/** Logger */
var bunyan = require('bunyan');
var blackhole = require("stream-blackhole");

module.exports = {

  empty_logger: bunyan.createLogger({
    name: "empty",
    stream: blackhole()
  }),

  createLogger: function (conf) {

    if (!conf) {
      throw new Error('Invalid configuration during creating logger');
    }

    var logger = bunyan.createLogger({
      name: conf.get('pl:application_name'),
      streams: [
        {
          level: conf.get('log:level'),
          stream: eval(conf.get('log:stream')),
          path: conf.get('log:path')
        }
      ]
    });
    return logger;
  }
};
