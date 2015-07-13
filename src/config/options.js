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

  var inMemory = config.get('db:in_memory');
  if(inMemory === "false") inMemory = false;
  //WTFFFFFF!!!!!! (for commandline/env overloading)

  if (inMemory) {
    return function () {
      return new DataStore({ filename: config.get('db:config:path'), autoload: true });
    };
  } else {

    return function () {
      // db mongo: collection name
      var dbName = config.get('db:config:name') || 'links';
      var dbcollection = config.get('db:config:collection') || 'links';
      var db = mongojs(dbName, [dbcollection]);
      return db[dbcollection];
    };
  }
}

module.exports = {
  nullOption: {
    logger: logger.emptyLogger,
    port: 0,
    host: '0.0.0.0',
    baseUri: '/api',
    db: function () {
      return new DataStore();
    }
  },

  defaultOption: {
    logger: logger.createLogger(conf),
    port: conf.get('pl:port'),
    host: conf.get('pl:host') || '0.0.0.0',
    baseUri: conf.get('pl:baseUri'),
    db: dbFromConf(conf)
  },

  optionFrom: function (port, host) {
    return {
      logger: logger.createLogger(conf),
      port: port || conf.get('pl:port'),
      host: host || conf.get('pl:host'),
      baseUri: conf.get('pl:base_uri'),
      db: dbFromConf(conf)
    };
  }

};
