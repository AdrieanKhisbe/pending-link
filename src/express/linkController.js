/** Link Controllers
 * Created by abecchis on 09/03/15.
 */
"use strict";

var LinkDAO = require('../model/linkDao')();
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
            log.debug("access link %s", id);
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
            res.status(201).json({});
        },
        update: function (req, res) {
            var id = req.params.id;
            if (!id) return res.status(400).send();
            log.info("update link %d with %j", id, req.body);

            // I know it's burk....
            if( ! "link" === req.body.type
                || ! req.body.id || req.body.id !== id
                || !req.body.comment || ! req.body.tags|| ! req.body.archived
                || !req.body.url  || !req.body.timestamp ){
                return res.status(400).send();
            } else {
                LinkDAO.update(req.body);
                return res.status(200).send();
            }
        },
        partial_update: function (req, res) {
            var id = req.params.id;
            if (!id) return res.status(400).send()
            log.info("update link %d with %j", id, req.body);

            if( ! "link" === req.body.type) return res.status(400).send();
            var link  = LinkDAO.get(id);
            if(req.body.url) link.url = req.body.url;
            if(req.body.comment) link.comment = req.body.comment;
            if(req.body.archived) link.archived = req.body.archived;
            if(req.body.timestamp) link.timestamp = req.body.timestamp;
            if(req.body.tags) link.tags = req.body.tags;

            LinkDAO.update(req.body);
            return res.status(200).send();
            },
        remove: function (req, res) {
            var id = req.params.id;
            if (!id) return res.status(400).send();

            log.info("remove link with %d", id)
            var r = LinkDAO.remove(id);
            r ? res.status(200).send() : res.status(500).send();
        }
    }
})();

module.exports = new LinkController();
