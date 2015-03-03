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
        "get": function (request, reply) {
            reply(LinkDAO.all());
        },
        create: function (request, reply) {
            // TODO: stub
            //TODO: validation
            var link = Link.create(request.payload)
            //TODO Log
            console.log("new link: %j", link);
            var res = LinkDAO.save(link)
            res ? reply().code(200) : reply().code(500);
        },
        update: function (request, reply) {
            //TODO
        },
        remove: function (request, reply) {
            if (!request.param.id) return false;
            // LOG
            var id = request.param.id;
            var res = LinkDAO.remove(id);
            res ? reply().code(200) : reply().code(500);
        }
    }})();

module.exports = new LinkController();
