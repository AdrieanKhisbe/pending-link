'use strict';

/** Logger */
var bunyan = require('bunyan');

var logger;

module.exports = function createLogger(conf) {
    if (logger) {
	return logger;
    }

    if (!conf) {
	throw new Error('Invalid configuration during creating logger');
    }

    logger = bunyan.createLogger({
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
};
