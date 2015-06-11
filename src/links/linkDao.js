/**
 * Dao fir Links in Nedb
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

var defaultOption = require('../config/options').defaultOption;

module.exports = function (options) {

  if(options == null) options = defaultOption;

  var db = options.db();
  var log = options.logger;

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
      if (!link || !link._id) return callback(false);
      db.update({'_id': link._id}, link, {}, function (err, numReplaced) {
        if (!err && numReplaced === 1) {
          log.debug("update link %d", link._id);
          callback(true);
        } else {
          log.debug("update link %d FAILED", link._id);
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
      db.update({'_id': linkId}, {$set: {archived: true}}, {},
        function (err, numReplaced) {
          if (!err && numReplaced === 1) {
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
    },

    findByTags: function (tags, callback) {
      // TODO: add suport for list of more?  $in
      db.find({tags: tags}, function (err, docs) {
        if (err) {
          log.warn(err);
          callback(null);
        } else {
          log.debug('callbacking the tag research');
          callback(docs);
        }
      });
    },
    allTags: function (callback) {
      db.find({$not: {tags: {$size: 0}}}, {tags: 1, _id: 0}, function (err, docs) {
        // might need to do a special DOC. (not performant at all!!!

        if (err) {
          callback(null);
        } else {
          // TODO refactor this
          var tags = {};
          docs.forEach(function(tag){
            tag.tags.forEach(function(tagName){
              tags[tagName] = true;
            });
          });
          callback(Object.getOwnPropertyNames(tags));
        }
      });
    },
    search: function(pattern, callback) {
      // FIXME: search : in url + comment to implement
      log.warn('Try to access to unimplemented search function');
      callback(null);
    }
  };
};
