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
            //TODO :see uf tag param
            reply(LinkDAO.all());
        },
        "get": function (request, reply) {
            var id = request.params.id;

            reply(LinkDAO.get(id));
        },
        create: function (request, reply) {
            // TODO: stub
            var link = Link.create(request.payload.url)
            //TODO: check existing tag

            //TODO Log
            console.log("new link: %j", link);
            var res = LinkDAO.save(link)

            reply().created("/api/links/" + link.id);
        },
        update: function (request, reply) {
            var id = request.params.id;
            if (!id) return false;
            //TODO


        },
        remove: function (request, reply) {
            var id = request.params.id;
            if (!id) return false;
            // TODO LOG
            var res = LinkDAO.remove(id);
            res ? reply().code(200) : reply().code(500);
        }
    }})();

module.exports = new LinkController();
