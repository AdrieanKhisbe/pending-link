/** Link Controllers
 * Created by abecchis on 26/02/15.
 */
"use strict";


/** Link Controllers
 * Created by abecchis on 09/03/15.
 */
"use strict";

var Link = require('../links/link');
var default_option = require('../config/options').default_option;

module.exports = function (options) {
  var LinkDAO = require('../links/linkDao')(options);


  if (options == null) options = default_option;

  var log = options.logger;

  return {
    all: function (request, reply) {
      log.debug("get method incoming");
      LinkDAO.all(function (all) {
        reply(all);
      });
    },

    "get": function (request, reply) {
      var id = request.params.id;
      log.debug("access link %s", id);
      LinkDAO.get(id, function (link) {
        if (link == null) {
          reply().code(404);
        } else {
          if (link.archived)
            reply().code(410);
          else reply(link)
        }
      });
    },

    create: function (request, reply) {
      log.debug("Request received %j", request.payload);
      if (!request.payload.url) {
        return reply().code(400);
      }
      var link = Link.create(request.payload.url);

      LinkDAO.save(link, function (newLink) {
        log.info("new link: %j", newLink);
        reply().created("/api/links/" + newLink._id);
      });

    },

    update: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);
      log.info("update link %d with %j", id, request.payload);

      // I know it's burk....
      if (!"link" === request.payload.type
        || !request.payload.id || request.payload.id !== id
        || !request.payload.comment || !request.payload.tags || !request.payload.archived
        || !request.payload.url || !request.payload.timestamp) {
        return reply().code(400);
      } else {
        LinkDAO.update(request.payload, function (ok) {
          if (ok) reply();
          else reply().code(500);
        });
      }
    },

    partial_update: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);
      log.info("update link %d with %j", id, request.payload);

      if (!"link" === request.payload.type) return reply().code(400);

      LinkDAO.get(id, function (link) {
        //TODO: handle doc not here
        if (request.payload.url) link.url = request.payload.url;
        if (request.payload.comment) link.comment = request.payload.comment;
        if (request.payload.archived) link.archived = request.payload.archived;
        if (request.payload.timestamp) link.timestamp = request.payload.timestamp;
        if (request.payload.tags) link.tags = request.payload.tags;

        LinkDAO.update(link, function (ok) {
          if (ok) reply();
          else reply().code(500);
        });
      });
    },

    remove: function (request, reply) {
      var id = request.params.id;
      if (!id) return reply().code(400);

      log.info("remove link with %d", id);
      LinkDAO.remove(id, function (ok) {
        ok ? reply() : reply().code(500);
      });
    }
  }
};
    