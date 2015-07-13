'use strict';

/** Configuration of the server */
var conf = require('nconf');

conf.env({
  separator: '__',
  whiteList: [ 'log__level', 'pl__application_name', 'pl__port',
    'pl__base_uri', 'db__in_memory', 'db__config__path',
    'db__config__name', 'db__config__collection']
}).argv();

// Loads all values defined in file configuration_default.json
conf.file({file: 'configuration_default.json'});
// TODO: webprod flag

// Loads any file defined via environment variable named PL_CONFIG_PATH
if (conf.get('PL_CONFIG_PATH')) {
  conf.file({file: conf.get('PL_CONFIG_PATH')});
}

module.exports = conf;
