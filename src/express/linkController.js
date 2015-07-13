/** Link Controllers
 * Created by abecchis on 09/03/15.
 */
'use strict';

var Link = require('../links/link');
var defaultOption = require('../config/options').defaultOption;

module.exports = function (options) {
  var LinkDAO = require('../links/linkDao')(options);

  if (!options) options = defaultOption;
  var linksEndpoint = options.baseUri + '/links';

  var log = options.logger;

  return {
    all: function (req, res) {
      log.debug('get method incoming');
      LinkDAO.all(function (err, all) {
        if(err) return res.sendStatus(500);
        res.json(all);
      });
    },

    "get": function (req, res) {
      var id = req.params.id;
      log.debug('access link %s', id);
      LinkDAO.get(id, function (err, link) {
        if (err || !link) {
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
      var link = Link.create(req.body.url, req.body.tags, req.body.comment);

      LinkDAO.save(link, function (err, newLink) {
        if(err) return res.sendStatus(500);

        log.info('new link: %j', newLink);
        res.location(linksEndpoint + '/' + newLink._id);
        res.status(201).json({});
      });

    },

    update: function (req, res) {
      var id = req.params.id;
      if (!id) return res.sendStatus(400);
      log.info('update link %d with %j', id, req.body);

      LinkDAO.update(id, req.body, function (err) {
        res.sendStatus(err ? 500 : 200);
      });
    },

    partialUpdate: function (req, res) {
      var id = req.params.id;
      if (!id) return res.sendStatus(400);
      log.info('update link %d with %j', id, req.body);

      // TODO: port this in the DAO itself!
      LinkDAO.get(id, function (err, link) {
        if(err) return res.sendStatus(404);

        var updatedLink = Link.merge(link, req.body);

        LinkDAO.update(id, updatedLink, function (updateErr) {
          res.sendStatus(updateErr ? 500 : 200);
        });
      });
    },

    remove: function (req, res) {
      var id = req.params.id;
      if (!id) return res.sendStatus(400);

      log.info('remove link with %d', id);
      LinkDAO.remove(id, function (err) {
        res.sendStatus(err ? 500 : 200);
      });
    },

    findByTags: function (req, res) {
      var tag = req.params.tagName;
      if (!tag) return res.sendStatus(400);

      log.info('fetching link with tag %s', tag);

      LinkDAO.findByTags(tag, function (err, taggedLinks) {
        if(err) return res.sendStatus(500);

        log.debug('find by tag just grabbed result');
        res.json(taggedLinks);
      });
    },
    allTags: function(req, res){
      LinkDAO.allTags(function(err, tags){
        if(err) return res.sendStatus(500);

        res.json(tags);
      });
    }
  };
};
