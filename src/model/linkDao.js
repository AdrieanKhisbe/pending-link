/**
 * Created by abecchis on 26/02/15.
 */
// V1 in memory

"use strict";

var allLinks = [];

function save(link){
    //TODO: check link
    allLinks.push(link);
    //TODO: loging?? global?
}

function remove(link){
    // allLinks.remove(link)
    //TODO:
}

var all = function(){
    return [].concat(allLinks);
}

//TODO: finder

module.exports = {
    all:all,
    save:save,
    remove:remove
}