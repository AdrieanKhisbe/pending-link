/**
 * Dao fir Links in Nedb
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

var defaultOption = require('../config/options').defaultOption;

// TODO: maybe kill the loging!
module.exports = function (options) {

  if(!options) options = defaultOption;

  var db = options.db();
  var log = options.logger;
  var toId = db.convertToId;

  return {

    save: function (link, callback) {
      db.insert(link, function (err, newDoc) {
        if (err) {
          log.warn(err);
        } else {
          log.debug('Saved new link %j', link);
        }
        callback(err, newDoc);
      });
    },

    'get': function (linkId, callback) {
      db.findOne({'_id': toId(linkId)}, {_id: 0}, callback);
    },

    update: function (linkId, link, callback) {
      if (!linkId) return callback(new Error('no id provided'));
      if (!link) return callback(new Error('no id provided'));

      // TODO: ensure key field not changed
      db.update({'_id': toId(linkId)}, link, {}, function (err, numReplaced) {
        if (!err && numReplaced === 1) {
          log.debug('update link %d', linkId);
          callback(null);
        } else {
          log.debug('update link %d FAILED', linkId);
          callback(new Error('update failed!?'));
        }
      });
    },

    remove: function (linkId, callback) {
      // not real remove?? : / TODO: ask
      // db.remove({'_id': linkId}, function (err, numRem) {
      // log.debug("remove link %d", linkId);
      //  callback(err == null && numRem == 1);
      //});
      db.update({'_id': toId(linkId)}, {$set: {archived: true}}, {},
        function (err, numReplaced) {
          if(err) return callback(err);

          if(numReplaced === 1) {
            log.debug('archived link %d', linkId);
            callback(null);
          } else {
            log.debug('archived link %d FAILED', linkId);
            callback(new Error('archive failed!?'));
          }
      });
    },

    all: function (callback) {
      // FIXME: check no archived!!
      db.find({}, callback);
    },

    findByTags: function (tags, callback) {
      // LATER: add suport for list of more?  $in
      db.find({tags: tags}, function (err, docs) {
        if (err) {
          log.warn(err);
        } else {
          log.debug('callbacking the tag research');
        }
        callback(err, docs);
      });
    },
    allTags: function (callback) {
      db.find({$not: {tags: {$size: 0}}}, {tags: 1, _id: 0}, function (err, docs) {
        // might need to do a special DOC. (not performant at all!!!

        if (err) {
          callback(err, null);
        } else {
          // TODO refactor this!
          var tags = {};
          docs.forEach(function(tag){
            tag.tags.forEach(function(tagName){
              tags[tagName] = true;
            });
          });
          callback(null, Object.getOwnPropertyNames(tags));
        }
      });
    },
    search: function(pattern, callback) {
      // FIXME: search : in url + comment to implement
      log.warn('Try to access to unimplemented search function');
      callback(new Error('not implemented'), null);
    }
  };
};
