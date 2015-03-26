/**
 * Dao fir Links in Nedb
 *
 * Created by abecchis on 26/02/15.
 */

"use strict";
var default_option = require('../config/options').default_option;

module.exports = function (options) {

  if (options == null) options = default_option;

  var db;
  var log = options.logger;

  if (options.in_memory) {
    var DataStore = require('nedb');
    db = new DataStore({filename: options.db_path, autoload: true}); //TODO: inject
  } else {
    var mongojs = require('mongojs');
    db = mongojs(options.db_path, ['links']);
  }

  return {

    save: function (link, callback) {
      db.insert(link, function (err, newDoc) {
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
      db.findOne({'_id': linkId}, function (err, value) {
        if (err) callback(null); else callback(value);
      });
    },

    update: function (link, callback) {
      if (!link || link.id) return callback(false);

      db.update({'_id': link.id}, link, {}, function (err, numReplaced) {
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
      // db.remove({'_id': linkId}, function (err, numRem) {
      // log.debug("remove link %d", linkId);
      //  callback(err == null && numRem == 1);
      //});
      db.update({'_id': linkId}, {"$set": {"archived": true}}, {}, function (err, numReplaced) {
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
      db.find({}, function (err, docs) {
        if (err) callback(null); else callback(docs);
      });
    }
  }
};
