'use strict';

/** Configuration of the server */
var conf = require('nconf');

conf.env();

// Loads all values defined in file configuration_default.json
conf.file({file: 'configuration_default.json'});

// Loads any file defined via environment variable named PL_CONFIG_PATH
if (conf.get('PL_CONFIG_PATH')) {
    conf.file({file: conf.get('PL_CONFIG_PATH')});
}

module.exports = conf;
