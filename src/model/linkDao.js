/**
 * Created by abecchis on 26/02/15.
 */
// V1 in memory

"use strict";

var allLinks = [];

function save(link){
    //TODO: check link
    var id = allLinks.length
    link.id = id;
    allLinks[id] = link;
    //TODO: loging?? global?
}

function get(linkId) {
    return allLinks[linkId]
}

// TODO: take object?
function update(linkId) {
    if (!linkId) return false
    // TODO


}

// see: id or?
function remove(linkId) {
    if (linkId < 0 && linkId > allLinks.length - 1) return false
    allLinks[linkId].archived = true
}

function all() {
    return [].concat(allLinks.filter(function (link) {
        return !link.archived
    }));
}

//TODO: finder

module.exports = {
    all:all,
    save:save,
    remove:remove
}