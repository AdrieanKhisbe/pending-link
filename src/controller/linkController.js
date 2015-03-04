/** Link Controllers
 * Created by abecchis on 26/02/15.
 */
"use strict";

var LinkDAO = require('../model/linkDao');
var Link = require('../model/link');
var log = require('../config/logger')();

function LinkController(){};
LinkController.prototype = (function(){

    //TODO: see content type
    return {
        all: function (request, reply) {
            log.debug("get method incoming");
            reply(LinkDAO.all());
        },
        "get": function (request, reply) {
            var id = request.params.id;
            log.debug("access link %d", id);
            reply(LinkDAO.get(id));
        },
        create: function (request, reply) {
            var link = Link.create(request.payload.url);
            //TODO: check existing tag

            log.info("new link: %j", link);
            var res = LinkDAO.save(link)

            reply().created("/api/links/" + link.id);
        },
        update: function (request, reply) {
            var id = request.params.id;
            if (!id) return false;
            log.info("update link with %d", id);


            //TODO
        },
        remove: function (request, reply) {
            var id = request.params.id;
            if (!id) return false;

            log.info("remove link with %d", id)
            var res = LinkDAO.remove(id);
            res ? reply().code(200) : reply().code(500);
        }
    }})();

module.exports = new LinkController();
