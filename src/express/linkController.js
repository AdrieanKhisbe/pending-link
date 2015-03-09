/** Link Controllers
 * Created by abecchis on 09/03/15.
 */
"use strict";

var LinkDAO = require('../model/linkDao');
var Link = require('../model/link');
var log = require('../config/logger')();

function LinkController() {
};
LinkController.prototype = (function () {

    //FIXME: update to express API!!
    return {
        all: function (req, res) {
            log.debug("get method incoming");
            res.json(LinkDAO.all());
        },
        "get": function (req, res) {
            var id = req.params.id;
            log.debug("access link %d", id);
            res.json(LinkDAO.get(id));
        },
        create: function (req, res) {
            log.debug("Request received %j", req.body);
            if (!req.body.url) {
                return res.status(400).send();
            }
            var link = Link.create(req.body.url);
            //TODO: check existing tag

            log.info("new link: %j", link);
            var l = LinkDAO.save(link);

            res.setHeader("Location", "/api/links/" + l.id);
            res.status(201).send();
        },
        update: function (req, res) {
            var id = req.params.id;
            if (!id) return res.status(400).send();
            log.info("update link %d with %j", id, req.body);


            //TODO: check content and update
        },
        partial_update: function (req, res) {
            var id = request.params.id;
            if (!id) return res.status(400).send()
            log.info("update link %d with %j", id, request.payload);


            //TODO
        },
        remove: function (req, res) {
            var id = request.params.id;
            if (!id) return res.status(400).send();

            log.info("remove link with %d", id)
            var res = LinkDAO.remove(id);
            res ? res.status(200).send() : res.status(500).send();
        }
    }
})();

module.exports = new LinkController();
