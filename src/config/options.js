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
  // du coup part défault, sera vrai. in memory

  if (inMemory) {
    return function inMemoryFactory() {
      var ds = new DataStore({ filename: config.get('db:config:path'), autoload: true });
      ds.convertToId = function(id){return id; }; // this is so that mongo/nedb exxchange is transparent!
      return ds;
    };
  } else {

    return function mongoFactory() {
      // db mongo: collection name
      var dbName = config.get('db:config:name') || 'links';
      var dbcollection = config.get('db:config:collection') || 'links';
      var db = mongojs(dbName, [dbcollection]);
      db.convertToId = function(id){mongojs.ObjectId(id); };
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
    db: function inMemoryFactory() {
      var ds = new DataStore();
      ds.convertToId = function(id){return id; };
      return ds;
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
