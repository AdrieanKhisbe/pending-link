/**
 * Created by abecchis on 26/02/15.
 */
// V1 in memory

"use strict";
var default_option = require('../config/options').default_option;
var DataStore = require('nedb');
var linkDb = new DataStore({filename: 'link.nedb'}); //TODO: config?


//FIXME : see: should I send a promisE?
module.exports = function (options) {

  if (options == null) options = default_option;

  var log = options.logger;

  return {

    save: function (link, callback) {
      linkDb.insert(link, function (err, newDoc) {
        if (err) log.warn(err);
        else
          log.debug("Saved new link %j", link);

        callback(err, newDoc)
      });
    },

    "get": function (linkId, callback) {
      linkDb.findOne({'_id': linkId}, function (err, value) {
        if (err) callback(null); else callback(value);
      });
    },

    update: function (link, callback) {
      if (!link || link.id) return callback(false);

      link.update({'_id': link.id}, link, {}, function (err, numReplaced) {
        if (err == null && numReplaced == 1) {
          log.debug("update link %d", link.id);
          callback(true);
        } else {
          log.debug("update link %d FAILED", link.id);
          callback(false);

        }
      });
    },

    // see: id or?
    remove: function (linkId, callback) {
      linkDb.remove({'_id': linkId}, function (err, numRem) {
        log.debug("remove link %d", linkId);
        callback(err == null && numRem == 1);
      });

    },

    all: function (callback) {
      linkDb.find({}, function (err, docs) {
        if (err) callback(null); else callback(docs);
      });
    }
  }
};
