/** Link Controllers
 * Created by abecchis on 26/02/15.
 */
"use strict";

var LinkDAO = require('../model/linkDao');
var Link = require('../model/link');

function LinkController(){};
LinkController.prototype = (function(){

    //TODO: see content type
    return {
        all: function (request, reply) {
            reply(LinkDAO.all());
        },
        "get": function (request, reply) {
            var id = request.params.id;

            reply(LinkDAO.get(id));
        },
        create: function (request, reply) {
            // TODO: stub
            //TODO: validation
            var link = Link.create(request.payload.url)
            //TODO Log
            console.log("new link: %j", link);
            var res = LinkDAO.save(link)
            //TODO: LOCATION
            //reply.created("./"+link.id)
            reply().code(201).header('Location', '/api/links/' //+ link.id
            );

        },
        update: function (request, reply) {
            //TODO
        },
        remove: function (request, reply) {
            if (!request.params.id) return false;
            // LOG
            var id = request.params.id;
            var res = LinkDAO.remove(id);
            res ? reply().code(200) : reply().code(500);
        }
    }})();

module.exports = new LinkController();
