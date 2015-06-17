/**
 * Module de représentation de liens
 *
 * Created by abecchis on 26/02/15.
 */
'use strict';

var Link = function (url, tags, comment) {
  this.type = 'link';
  this.url = url;
  this.timestamp = Date.now();
  this.archived = false;
  this.comment = comment || null;
  this.tags = tags || [];
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

module.exports = Link;