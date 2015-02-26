/**
 * Module de réprésentation de liens
 *
 * Created by abecchis on 26/02/15.
 */
var Link = function(url){
    this.url = url;
    this.timestamp = Date.now();
    this.archived = false;
    this.comment = null;
    this.tags = [];
}


Link.prototype.addTag = function(tag) {
  this.tags.add(tag);
};
Link.prototype.removeTag = function(tag) {
  this.tags.remove(tag);
};

module.exports = Link