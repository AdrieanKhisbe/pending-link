/**
 * Dao fir Links in Nedb
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";
var default_option = require('../config/options').default_option;
var DataStore = require('nedb');

module.exports = function (options) {

  if (options == null) options = default_option;

  var getDb;
  var log = options.logger;

  if (options.in_memory) {
    var linkDb = new DataStore({filename: options.db_path, autoload: true});
    getDb = function () {
      return linkDb;
    }
  } else {
    getDb = function () {
      return linkDb
    }
  }

  return {
    save: function (link, callback) {
      getDb().insert(link, function (err, newDoc) {
        if (err) {
          log.warn(err);
          callback(null);
        } else {
          log.debug("Saved new link %j", link);
          callback(newDoc);
        }
      });
    },

    "get": function (linkId, callback) {
      getDb().findOne({'_id': linkId}, function (err, value) {
        if (err) callback(null); else callback(value);
      });
    },

    update: function (link, callback) {
      if (!link || link.id) return callback(false);

      getDb().update({'_id': link.id}, link, {}, function (err, numReplaced) {
        if (err == null && numReplaced == 1) {
          log.debug("update link %d", link.id);
          callback(true);
        } else {
          log.debug("update link %d FAILED", link.id);
          callback(false);

        }
      });
    },

    remove: function (linkId, callback) {
      // not real remove?? : / TODO: ask
      // getDb().remove({'_id': linkId}, function (err, numRem) {
      // log.debug("remove link %d", linkId);
      //  callback(err == null && numRem == 1);
      //});
      getDb().update({'_id': linkId}, {"$set": {"archived": true}}, {}, function (err, numReplaced) {
        if (err == null && numReplaced == 1) {
          log.debug("archived link %d", linkId);
          callback(true);
        } else {
          log.debug("archived link %d FAILED", linkId);
          callback(false);
        }
      });
    },

    all: function (callback) {
      getDb().find({}, function (err, docs) {
        if (err) callback(null); else callback(docs);
      });
    }
  }
};
