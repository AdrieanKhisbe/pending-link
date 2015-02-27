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
            var l = Link.create("TMP")
            //TODO Log
            console.log(l);
            LinkDAO.save(l)
            reply().code(200);
        }
    }})();

module.exports = new LinkController();
