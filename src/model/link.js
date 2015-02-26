/**
 * Module de réprésentation de liens
 *
 * Created by abecchis on 26/02/15.
 */

var Link = exports = module.exports = function(url){
    this.url = url;
    this.timestamp = Date.now();
    this.archived = false;
    this.comment = null;
    this.tags = [];
}


Link.prototype.addTag = function(tag) {
    this.tags.push(tag);
};
Link.prototype.removeTag = function(tag) {
    var tags = this.tags
    var i = tags.indexOf(tag);
    if(i >= 0)
       this.tags = tags.slice(0,i) + tags.slice(i+1,tags.length);
};