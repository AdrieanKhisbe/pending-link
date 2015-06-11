/** Link Controllers
 * Created by abecchis on 26/02/15.
 */
'use strict';

var Link = require('../links/link');
var defaultOption = require('../config/options').defaultOption;

module.exports = function (options) {
  var LinkDAO = require('../links/linkDao')(options);

  if (options == null) options = defaultOption;


  var log = options.logger;
  var linksEndpoint = options.baseUri + '/links';

  return {
    all: function (request, reply) {
      log.debug('get method incoming');
      LinkDAO.all(function (all) {
        reply(all);
      });
    },

    'get': function (request, reply) {
      var id = request.params.id;
      log.debug('access link %s', id);
      LinkDAO.get(id, function (link) {
        if (link == null) {
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
      var link = Link.create(request.payload.url);
      if(request.payload.tags) link.tags = request.payload.tags;
      if(request.payload.comment) link.comment = request.payload.comment;

      LinkDAO.save(link, function (newLink) {
        log.info('new link: %j', newLink);
        reply().created(linksEndpoint + '/' + newLink._id);
      });

    },

    update: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);
      var link = request.payload;
      log.info('update link %d with %j', id, link);

      // I know it's burk....
      if (!"link" === link.type
        || !link.id || link.id !== id
        || !link.comment || !link.tags || !link.archived
        || !link.url || !link.timestamp) {
        return reply().code(400);
      }
      link._id = 'id';
      LinkDAO.update(link, function (ok) {
        if (ok) reply();
        else reply().code(500);
      });
    },

    partialUpdate: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);
      var link = request.payload;

      log.info('update link %d with %j', id, link);

      if (!'link' === link.type) return reply().code(400);

      LinkDAO.get(id, function (dbLink) {
        //TODO: handle doc not here
        if (link.url) dbLink.url = link.url;
        if (link.comment) dbLink.comment = link.comment;
        if (link.archived) dbLink.archived = link.archived;
        if (link.timestamp) dbLink.timestamp = link.timestamp;
        if (link.tags)    dbLink.tags = link.tags;
        dbLink._id = id;

        LinkDAO.update(dbLink, function (ok) {
          if (ok) reply();
          else reply().code(500);
        });
      });
    },

    remove: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);

      log.info('remove link with %d', id);
      LinkDAO.remove(id, function (ok) {
        ok ? reply() : reply().code(500);
      });
    },

    findByTags: function (request, reply) {
      var tag = request.params.tagName;
      if (!tag) return reply().code(400);

      log.info('fetching link with tag %s', tag);

      LinkDAO.findByTags(tag, function (taggedLinks) {
        log.debug('find by tag just grabbed result');
        reply(taggedLinks);
      });
    },
    allTags: function(request, reply){
      LinkDAO.allTags(function(tags){
        reply(tags);
      });
    }
  };
};
