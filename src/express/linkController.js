/** Link Controllers
 * Created by abecchis on 09/03/15.
 */
'use strict';

var Link = require('../links/link');
var defaultOption = require('../config/options').defaultOption;

module.exports = function (options) {
  var LinkDAO = require('../links/linkDao')(options);

  if (options == null) options = defaultOption;
  var linksEndpoint = options.baseUri + '/links';

  var log = options.logger;

  return {
    all: function (req, res) {
      log.debug('get method incoming');
      LinkDAO.all(function (all) {
        res.json(all);
      });
    },

    "get": function (req, res) {
      var id = req.params.id;
      log.debug('access link %s', id);
      LinkDAO.get(id, function (link) {
        if (link == null) {
          res.sendStatus(404);
        } else {
          if (link.archived)
            res.sendStatus(410);
          else res.json(link);
        }
      });
    },

    create: function (req, res) {
      log.debug('Request received %j', req.body);
      if (!req.body.url) {
        return res.sendStatus(400);
      }
      var link = Link.create(req.body.url);
      if(req.body.tags) link.tags = req.body.tags;
      if(req.body.comment) link.comment = req.body.comment;


      LinkDAO.save(link, function (newLink) {
        log.info('new link: %j', newLink);
        res.location(linksEndpoint + '/' + newLink._id);
        res.status(201).json({});
      });

    },

    update: function (req, res) {
      var id = req.params.id;
      if (!id) return res.sendStatus(400);
      log.info('update link %d with %j', id, req.body);

      // I know it's burk....
      if (!'link' === req.body.type
        || !req.body.id || req.body.id !== id
        || !req.body.comment || !req.body.tags || !req.body.archived
        || !req.body.url || !req.body.timestamp) {
        return res.sendStatus(400);
      } else {
        LinkDAO.update(req.body, function (ok) {
          res.sendStatus(ok ? 200 : 500);
        });
      }
    },

    partialUpdate: function (req, res) {
      var id = req.params.id;
      if (!id) return res.sendStatus(400);
      log.info('update link %d with %j', id, req.body);

      if (!'link' === req.body.type) return res.sendStatus(400);

      LinkDAO.get(id, function (link) {
        //TODO: handle doc not here
        if (req.body.url) link.url = req.body.url;
        if (req.body.comment) link.comment = req.body.comment;
        if (req.body.archived) link.archived = req.body.archived;
        if (req.body.timestamp) link.timestamp = req.body.timestamp;
        if (req.body.tags) link.tags = req.body.tags;

        LinkDAO.update(link, function (ok) {
          res.sendStatus(ok ? 200 : 500);
        });
      });
    },

    remove: function (req, res) {
      var id = req.params.id;
      if (!id) return res.sendStatus(400);

      log.info('remove link with %d', id);
      LinkDAO.remove(id, function (ok) {
        res.sendStatus(ok ? 200 : 500);
      });
    },

    findByTags: function (req, res) {
      var tag = req.params.tagName;
      if (!tag) return res.sendStatus(400);

      log.info('fetching link with tag %s', tag);

      LinkDAO.findByTags(tag, function (taggedLinks) {
        log.debug('find by tag just grabbed result');
        res.json(taggedLinks);
      });
    },
    allTags: function(req, res){
      LinkDAO.allTags(function(tags){
        res.json(tags);
      });
    }
  };
};
