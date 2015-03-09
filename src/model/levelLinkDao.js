/**
 * Created by abecchis on 26/02/15.
 */
// V2 with level

"use strict";

var db = require('level')('../../linkDb'); //FIXME ext, conf
var log = require('../config/logger')();


//FIXME: still JUNK
function save(link){
   //TODO: check link
   link.id = link.url;  // TODO: change!!?

   db.put(link.id, link, function(err){
       if(err) log.warn("Error happened %j while saving", err);
       else log.debug("Insert succeed: key %s", link.id);
   })

   return link;
}

function get(linkId) {
    log.debug("Try to access link with id %s", linkId)
    return db.get(linkId, function(err, value){
        if(err) log.warn("Error happened %j while getting", err);
        return value;
    })
}

function update(link) {
    if (!link || !link.id) return false;
   save(link);
}

// see: id or?
function remove(linkId) {
    db.remove(linkId, function(err){
        if(err) log.warn("Error happened %j while deleting", err);
    })
}

function all() {
    log.debug("GET ALL THE LINKS");
    var als = [];
    // FIXME Should defer!!
     db.createReadStream()
        .on('data', function (data) {
             log.debug("item:"+data.key);
           als += data.value;
        }) .on('end', function () {
             console.log('Stream closed')

         })
}

//TODO: finder

module.exports = {
    all:all,
    save:save,
    get: get,
    update: update,
    remove:remove
}