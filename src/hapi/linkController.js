/** Link Controllers
 * Created by abecchis on 26/02/15.
 */
'use strict';

var Link = require('../links/link');
var defaultOption = require('../config/options').defaultOption;

module.exports = function (options) {
  var LinkDAO = require('../links/linkDao')(options);

  if (!options) options = defaultOption;


  var log = options.logger;
  var linksEndpoint = options.baseUri + '/links';

  return {
    all: function (request, reply) {
      log.debug('get method incoming');
      LinkDAO.all(function (err, all) {
        // TODO: use boom.
        if(err) reply().code(500);
        else reply(all);
      });
    },

    'get': function (request, reply) {
      var id = request.params.id;
      log.debug('access link %s', id);
      LinkDAO.get(id, function (err, link) {
        if (err || !link){
          reply().code(404);
        } else {
          if (link.archived)
            reply().code(410);
          else reply(link);
        }
      });
    },

    create: function (request, reply) {
      log.debug('Request received %j', request.payload);
      if (!request.payload.url) {
        return reply().code(400);
      }
      var link = Link.create(request.payload.url, request.payload.tags, request.payload.comment);

      LinkDAO.save(link, function (err, newLink) {
        // TODO: use Boom
        if(err) return reply().code(500);
        log.info('new link: %j', newLink);
        reply().created(linksEndpoint + '/' + newLink._id);
      });

    },

    update: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);
      var link = request.payload;
      log.info('update link %d with %j', id, link);

      LinkDAO.update(id, link, function (err) {
        if (!err) reply();
        else reply().code(500);
      });
    },

    partialUpdate: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);

      log.info('update link %d with %j', id, request.payload);
      LinkDAO.get(id, function (err, link) {
        if (err || !link) return reply().code(404);

        var updatedLink = Link.merge(link, request.payload);

        LinkDAO.update(id, updatedLink, function (err) {
          if (err) reply().code(500);
          else reply();
        });
      });
    },

    remove: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);

      log.info('remove link with %d', id);
      LinkDAO.remove(id, function (err) {
        if(err) reply().code(500); else reply();
      });
    },

    findByTags: function (request, reply) {
      var tag = request.params.tagName;
      if (!tag) return reply().code(400);

      log.info('fetching link with tag %s', tag);

      LinkDAO.findByTags(tag, function (err, taggedLinks) {
        if (err) reply().code(500);
        log.debug('find by tag just grabbed result');
        reply(taggedLinks);
      });
    },
    allTags: function(request, reply){
      LinkDAO.allTags(function(err, tags){
        if (err) reply().code(500);
        reply(tags);
      });
    }
  };
};
