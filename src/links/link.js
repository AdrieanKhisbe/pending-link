/**
 * Module de représentation de liens
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

var Link = function (url, tags, comment) {
  this.url = url;
  this.timestamp = Date.now();
  this.archived = false;
  this.comment = comment || null;
  this.tags = tags || [];
}

Link.prototype.update = function (object) {
  // Note! do not update the link itself!! + neither archive: inner field!
  if (object.comment) this.comment = object.comment;
  if (object.timestamp) this.timestamp = object.timestamp;
  if (object.tags) this.tags = object.tags;
  return this;
};

Link.prototype.addTag = function (tag) {
  this.tags.push(tag);
};

Link.prototype.removeTag = function (tag) {
  var tags = this.tags;
  var i = tags.indexOf(tag);
  if (i >= 0)
    this.tags = tags.slice(0, i) + tags.slice(i + 1, tags.length);
};

Link.create = function (url, tags, comment) {
  return new Link(url, tags, comment);
};

/**
 * Rebuild a link object form existing object.
 * @param obj link record
 * @returns {Link}
 */
Link.from = function (obj){
  var link = new Link(obj.url, obj.tags, obj.comment);
  if(obj.archived) link.archived = true;
  if(obj.timestamp) link.timestamp = obj.timestamp;
  return link;
};
// TODO: why not affect just constructor?

Link.merge = function(obj, patch){
  return Link.from(obj).update(patch);
};

module.exports = Link;