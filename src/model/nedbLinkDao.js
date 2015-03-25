/**
 * Created by abecchis on 26/02/15.
 */
// V1 in memory

"use strict";
var default_option = require('../config/options').default_option;
var DataStore = require('nedb');
var linkDb = new DataStore({filename: 'link.nedb', autoload: true }); //TODO: config?


//FIXME : see: should I send a promisE?
module.exports = function (options) {

  if (options == null) options = default_option;

  var log = options.logger;

  return {

    save: function (link, callback) {
      linkDb.insert(link, function (err, newDoc) {
        if (err) {
          log.warn(err);
          callback(null);
        }
        else {
          log.debug("Saved new link %j", link);
          callback(newDoc);
        }
      });
    },

    "get": function (linkId, callback) {
      linkDb.findOne({'_id': linkId}, function (err, value) {
        if (err) callback(null); else callback(value);
      });
    },

    update: function (link, callback) {
      if (!link || link.id) return callback(false);

      linkDb.update({'_id': link.id}, link, {}, function (err, numReplaced) {
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
      // not real remove?? : / TODO: ask
      // linkDb.remove({'_id': linkId}, function (err, numRem) {
      // log.debug("remove link %d", linkId);
      //  callback(err == null && numRem == 1);
      //});
      linkDb.update({'_id': linkId}, {"$set": {"archived": true}}, {}, function (err, numReplaced) {
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
      linkDb.find({}, function (err, docs) {
        if (err) callback(null); else callback(docs);
      });
    }
  }
};
